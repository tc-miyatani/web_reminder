class MailMessage
  def self.send_reminder(reminder_user_mail)
    # ReminderMailer.send_reminder(reminder).deliver_later
    ReminderMailer.send_reminder(reminder_user_mail).deliver_now
  end
end
