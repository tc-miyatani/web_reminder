# Reminder関係の内部API専用コントローラー
# TODO: JSONシリアライズ使用するか検討する(jbuilder, jsonapi-serializer)
class Reminders::MainsController < ApplicationController
  before_action :authenticate_user!

  def create
    # binding.pry
    reminder_form = ReminderForm.new(reminder_params)
    unless reminder_form.save
      render json: {
        is_success: false,
        msg: '登録に失敗しました！',
        error_messages: reminder_form.errors.full_messages
      } and return
    end
    render json: {
      is_success: true,
      msg: '登録に成功しました！',
      data: reminder_form.reminder.to_response_json
    }
  end

  def update
    is_success = false
    reminder = Reminder.find_by(id: params[:id], user_id: current_user.id)
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      if reminder_params.has_key?(:notification_weekdays_attributes)
        reminder.notification_weekdays&.destroy_all
      end
      reminder.assign_attributes(reminder_params)
      reminder.notification_datetime = ReminderService.calc_next_time(reminder)
      is_success = reminder.save
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

  def destroy
    reminder = Reminder.find_by(id: params[:id], user_id: current_user.id)
    is_success = reminder.destroy
    render json: {
      is_success: is_success,
      msg: 'リマインダーが削除されました！'
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
    params.require(:reminder_form)
          .permit(
            :reminder_id,
            :repeat_type_id,
            :message,
            :notification_time,
            :notification_date,
            notification_weekdays: [],
            target_mails: [],
            target_providers: [],
          )
          .merge(
            user_id: current_user.id
          )
  end
end
