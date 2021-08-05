class ReminderNotification
  DEFAULT_SEND_REMINDERS = {
    reminder_mailer: ReminderMailer,
    line_message: LineMessage
  }

  def self.send_reminder(reminder, send_reminders={})
    if reminder.user_auth_type == 'user_auth_mail'
      reminder_type = :reminder_mailer
    elsif reminder.user_auth_model.provider_name == 'line'
      reminder_type = :line_message
    else
      raise RuntimeError.new('プロバイダー名に異常があります')
    end

    reminder_class = send_reminders[reminder_type] || DEFAULT_SEND_REMINDERS[reminder_type]
    reminder_class.send_reminder(reminder)
  end
end
