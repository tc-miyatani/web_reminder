namespace :task_update do
  desc 'auth_type追加'
  task :auth_type => :environment do
    User.where(auth_type: 0).each do |user|
      auth_type = user.user_auth_mail.present? ? 1 : 2
      user.update(auth_type: auth_type)
    end
  end

  desc '通知先追加に対応(メール)'
  task :user_mails_default => :environment do
    User.where(auth_type: User::AUTH_TYPE_MAIL).each do |user|
      user_auth_mail = user.user_auth_mail
      if user.user_mails.exists?(email: user_auth_mail.email)
        next
      end
      user.user_mails.create(
        email: user_auth_mail.email,
        confirmed_at: user_auth_mail.confirmed_at
      )
    end
  end

  desc '通知先追加に対応(LINE)'
  task :user_providers_default => :environment do
    User.includes(:user_auth_provider).where(auth_type: User::AUTH_TYPE_PROVIDER).find_each do |user|
      UserProvider.find_or_create_by(user.user_auth_provider.attributes)
    end
  end
end
