# frozen_string_literal: true

class DeviseCreateUserMails < ActiveRecord::Migration[6.0]
  def change
    create_table :user_mails do |t|
      t.string :email,              null: false, default: ""
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      t.references :user, null: false, foreign_key: true

      t.timestamps null: false
    end

    add_index :user_mails, [:email, :user_id],    unique: true
    add_index :user_mails, :confirmation_token,   unique: true
  end
end
