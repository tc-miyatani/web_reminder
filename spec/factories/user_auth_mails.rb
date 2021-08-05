FactoryBot.define do
  factory :user_auth_mail do
    email { Faker::Internet.safe_email }
    password { Faker::Internet.password(min_length: 6) }
    password_confirmation { password }
    confirmed_at { '2000-01-01 00:00:00' } # 過去
    association :user
  end
end
