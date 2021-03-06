class CreateUserAuthMails < ActiveRecord::Migration[6.0]
  def change
    create_table :user_auth_mails do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      t.references :user, foreign_key: true, optional: true

      t.timestamps
    end

    add_index :user_auth_mails, :email,                unique: true
    add_index :user_auth_mails, :reset_password_token, unique: true
    add_index :user_auth_mails, :confirmation_token,   unique: true
  end
end
