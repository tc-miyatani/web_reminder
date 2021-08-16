module ApplicationHelper
  def current_user
    if user_auth_mail_signed_in?
      current_user_auth_mail.user
    elsif user_auth_provider_signed_in?
      current_user_auth_provider.user
    else
      nil
    end
  end

  def user_signed_in?
    user_auth_mail_signed_in? || user_auth_provider_signed_in?
  end
end
