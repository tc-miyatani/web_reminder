namespace :task_reminder do
  desc '通知実行'
  task :notification do
    p 'OK!'
  end

  desc  '自動実行テスト'
  task :for_cron_test do
    p 'Hello'
  end
end
