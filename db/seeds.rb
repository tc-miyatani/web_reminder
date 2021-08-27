ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
  user_auth_mail = UserAuthMail.new(
    email: 'test@web-reminder.jp',
    password: 'abc123', password_confirmation: 'abc123'
  )
  user_auth_mail.confirmed_at = Time.zone.now
  user_auth_mail.save
  user_auth_mail.create_user(nickname: 'test')
end
