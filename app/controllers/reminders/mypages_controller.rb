class Reminders::MypagesController < ApplicationController
  def index
  end

  def edit
    # @user = User.find()
    flash.keep
    render json: {res: 'hello'}
  end

  def update
  end
end
