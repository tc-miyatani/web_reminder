module ApplicationHelper
  def current_user_auth_model
    if user_auth_mail_signed_in?
      current_user_auth_mail
    elsif user_auth_provider_signed_in?
      current_user_auth_provider
    else
      nil
    end
  end
  
  def current_user
    current_user_auth_model&.user
  end

  def user_signed_in?
    user_auth_mail_signed_in? || user_auth_provider_signed_in?
  end

  def current_user_data
    JSON.parse(
      current_user.to_json(
        include: {
          user_auth_mail: {},
          user_auth_provider: {},
          user_mails: {},
          user_providers: {},
        },
        except: []
      )
    )
  end
end
