class ReminderWeekday < ApplicationRecord
  belongs_to :reminder

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :weekday
end
