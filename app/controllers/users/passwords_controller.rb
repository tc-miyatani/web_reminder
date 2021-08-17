# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  def new
    render 'react_pages/empty'
  end

  # POST /resource/password
  def create
    binding.pry
    super do |x|
      binding.pry
    end
  end

  def forgot_send
    render 'react_pages/empty'
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    binding.pry
    super
  end

  # PUT /resource/password
  def update
    binding.pry
    super
  end

  def complete
    render 'react_pages/empty'
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
