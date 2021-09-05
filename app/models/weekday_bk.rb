class Weekday < ActiveHash::Base
  self.data = [
    { id: 0, text: '日' },
    { id: 1, text: '月' },
    { id: 2, text: '火' },
    { id: 3, text: '水' },
    { id: 4, text: '木' },
    { id: 5, text: '金' },
    { id: 6, text: '土' }
  ]
  include ActiveHash::Associations
  has_many :reminder_weekdays, dependent: :destroy
  has_many :reminders, through: :reminder_weekdays
end
