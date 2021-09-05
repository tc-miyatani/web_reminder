class UserProvider < ApplicationRecord
  belongs_to :user
  has_many :reminder_user_providers, dependent: :destroy
  has_many :reminders, through: :reminder_user_providers

  with_options presence: true do
    # １つのLINEアカウントを複数のアカウントに設定可、１つのアカウント内でユニーク制約
    validates :provider_id,   uniqueness: { scope: [:user_id, :provider_name] }
    # 1アカウントに1つのLINEアカウントまで
    validates :provider_name, uniqueness: { scope: :user_id }
  end

end
