FactoryBot.define do
  factory :user_auth_provider do
    provider_name { 'line' }
    provider_id   { ENV['LINE_TEST_ID'] }
    association :user
  end
end
