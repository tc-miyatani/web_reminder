class UserAuthProvider < ApplicationRecord
  devise  :authenticatable,
          :omniauthable, omniauth_providers: [:line]

  belongs_to :user

  with_options presence: true do
    validates :provider_id, uniqueness: { scope: :provider_name }
    validates :provider_name
  end

  def self.create_with_user(user_auth_provider_params)
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      user_auth_provider = self.new(user_auth_provider_params)
      user = user_auth_provider.create_user(auth_type: User::AUTH_TYPE_PROVIDER)
      user_auth_provider.save
      user.user_providers.create(
        provider_id: user_auth_provider.provider_id,
        provider_name: user_auth_provider.provider_name
      )

      user_auth_provider
    end
  end
end
