class Reminders::MainsController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    reminder = Reminder.new(reminder_params)
    reminder.notification_datetime = ReminderService.calc_next_time(reminder)
    unless reminder.save
      render json: {
        is_success: false,
        msg: '登録に失敗しました！',
        error_messages: reminder.errors.full_messages
      } and return
    end
    render json: {
      is_success: true,
      msg: '登録に成功しました！',
      data: reminder.to_response_json
    }
  end

  private

  def reminder_params
    params.require(:reminder)
          .permit(
            :repeat_type_id, :message,
            :notification_time,
            :notification_date,
            notification_weekdays_attributes: [:weekday_id]
          )
          .merge(
            user_id: current_user.id
          )
  end
end
