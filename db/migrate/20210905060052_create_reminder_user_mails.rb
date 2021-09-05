class CreateReminderUserMails < ActiveRecord::Migration[6.0]
  def change
    create_table :reminder_user_mails do |t|
      t.references :reminder,  null: false, foreign_key: true
      t.references :user_mail, null: false, foreign_key: true
      t.timestamps
    end
  end
end
