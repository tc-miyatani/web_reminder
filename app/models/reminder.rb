class Reminder < ApplicationRecord
  attr_accessor :notification_time, :notification_date

  belongs_to :user
  has_many   :notification_weekdays, dependent: :destroy
  accepts_nested_attributes_for :notification_weekdays, allow_destroy: true

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :repeat_type

  with_options presence: true do
    validates :message
    validates :notification_datetime
    validates :repeat_type_id, inclusion: { in: RepeatType.pluck(:id) }
    validates :user
  end
  validate :cannot_reminder_to_past
  validate :cannot_empty_weekdays_repeat_weekly

  # アソシエーション関係のメソッド
  # --------------------------------------------------------------------------------------------

  def weekdays=(wday_nums)
    unless wday_nums.class == Array
      return
    end
    @weekdays = wday_nums.map(&:to_i)
    self.notification_weekdays&.destroy_all
    self.notification_weekdays_attributes = wday_nums.map{ |wday| {weekday_id: wday} }
  end

  def weekdays
    if self.repeat_type != RepeatType.find_by(name: 'repeat-weekly')
      nil
    elsif defined?(@weekdays)
      @weekdays 
    else
      @weekdays =self.notification_weekdays.map(&:weekday_id)
      # @weekdays = self.notification_weekdays.pluck(:weekday_id) # TODO: どっちが良いか後で調べる
    end
  end

  def user_auth_type
    if defined?(@user_auth_type)
      @user_auth_type
    elsif self.user.user_auth_mail.present?
      @user_auth_type = 'user_auth_mail'
    elsif self.user.user_auth_provider.present?
      @user_auth_type = 'user_auth_provider'
    else
      raise RuntimeError, '認証タイプが存在しません'
    end
  end

  def user_auth_model
    self.user.send(self.user_auth_type)
  end

  # フォーム・レスポンス関係のメソッド
  # ---------------------------------------------------------------------------------------------

  def to_response_json
    json_data = JSON.parse(self.to_json, symbolize_names: true)
    # TODO: weekdaysが含まれないので後で修正
    json_data
  end

  # バリデーション関係のメソッド
  # ---------------------------------------------------------------------------------------------
  def cannot_reminder_to_past
    if self.notification_datetime.present? && self.notification_datetime.past?
      errors.add(:notification_datetime, ': 過去の日時に通知することはできません')
    end
  end

  def cannot_empty_weekdays_repeat_weekly
    if self.repeat_type == RepeatType.find_by(name: 'repeat-weekly') && self.notification_weekdays.blank?
      errors.add(:notification_datetime, ': 曜日を選択してください')
    end
  end

  # 通知関係のメソッド
  # ---------------------------------------------------------------------------------------------

  def send_reminder(notification_class=ReminderNotification)
    notification_class.send_reminder(self)
  end

  def save_log(log_class=NotificationLog)
    if self.user_auth_type == 'user_auth_mail'
      log_provider_name = 'mail'
      log_provider_id   = self.user.user_auth_mail.email
    else
      log_provider_name = self.user.user_auth_provider.provider_name
      log_provider_id   = self.user.user_auth_provider.provider_id
    end
    log_class.create(
      notification_time: self.notification_datetime,
      message: self.message,
      provider_name: log_provider_name,
      provider_id:   log_provider_id,
      reminder_id: self.id
    )
  end

  def update_or_delete_reminder
    if self.repeat_type == RepeatType.find_by(name: 'once')
      self.destroy
    else
      little_later = Time.current.since(5.minutes) # 適当に少し未来
      next_time = ReminderService.calc_next_time(self, little_later)
      self.update(notification_datetime: next_time)
    end
  end

  def self.find_all_should_send
    self.includes([
          :notification_weekdays,
          user: [:user_auth_provider, :user_auth_mail]
        ])
        .where('notification_datetime < ?', Time.current)
  end
end
