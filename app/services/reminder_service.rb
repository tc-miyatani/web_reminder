class ReminderService
  # リマインダーのデータ処理・日付計算を管理するクラス
  # Rails内の日付計算処理はこのクラスに集約させる
  # テストしやすいようにメソッドを分離し、かつ、nowをオプション引数にしておく

  WDAYS = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  # 次の通知日時を算出して返す
  def self.calc_next_time(reminder, base_time=Time.current)
    if reminder.notification_time.blank?
      reminder.notification_time = reminder.notification_datetime.strftime('%H:%M')
    end

    case reminder.repeat_type
    when RepeatType.find_by(name: 'once') then
      if reminder.notification_date.blank?
        reminder.notification_date = reminder.notification_datetime.strftime('%Y-%m-%d')
      end
      next_time = reminder.notification_date + ' ' + reminder.notification_time
    when RepeatType.find_by(name: 'repeat-daily') then
      next_time = self.daily_next_time(reminder.notification_time)
    when RepeatType.find_by(name: 'repeat-weekly') then
      if reminder.weekdays.blank?
        next_time = nil
      else
        next_time = self.weekly_next_time(
                                  reminder.notification_time,
                                  reminder.weekdays
                                )   
      end
    else
      raise RuntimeError.new('不正なリピートタイプです')
    end
    next_time
  end

  # 指定時刻の直近の日時(今日その時刻を過ぎているなら明日)
  # time_str: '%H:%M'形式の文字列(24時間表記)
  def self.daily_next_time(time_str, now=Time.current)
    next_time = time_of_day(time_str, now)
    if next_time < now
      next_time = next_time.tomorrow
    end
    next_time.strftime('%Y-%m-%d %H:%M')
  end

  # 指定曜日・指定時刻の直近の日時
  def self.weekly_next_time(time_str, weekdays_str, now=Time.current)
    # 指定時刻を過ぎていなければ昨日を基準日に、過ぎていれば今日を基準日にする
    base_day = time_of_day(time_str, now) > now ? now.yesterday : now
    # 複数の選択している曜日の直近の指定日時を計算し(map)、その中から現在日時以降の(filter)、直近の日時(min)を取得
    next_time = weekdays_str.map{ |wday|
      time_of_day(
        time_str,
        base_day.next_occurring(WDAYS[wday.to_i]) # 直近の指定曜日(基準日と同じ曜日なら1週間後)
      )
    }.filter{|dt| dt > now}.min
    next_time.strftime('%Y-%m-%d %H:%M')
  end

  # 今日の指定時刻
  def self.time_of_day(time_str, now=Time.current)
    Time.zone.parse(now.strftime('%Y-%m-%d') + ' ' + time_str)
  end
end
