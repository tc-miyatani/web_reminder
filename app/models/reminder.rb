class Reminder < ApplicationRecord
  belongs_to :user

  with_options presence: true do
    validates :message
    validates :notification_time
    validates :repeat_rule
    validates :user
  end
end
