class ReminderService
  def self.form_data_to_model_data(form_data)
    repeat_rule = { repeat_type: form_data[:repeat_type] }
    case form_data[:repeat_type]
    when 'once' then
      notification_datetime = form_data['notification_date'] + ' ' + form_data['notification_time']
    when 'repeat-daily' then
      now = Time.zone.now
      t = Time.zone.parse(now.strftime('%Y-%m-%d') + ' ' + form_data['notification_time'])
      if t < now
        t = t.tomorrow
      end
      notification_datetime = t.strftime('%Y-%m-%d %H:%M')
    when 'repeat-weekly' then
      repeat_rule[:weekdays] = form_data[:notification_weekdays]
    end
    form_data
      .permit(:message)
      .merge(
        notification_time: notification_datetime,
        repeat_rule: repeat_rule.to_json
      )
  end
end
