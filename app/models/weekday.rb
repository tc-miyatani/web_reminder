class Weekday < ApplicationRecord
  has_many :reminder_weekdays, dependent: :destroy
  has_many :reminders, through: :reminder_weekdays
end
