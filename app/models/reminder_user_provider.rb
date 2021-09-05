class ReminderUserProvider < ApplicationRecord
  belongs_to :reminder
  belongs_to :user_provider
end
