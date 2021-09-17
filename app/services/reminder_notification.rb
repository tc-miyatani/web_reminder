class ReminderNotification
  def self.send_reminder(reminder)
    remider.reminder_user_mails.each do |reminder_user_mail|
      MailMessage.send_reminder(reminder_user_mail)
    end
    reminder.reminder_user_providers.each do |reminder_user_provider|
      if user_provider.provider_name == 'line'
        LineMessage.send_reminder(reminder_user_provider)
      else
        raise RuntimeError.new('プロバイダー名に異常があります')
      end
    end
  end
end
