namespace :task_reminder do
  desc '通知実行'
  task :notification => :environment do
    p Time.current.strftime('%Y-%m-%d %H:%M:%S') + ' NOTIFICATION START!'
    p Reminder.first.message
  end

  desc  '自動実行テスト'
  task :for_cron_test => :environment do
    p Time.current.strftime('%Y-%m-%d %H:%M:%S') + ' NOTIFICATION START!'
    reminders = Reminder.find_all_should_send
    reminders.each do |reminder|
      begin
        reminder.send_reminder
        reminder.save_log
        reminder.update_or_delete_reminder
      rescue => e
        logger.error "_$$_REMINDER_SEND_ERROR_$$_: #{e} !!!"
      end
    end
    p Time.current.strftime('%Y-%m-%d %H:%M:%S') + ' NOTIFICATION END!!!'
  end
end
