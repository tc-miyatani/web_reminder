class CreateReminders < ActiveRecord::Migration[6.0]
  def change
    create_table :reminders do |t|
      t.text       :message,               null: false
      t.datetime   :notification_datetime, null: false
      t.integer    :repeat_type_id,        null: false
      t.references :user,                  null: false, foreign_key: true
      t.timestamps
    end
  end
end
