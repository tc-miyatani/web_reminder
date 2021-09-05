class User < ApplicationRecord
  AUTH_TYPE_MAIL = 1
  AUTH_TYPE_PROVIDER = 2

  devise :authenticatable

  has_one :user_auth_mail,     dependent: :destroy
  has_one :user_auth_provider, dependent: :destroy
  has_many :reminders,         dependent: :destroy
  has_many :user_mails,        dependent: :destroy
  # LINE以外のソーシャルログインを追加することを想定してhas_manyにしておく
  has_many :user_providers,    dependent: :destroy
end
