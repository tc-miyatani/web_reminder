class ReminderNotification
  PROVIDER_MESSAGES = {
    mail: MailMessage,
    line: LineMessage
  }

  def self.send_reminder(reminder, provider_messages=self::PROVIDER_MESSAGES)
    reminder.reminder_user_mails.each do |reminder_user_mail|
      provider_message = provider_messages[:mail]
      provider_message.send_reminder(reminder_user_mail)
    end
    reminder.reminder_user_providers.each do |reminder_user_provider|
      reminder_name = reminder_user_provider.user_provider.provider_name
      provider_message = provider_messages[reminder_name.to_sym]
      provider_message.send_reminder(reminder_user_provider)
    end
  end
end
