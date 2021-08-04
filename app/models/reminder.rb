class Reminder < ApplicationRecord
  belongs_to :user

  with_options presence: true do
    validates :message
    validates :notification_time
    validates :repeat_rule
    validates :user
  end
  validate :cannot_reminder_to_past
  validate :cannot_empty_weekdays_repeat_weekly

  def cannot_reminder_to_past
    if notification_time.present? && notification_time.past?
      errors.add(:notification_time, ': 過去の日時に通知することはできません')
    end
  end

  def cannot_empty_weekdays_repeat_weekly
    rule = JSON.parse(repeat_rule, symbolize_names: true)
    if rule[:repeat_type] == 'repeat-weekly' && rule[:weekdays].blank?
      errors.add(:notification_time, ': 曜日を選択してください')
    end
  end

  def to_response_json
    json_data = JSON.parse(self.to_json)
    json_data['repeat_rule'] = JSON.parse(json_data['repeat_rule'])
    json_data
  end
end
