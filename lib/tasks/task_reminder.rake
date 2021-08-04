namespace :task_reminder do
  desc '通知実行'
  task :notification do
    p Time.current.strftime('%Y-%m-%d %H:%M') + ' NOTIFICATION START!'
    # 通知するものがあるか探す
    # 通知を実行する
    # 通知テーブルのレコード更新・削除
    # 通知ログテーブルにログ追加
  end

  desc  '自動実行テスト'
  task :for_cron_test do
    p Time.current.strftime('%Y-%m-%d %H:%M') + ' OK!'
  end
end
