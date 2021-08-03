class User < ApplicationRecord
  devise :authenticatable

  has_one :user_auth_mail
  has_one :user_auth_provider
  has_many :reminders
end
