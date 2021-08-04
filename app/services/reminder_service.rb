class ReminderService
  # リマインダーのデータ処理・日付計算を管理するクラス
  # Rails内の日付計算処理はこのクラスに集約させる
  # テストしやすいようにメソッドを分離し、かつ、nowをオプション引数にしておく

  # formから送られてきたデータをDBに保存する形式に変換する
  # その際に直近の通知日時(notification_time)を算出する
  def self.form_data_to_model_data(form_data)
    repeat_rule = { repeat_type: form_data[:repeat_type] }
    case form_data[:repeat_type]
    when 'once' then
      notification_datetime = form_data['notification_date'] + ' ' + form_data['notification_time']
    when 'repeat-daily' then
      notification_datetime = daily_next_time(form_data['notification_time'])
    when 'repeat-weekly' then
      if form_data['notification_weekdays'].blank?
        notification_datetime = Time.current.since(100.years) # エラーになるので適当な値(未来)
      else
        notification_datetime = weekly_next_time(
                                  form_data['notification_time'],
                                  form_data['notification_weekdays']
                                )   
      end
      repeat_rule[:weekdays] = form_data[:notification_weekdays]
    end
    form_data
      .permit(:message)
      .merge(
        notification_time: notification_datetime,
        repeat_rule: repeat_rule.to_json
      )
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
    today_wday = now.wday
    weekdays = weekdays_str.map{ |wday| wday.to_i }
    # 今日
    if weekdays.include?(today_wday)
      next_time = time_of_day(time_str, now)
      if next_time > now
        return next_time.strftime('%Y-%m-%d %H:%M')
      end
    end
    # 今週
    next_time = time_of_day(time_str, now)
    this_week_wday = weekdays.filter{|wday| wday > today_wday }&.min # なければnil
    if this_week_wday.present?
      plus_day = this_week_wday - today_wday
      next_time = next_time.since(plus_day.days)
      return next_time.strftime('%Y-%m-%d %H:%M')
    end
    # 来週
    next_week_wday = weekdays.min
    plus_day = next_week_wday + 7 - today_wday
    next_time = next_time.since(plus_day.days)
    next_time.strftime('%Y-%m-%d %H:%M')
  end

  # 今日の指定時刻
  def self.time_of_day(time_str, now=Time.current)
    Time.zone.parse(now.strftime('%Y-%m-%d') + ' ' + time_str)
  end

  # 指定時刻が過去かどうか
  # time: Timeオブジェクト
  def self.past?(time, now=Time.current)
    time <= now
  end
end
