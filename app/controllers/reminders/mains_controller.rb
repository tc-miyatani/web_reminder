class Reminders::MainsController < ApplicationController
  def new
  end

  def create
    if params[:repeat_type] == 'repeat-weekly' && params[:notification_weekdays].blank?
      render json: {
        is_success: false,
        msg: '登録に失敗しました！',
        error_messages: ['曜日を選択してください！']
      } and return
    end
    reminder = Reminder.new(reminder_params)
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
    ReminderService
      .form_data_to_model_data(params)
      .merge(user_id: current_user.id)
  end
end
