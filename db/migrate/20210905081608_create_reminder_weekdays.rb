class CreateReminderWeekdays < ActiveRecord::Migration[6.0]
  def change
    create_table :reminder_weekdays do |t|
      t.references :reminder,   null: false, foreign_key: true
      t.integer    :weekday_id, null: false
      t.timestamps
    end
    add_foreign_key :reminder_weekdays, :weekdays, column: :weekday_id , primary_key: :id
  end
end
