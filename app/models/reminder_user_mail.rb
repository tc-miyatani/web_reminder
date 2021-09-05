class ReminderUserMail < ApplicationRecord
  belongs_to :reminder
  belongs_to :user_mail
end
