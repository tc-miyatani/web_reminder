class CreateNotificationWeekdays < ActiveRecord::Migration[6.0]
  def change
    create_table :notification_weekdays do |t|
      t.integer    :weekday_id, null: false
      t.references :reminder,   null: false, foreign_key: true
      t.timestamps
    end
    add_index :notification_weekdays, [:weekday_id, :reminder_id], unique: true
  end
end
