class Reminders::MailsController < ApplicationController

  # 通知先の追加(認証メール送信)
  def create
    #通知先の仮データ作成
    user_mail = current_user.user_mails.build(mail_params)
    unless user_mail.valid?
      render json: {is_success: false, errors: user_mail.errors.full_messages} and return
    end

    # メール送信
    is_success = false
    errors = 'メールの送信に失敗しました！'
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      user_mail.set_token
      user_mail.save
      AddMailMailer.send_add_mail(user_mail).deliver_later
      is_success = true
      errors = nil
    end

    # レスポンス
    render json: {is_success: is_success, errors: errors}
  end

  # メール再送
  def update
    is_success = false
    errors = 'メールの送信に失敗しました！'
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      user_mail = UserMail.find(params[:id])
      user_mail.set_token
      user_mail.save
      AddMailMailer.send_add_mail(user_mail).deliver_later
      is_success = true
      errors = nil
    end

    # レスポンス
    render json: {is_success: is_success, errors: errors}
  end

  # 認証完了
  def confirm
    user_mail = UserMail.find_by(confirmation_token: params[:confirmation_token])
    if user_mail.confirmed?
      flash[:flash_alerts] = [['error', '登録済みののメールアドレスです！']]
    else
      user_mail.set_confirmed
      user_mail.save
      flash[:flash_alerts] = [['success', '通知先の登録が完了しました！']]
    end
    redirect_to edit_user_profile_path
  end

  # 通知先の削除
  def destroy
    if UserMail.find(params[:id]).destroy
      render json: {is_success: true}
    else
      render json: {is_success: false}
    end
  end

  private

  def mail_params
    params.require(:user_mail).permit(:email)
  end
end
