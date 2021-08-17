class UserAuthMail < ApplicationRecord
  devise  :database_authenticatable,
          :registerable, :confirmable, :recoverable,
          :validatable

  belongs_to :user, optional: true

  def password_required?
    super if confirmed?
  end
end
