class CreateUserAuthMails < ActiveRecord::Migration[6.0]
  def change
    create_table :user_auth_mails do |t|

      t.timestamps
    end
  end
end
