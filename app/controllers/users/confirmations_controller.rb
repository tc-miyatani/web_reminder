# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  before_action :redirect_root_signed_in!, only: [:confirm]
  before_action :set_confirmation_token_and_user

  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # 認証用URL
  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    if @user_auth_mail.nil?
      error_message = 'この認証用URLは有効ではありません。'
    elsif @user_auth_mail.confirmed?
      error_message = '登録が既に完了しています'
    end
    flash[user_auth_mail_confirmation_path] = (flash[user_auth_mail_confirmation_path]||{}).merge({
      error_message: error_message || nil
    })
    render 'react_pages/empty'
  end

  def confirm
    @user_auth_mail.assign_attributes(confirmation_params)
    @user_auth_mail.confirmed_at = Time.zone.now # confirmed?がtrueになるようにしてpasswordのバリデーションを有効化する為
    unless @user_auth_mail.valid?
      flash[user_auth_mail_confirmation_path] = {
        nickname: params[:user_auth_mail][:nickname],
        validate_errors: {
          full_messages: @user_auth_mail.errors.full_messages
        }
      }
      redirect_to action: :show, confirmation_token: @confirmation_token and return
    end
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      user = @user_auth_mail.create_user(nickname: params[:user_auth_mail][:nickname])
      @user_auth_mail.confirmation_token = nil
      @user_auth_mail.save
      sign_in(:user, user)
      sign_in(:user_auth_mail, @user_auth_mail)
    end

    flash[:flash_alerts] = [['success', '登録が完了しました！']]
    redirect_to root_path
  end

  private

  def confirmation_params
    params.require(:user_auth_mail).permit(:password, :password_confirmation)
  end

  def set_confirmation_token_and_user
    if params[:confirmation_token].present?
      @confirmation_token = params[:confirmation_token]
      flash[:confirmation_token] = @confirmation_token
    elsif flash[:confirmation_token].present?
      @confirmation_token = flash[:confirmation_token]
      flash.keep(:confirmation_token)
    else
      @confirmation_token = nil
      @user_auth_mail = nil
      return
    end
    @user_auth_mail = UserAuthMail.find_by_confirmation_token(@confirmation_token)
  end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end

end
