class CreateReminders < ActiveRecord::Migration[6.0]
  def change
    create_table :reminders do |t|
      t.text       :message,           null: false
      t.datetime   :notification_time, null: false
      t.text       :repeat_rule,       null: false
      t.references :user,              null: false, foreign_key: true
      t.timestamps
    end
  end
end
