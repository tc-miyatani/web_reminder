class CreateNotificationLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :notification_logs do |t|
      t.datetime :notification_time, null: false
      t.text     :message,           null: false
      t.string   :provider_name,     null: false
      t.string   :provider_id,       null: false
      t.integer  :reminder_id,       null: false
      t.timestamps
    end

    add_index :notification_logs, [:provider_id, :provider_name, :notification_time],
              unique: true, name: 'idx_notification_logs_provider_id_name_time'
    add_index :notification_logs, [:notification_time]
  end
end
