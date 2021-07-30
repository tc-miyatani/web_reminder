class UserAuthProvider < ApplicationRecord
  devise  :authenticatable,
          :omniauthable, omniauth_providers: [:line]

  belongs_to :user

  with_options presence: true do
    validates :provider_id
    validates :provider_name
  end

  def self.create_with_user(user_auth_provider_params)
    user_auth_provider = self.new(user_auth_provider_params)
    user = user_auth_provider.create_user
    user_auth_provider.save
    user_auth_provider
  end
end
