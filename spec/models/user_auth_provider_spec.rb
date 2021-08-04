require 'rails_helper'

RSpec.describe UserAuthProvider, type: :model do
  describe '#create' do
    before do
      @user_auth_provider = FactoryBot.build(:user_auth_provider)
    end

    context '登録ができる時' do
      it '入力内容に問題がなければ登録できること' do
        expect(@user_auth_provider).to be_valid
      end
    end

    context '登録ができない時' do
      it 'provider_nameが空では登録できないこと' do
        @user_auth_provider.provider_name = ''
        @user_auth_provider.valid?
        expect(@user_auth_provider.errors.full_messages).to include("Provider nameを入力してください")
      end

      it 'provider_idが空では登録できないこと' do
        @user_auth_provider.provider_id = ''
        @user_auth_provider.valid?
        expect(@user_auth_provider.errors.full_messages).to include("Providerを入力してください")
      end
    end
  end
end
