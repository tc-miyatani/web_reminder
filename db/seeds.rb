ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
  user_auth_mail = UserAuthMail.new(
    email: 'test@web-reminder.jp',
    password: 'abc123', password_confirmation: 'abc123'
  )
  user_auth_mail.confirmed_at = Time.zone.now
  user_auth_mail.save
  user_auth_mail.create_user(nickname: 'test')
end

ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
  data = [
    { id: 0, text: '日' },
    { id: 1, text: '月' },
    { id: 2, text: '火' },
    { id: 3, text: '水' },
    { id: 4, text: '木' },
    { id: 5, text: '金' },
    { id: 6, text: '土' }
  ]
  data.each do |week|
    Weekday.create(week)
  end
end
