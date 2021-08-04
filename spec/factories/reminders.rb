FactoryBot.define do
  factory :reminder do
    message { Faker::Lorem.sentence }
    notification_time { '2099-01-01 00:00' } # 未来
    repeat_rule { { repeat_type: 'once' }.to_json }
    association :user
  end
end
