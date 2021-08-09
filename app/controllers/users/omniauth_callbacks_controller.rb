# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def line
    authorization
  end

  private

  def authorization
    user_auth_provider = UserAuthProvider.where(user_auth_provider_params).first
    if user_auth_provider
      # 登録済みアカウント: ログインする
      user = user_auth_provider.user
      sign_in(:user, user)
      sign_in(:user_auth_provider, user_auth_provider)
      redirect_to root_path and return
    end

    # 未登録アカウント: 新規登録してログインする
    user_auth_provider = UserAuthProvider.create_with_user(user_auth_provider_params)
    sign_in(:user, user)
    sign_in(:user_auth_provider, user_auth_provider)
    flash[:flash_alerts] = [['success', '登録が完了しました！']]
    redirect_to root_path and return
  end

  private

  def user_auth_provider_params
    auth = request.env['omniauth.auth']
    {
      provider_name: auth[:provider],
      provider_id:   auth[:uid]
    }
  end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
