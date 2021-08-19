# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  before_action :redirect_root_signed_in!, only: [:new, :edit]
  before_action :set_reset_password_token, only: [:edit, :update]

  # GET /resource/password/new
  def new
    render 'react_pages/empty'
  end

  # POST /resource/password
  def create
    user_auth_mail = UserAuthMail.find_by(email_params)
    if user_auth_mail.blank?
      # 存在しないメールアドレス
      #   送信完了メッセージを表示する
      flash[users_password_send_path] = {
        email: email_params[:email],
      }
      redirect_to action: :forgot_send and return
    end

    flash[users_password_send_path] = {
      email: email_params[:email]
    }
    if user_auth_mail.user_id.blank?
      # 仮登録のみで本登録がまだのアカウント
      user_auth_mail.send_confirmation_instructions # 仮登録完了メール再送
    else
      # 本登録済みのアカウント
      user_auth_mail.send_reset_password_instructions # パスワードリセットメール
    end
    redirect_to action: :forgot_send
  end

  def forgot_send
    if flash[users_password_send_path].blank?
      redirect_to root_path and return
    end
    flash.keep(users_password_send_path)
    render 'react_pages/empty'
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    user_auth_mail = UserAuthMail.with_reset_password_token(@reset_password_token)
    if user_auth_mail.blank?
      flash[edit_user_auth_mail_password_path] = {
        error: '無効な処理です。再度、パスワード再設定メールを送信からお試しください。'
      }
    elsif flash[edit_user_auth_mail_password_path].present?
      flash[edit_user_auth_mail_password_path][:error] = nil
    end
    render 'react_pages/empty'
  end

  # PUT /resource/password
  def update
    user_auth_mail = UserAuthMail.reset_password_by_token(reset_password_params)
    unless user_auth_mail.save
      flash[edit_user_auth_mail_password_path] = {
        validate_error_messages: user_auth_mail.errors.full_messages
      }
      redirect_to action: :edit, reset_password_token: @reset_password_token and return
    end
    sign_in(:user, user_auth_mail.user)
    sign_in(:user_auth_mail, user_auth_mail)
    flash[:flash_alerts] = [['success', 'パスワードの再設定が完了しました！']]
    redirect_to root_path
  end

  private

  def email_params
    params.require(:user_auth_mail).permit(:email)
  end

  def reset_password_params
    params.require(:user_auth_mail)
          .permit(:password, :password_confirmation)
          .merge(reset_password_token: @reset_password_token)
  end

  def set_reset_password_token
    if params[:reset_password_token].present?
      @reset_password_token = params[:reset_password_token]
      flash[:reset_password_token] = @reset_password_token
    elsif flash[:reset_password_token].present?
      @reset_password_token = flash[:reset_password_token]
    else
      @reset_password_token = nil
    end
    
  end

  protected

  def after_resetting_password_path_for(resource)
    root_path
  end

  # The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
    users_password_send_path
  end
end
