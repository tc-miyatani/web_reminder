class TestMailer < ApplicationMailer
  def send_test(
    mail_to=ENV['MAIL_FROM'],
    subject='CloudReminderによるメール送信テスト',
    body    = 'test!!!'
  )

    mail(to: mail_to, subject: subject) do |format|
      format.text { render plain: body }
    end
  end
end
