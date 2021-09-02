class AddMailMailer < ApplicationMailer
  def send_add_mail(user_mail)
    mail_to = user_mail.email
    subject = '【CloudReminder】 通知先メールアドレスの追加(仮登録)'

    @url_token = user_mail_confirm_url(user_mail.confirmation_token)
    mail(to: mail_to, subject: subject)
  end
end
