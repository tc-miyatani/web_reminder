class ApplicationController < ActionController::Base
  include ApplicationHelper
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  def authenticate_user!
    unless user_signed_in?
      redirect_to new_user_auth_mail_session_path
    end
  end

  def redirect_root_signed_in!
    if user_signed_in?
      flash[:flash_alerts] = [['error', '無効な処理です。ログアウトしてから再度お試しください。']]
      redirect_to root_path
    end
  end
end
