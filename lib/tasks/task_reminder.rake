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
      rescue => e
        p "_$$_REMINDER_SEND_ERROR_$$_: #{e} !!!"
      else
        begin
          reminder.save_log
        rescue => e2
          p "_$$_REMINDER_SAVE_LOG_ERROR_$$_: #{e2} !!!"
        end
        begin
          reminder.update_or_delete_reminder
        rescue => e3
          p "_$$_REMINDER_UPDATE_ERROR_$$_: #{e3} !!!"
        end
      end
    end
    p Time.current.strftime('%Y-%m-%d %H:%M:%S') + ' NOTIFICATION END!!!'
  end
end
