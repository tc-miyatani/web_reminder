class Reminders::MypagesController < ApplicationController
  def index
  end

  def edit
    flash[edit_user_profile_path] = {
      nickname: current_user.nickname
    }
    render 'react_pages/empty'
  end

  def update
    sleep 2.0 # loadingを見せるためにわざと遅らせる
    if current_user.update(params.require(:user).permit(:nickname))
      render json: {is_success: true, msg: '更新が完了しました！'}
    else
      render json: {
        is_success: true, msg: '更新に失敗しました！',
        error_messages: current_user.errors.full_messages
      }
    end
  end

  def destroy
    if current_user.destroy
      render json: {is_success: true, msg: 'アカウント削除が完了しました！'}
    else
      render json: {
        is_success: true, msg: 'アカウント削除に失敗しました！',
        error_messages: current_user.errors.full_messages
      }
    end
  end
end
