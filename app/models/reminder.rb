class Reminder < ApplicationRecord
  belongs_to :user

  with_options presence: true do
    validates :message
    validates :notification_time
    validates :repeat_rule
    validates :user
  end
  validate :cannot_reminder_to_past

  def cannot_reminder_to_past
    if notification_time < Time.zone.now
      errors.add(:notification_time, ': 過去の日時に通知することはできません')
    end
  end

  def to_response_json
    json_data = JSON.parse(self.to_json)
    json_data['repeat_rule'] = JSON.parse(json_data['repeat_rule'])
    json_data
  end
end
