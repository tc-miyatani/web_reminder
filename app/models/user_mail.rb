class UserMail < ApplicationRecord
  belongs_to :user
  has_many :reminder_user_mails, dependent: :destroy
  has_many :reminders, through: :reminder_user_mails

  validates :email, presence: true, uniqueness: { scope: :user_id }

  def generate_token
    SecureRandom.urlsafe_base64
  end

  def set_token
    self.confirmation_token = generate_token
    self.confirmation_sent_at = Time.current
  end

  def set_confirmed
    self.confirmation_token = nil
    self.confirmed_at = Time.current
  end

  def confirmed?
    !!self.confirmed_at
  end
end
