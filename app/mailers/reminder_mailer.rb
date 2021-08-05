class ReminderMailer < ApplicationMailer
  def send_reminder(reminder)
    mail_to = reminder.user.user_auth_mail.email
    subject = 'WebReminderによる通知'
    body    = reminder.message

    mail(to: mail_to, subject: subject) do |format|
      format.text { render plain: body }
    end
  end
end
