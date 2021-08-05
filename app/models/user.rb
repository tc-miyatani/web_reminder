class User < ApplicationRecord
  devise :authenticatable

  has_one :user_auth_mail,     dependent: :destroy
  has_one :user_auth_provider, dependent: :destroy
  has_many :reminders,         dependent: :destroy
end
