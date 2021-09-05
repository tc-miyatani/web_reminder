class CreateReminderUserProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :reminder_user_providers do |t|
      t.references :reminder,      null: false, foreign_key: true
      t.references :user_provider, null: false, foreign_key: true
      t.timestamps
    end
  end
end
