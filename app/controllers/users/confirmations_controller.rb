# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
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
    @user_auth_mail = UserAuthMail.find_by_confirmation_token(
                      params[:confirmation_token]
                    )
    if @user_auth_mail.confirmed?
      render json: {res: '登録済みです'} and return
    elsif @user_auth_mail.nil?
      render json: {res: 'この認証用URLは有効ではありません。'} and return
    end
  end

  def confirm
    confirmation_token = params[:user_auth_mail][:confirmation_token]
    @user_auth_mail = UserAuthMail.find_by_confirmation_token(
                        confirmation_token
                      )
    
    @user_auth_mail.assign_attributes(confirmation_params)
    @user_auth_mail.confirmed_at = Time.zone.now # confirmed?がtrueになるようにしてpasswordのバリデーションを有効化する為
    unless @user_auth_mail.valid?
      flash[:errors] = {
        full_messages: @user_auth_mail.errors.full_messages
      }
      redirect_to action: :show, confirmation_token: confirmation_token and return
    end
    user = @user_auth_mail.build_user(nickname: params[:user_auth_mail][:nickname])
    user.save
    @user_auth_mail.confirmation_token = ''
    @user_auth_mail.save
    sign_in(:user, user)
    sign_in(:user_auth_mail, @user_auth_mail)
    redirect_to action: :complete
  end

  def complete
  end

  private

  def confirmation_params
    params.require(:user_auth_mail).permit(:password, :password_confirmation)
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
