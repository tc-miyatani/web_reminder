class Reminder < ApplicationRecord
  belongs_to :user
  has_many :notification_weekdays, dependent: :destroy
  has_many :reminder_user_mails, dependent: :destroy
  has_many :user_mails, through: :reminder_user_mails
  has_many :reminder_user_providers, dependent: :destroy
  has_many :user_providers, through: :reminder_user_providers
  has_many :reminder_weekdays, dependent: :destroy
  has_many :weekdays, through: :reminder_weekdays

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :repeat_type

  with_options presence: true do
    validates :message
    validates :notification_datetime
    validates :repeat_type_id, inclusion: { in: RepeatType.pluck(:id) }
    validates :user
  end

  # アソシエーション関係のメソッド
  # --------------------------------------------------------------------------------------------

  # def weekdays
  #   if self.repeat_type != RepeatType.find_by(name: 'repeat-weekly')
  #     nil
  #   elsif defined?(@weekdays)
  #     @weekdays 
  #   else
  #     @weekdays =self.notification_weekdays.map(&:weekday_id)
  #     # @weekdays = self.notification_weekdays.pluck(:weekday_id) # TODO: どっちが良いか後で調べる
  #   end
  # end

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

  # APIレスポンス関連のメソッド
  # ---------------------------------------------------------------------------------------------

  def to_response_json
    JSON.parse(self.to_json, symbolize_names: true)
    self
  end

  def self.find_all_user_reminders(user_id)
    reminders = self.joins(:user).where(user_id: user_id)
                    .order(id: 'DESC')
                    .to_json(include: {
                              user_mails: {},
                              user_providers: {},
                              weekdays: {},
                            }, except: [:user_id], methods: :weekday_ids)
    { reminders: JSON.parse(reminders) }
  end

  # 通知関係のメソッド
  # ---------------------------------------------------------------------------------------------

  def send_reminder(notification_class=ReminderNotification)
    notification_class.send_reminder(self)
  end

  def save_log(log_class=NotificationLog)
    logs = []
    self.reminder_user_mails.each do |reminder_user_mail|
      log_provider_name = 'mail'
      log_provider_id   = reminder_user_mail.user_mail.email
      logs << [log_provider_name, log_provider_id]
    end
    self.reminder_user_providers.each do |reminder_user_provider|
      log_provider_name = reminder_user_provider.user_provider.provider_name
      log_provider_id   = reminder_user_provider.user_provider.provider_id
      logs << [log_provider_name, log_provider_id]
    end
    logs.each do |log_provider_name, log_provider_id|
      log_class.create(
        notification_time: self.notification_datetime,
        message: self.message,
        provider_name: log_provider_name,
        provider_id:   log_provider_id,
        reminder_id: self.id
      )
    end
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
          reminder_user_mails: [:user_mail],
          reminder_user_providers: [:user_provider]
        ])
        .where('notification_datetime <= ?', Time.current)
  end
end
