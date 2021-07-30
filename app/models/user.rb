class User < ApplicationRecord
  devise :authenticatable

  has_one :user_auth_mail
  has_one :user_auth_provider
end
