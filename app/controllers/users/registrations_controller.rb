# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    @user_auth_mail = UserAuthMail.new(email: flash[:email] || '')
  end

  # POST /resource
  def create
    @user_auth_mail = UserAuthMail.new(params.require(:user_auth_mail).permit(:email))
    
    unless @user_auth_mail.save
      flash[:email] = @user_auth_mail.email
      flash[:errors] = {
        model_name: @user_auth_mail.class.model_name.human.downcase,
        full_messages: @user_auth_mail.errors.full_messages
      }
      redirect_to action: :new and return
    end
    flash[:user_auth_mail] = @user_auth_mail.email
    redirect_to action: :auth_mail_send
  end

  def auth_mail_send
    @email = flash[:user_auth_mail]
    flash.keep
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
