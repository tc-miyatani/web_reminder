# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :redirect_root_signed_in!, only: [:new]
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    render 'react_pages/empty'
  end

  # POST /resource/sign_in
  def create
    flash[:validates_errors] = {
      data: {email: sign_in_params[:email]},
      full_messages: ['メールアドレスまたはパスワードが違います']
    }
    super
    flash[:validates_errors] = nil
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
