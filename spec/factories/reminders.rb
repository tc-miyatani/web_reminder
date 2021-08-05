FactoryBot.define do
  factory :reminder do
    message { Faker::Lorem.sentence }
    notification_datetime { '2099-01-01 00:00' } # 未来
    repeat_type_id  { 1 }
    association :user
  end
end
