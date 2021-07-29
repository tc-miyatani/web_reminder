class User < ApplicationRecord
  devise :authenticatable

  has_one :user_auth_mail
end
