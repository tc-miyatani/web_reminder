class Reminders::MainsController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  # API リマインダー作成
  # TODO: APIはコントローラー分けるか後で考える
  # TODO: JSONシリアライズ使用するか検討する(jbuilder, jsonapi-serializer)
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

  def update
    reminder = Reminder.find_by(id: params[:id], user_id: current_user.id)
    is_success = reminder.update(reminder_params)
    if is_success
      reminder.notification_datetime = ReminderService.calc_next_time(reminder)
      is_success &= reminder.save
    end
    unless is_success
      render json: {
        is_success: false,
        msg: '更新に失敗しました！',
        error_messages: reminder.errors.full_messages
      } and return
    end
    render json: {
      is_success: true,
      msg: '更新に成功しました！',
      data: reminder.to_response_json
    }
  end

  # API ログインしているユーザーのリマインダー一覧取得
  def show
    reminders = Reminder.find_all_user_reminders(current_user.id)
    render json: JSON.pretty_generate(reminders.as_json) and return # test用
    # reminders
  end

  private

  def reminder_params
    params.require(:reminder)
          .permit(
            :reminder_id,
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
