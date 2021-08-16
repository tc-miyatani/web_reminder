# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    @user_auth_mail = UserAuthMail.new(email: flash[:email] || '')
    render 'react_pages/empty'
  end

  # POST /resource
  def create
    @user_auth_mail = UserAuthMail.new(params.require(:user_auth_mail).permit(:email))
    
    is_save = nil
    begin
      ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
        is_save = @user_auth_mail.save # ここでメールが送信される
      end
      is_mail_send = true
    rescue => e
      is_mail_send = false
      logger.debug("mail send failed. because of #{e}")
    end    

    unless is_mail_send
      # メール送信エラー
      # ActiveRecord::Rollback
      flash[:email] = @user_auth_mail.email
      flash[:errors] = {
        model_name: '仮登録アカウント',
        full_messages: ['申し訳ございません、メールの送信に失敗しました。']
      }
      redirect_to action: :new and return
    end

    unless is_save
      # バリデーションエラー
      flash[:validates_errors] = {
        data: {email: @user_auth_mail.email},
        full_messages: @user_auth_mail.errors.full_messages
      }
      redirect_to action: :new and return
    end

    flash[users_auth_mail_send_path] = { email: @user_auth_mail.email }
    redirect_to action: :auth_mail_send
  end

  def auth_mail_send
    flash.keep
    render 'react_pages/empty'
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
