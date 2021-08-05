class NotificationWeekday < ApplicationRecord
  belongs_to :reminder

  with_options presence: true do
    validates :weekday_id, numericality: {
      only_integer: true,
      greater_than_or_equal_to: 0,
      less_than_or_equal_to: 6
    }
    validates :reminder
  end
end
