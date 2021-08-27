class MailMessage
  def self.send_reminder(reminder)
    # ReminderMailer.send_reminder(reminder).deliver_later
    ReminderMailer.send_reminder(reminder).deliver_now
  end
end
