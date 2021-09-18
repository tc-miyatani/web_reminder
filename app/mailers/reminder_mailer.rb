class ReminderMailer < ApplicationMailer
  def send_reminder(reminder_user_mail)
    mail_to = reminder_user_mail.user_mail.email
    subject = 'CloudReminderによる通知'
    body    = reminder_user_mail.reminder.message

    mail(to: mail_to, subject: subject) do |format|
      format.text { render plain: body }
    end
  end
end
