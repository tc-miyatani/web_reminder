class ReminderForm
  include ActiveModel::Model
  attr_accessor :id,
                :repeat_type_id,
                :notification_date,
                :notification_time,
                :notification_datetime,
                :notification_weekdays,
                :message,
                :target_mails,
                :target_providers,
                :user_id,
                :reminder

  with_options presence: true do
    validates :repeat_type_id, inclusion: { in: RepeatType.pluck(:id) }
    validates :notification_time
  end
  validate  :required_targets
  validates :notification_date,     presence: true, if: :required_date?
  validate :cannot_reminder_to_past
  validate :cannot_empty_weekdays_repeat_weekly

  def initialize(params=nil)
    if params.nil?
      return super
    end
    super(params)
    cast
    @repeat_type = RepeatType.find(self.repeat_type_id)
    self.notification_datetime = ReminderService.calc_first_time(self)
  end

  def cast
    self.repeat_type_id = self.repeat_type_id.to_i
    self.target_mails = self.target_mails&.map(&:to_i)
    self.target_providers = self.target_providers&.map(&:to_i)
  end

  def repeat_type
    @repeat_type
  end

  def save
    self.reminder = Reminder.create(
      repeat_type_id: self.repeat_type_id,
      notification_datetime: self.notification_datetime,
      message: self.message,
      user_id: self.user_id,
      user_mail_ids: self.target_mails,
      user_provider_ids: self.target_providers,
      weekday_ids: self.notification_weekdays
    )
  end

  def self.find(reminder_id, user_id)
    res = self.new
    res.reminder = Reminder.find_by(id: reminder_id, user_id: user_id)
    res
  end

  def update(data)
    unless self.reminder
      return false
    end
    self.assign_attributes(data)
    cast
    @repeat_type = RepeatType.find(self.repeat_type_id)
    self.notification_datetime = ReminderService.calc_first_time(self)
    unless self.valid?
      return false
    end
    self.reminder.update(
      repeat_type_id: self.repeat_type_id,
      notification_datetime: self.notification_datetime,
      message: self.message,
      user_id: self.user_id,
      user_mail_ids: self.target_mails,
      user_provider_ids: self.target_providers,
      weekday_ids: self.notification_weekdays
    )
  end

  private

  # バリデーション関係のメソッド
  # ---------------------------------------------------------------------------------------------


  def cannot_reminder_to_past
    if self.notification_datetime.present? && Time.zone.parse(self.notification_datetime).past?
      errors.add(:notification_datetime, ': 過去の日時に通知することはできません')
    end
  end

  def cannot_empty_weekdays_repeat_weekly
    if self.repeat_type_id == RepeatType.find_by(name: 'repeat-weekly').id && self.notification_weekdays.blank?
      errors.add(:notification_datetime, ': 曜日を選択してください')
    end
  end

  def cannot_empty_weekdays_repeat_weekly
    if self.repeat_type_id == RepeatType.find_by(name: 'repeat-weekly').id && self.notification_weekdays.blank?
      errors.add(:notification_datetime, ': 曜日を選択してください')
    end
  end

  def required_targets
    if self.target_mails.blank? && self.target_providers.blank?
      errors.add(:target_mails, ': 通知先を1つ以上選択してください')
    end
  end

  def required_date?
    self.repeat_type_id == RepeatType.find_by(name: 'once').id
  end
end
