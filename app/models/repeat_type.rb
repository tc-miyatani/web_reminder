class RepeatType < ActiveHash::Base
  self.data = [
    { id: 1, name: 'once',          text: '1回きり' },
    { id: 2, name: 'repeat-daily',  text: '繰り返し(毎日)' },
    { id: 3, name: 'repeat-weekly', text: '繰り返し(毎週○曜日)' }
  ]
  include ActiveHash::Associations
  has_many :reminders
end
