require 'rails_helper'

RSpec.describe UserAuthMail, type: :model do
  describe '#create' do
    before do
      @user_auth_mail = FactoryBot.build(:user_auth_mail)
    end

    context '登録ができる時' do
      it '入力内容に問題がなければ本登録できること' do
        expect(@user_auth_mail).to be_valid
      end

      it 'メールアドレスだけで仮登録できること' do
        @user_auth_mail.confirmed_at = nil
        @user_auth_mail.password = ''
        @user_auth_mail.password_confirmation = ''
        expect(@user_auth_mail).to be_valid
      end
    end

    context '登録ができない時' do
      it 'emailが空では仮登録できないこと' do
        @user_auth_mail.confirmed_at = nil
        @user_auth_mail.email = ''
        @user_auth_mail.valid?
        expect(@user_auth_mail.errors.full_messages).to include("Emailを入力してください")
      end

      it 'passwordが空では本登録できないこと' do
        @user_auth_mail.password = ''
        @user_auth_mail.valid?
        expect(@user_auth_mail.errors.full_messages).to include("Passwordを入力してください")
      end

      it 'passwordが6文字以上であれば本登録できること' do
        @user_auth_mail.password = '123456'
        @user_auth_mail.password_confirmation = @user_auth_mail.password
        expect(@user_auth_mail).to be_valid
      end

      it 'passwordが5文字以下であれば本登録できないこと' do
        @user_auth_mail.password = '12345'
        @user_auth_mail.valid?
        expect(@user_auth_mail.errors.full_messages).to include("Passwordは6文字以上で入力してください")
      end

      it 'passwordとpassword_confirmationが不一致では本登録できないこと' do
        @user_auth_mail.password = '123456'
        @user_auth_mail.password_confirmation = '1234567'
        @user_auth_mail.valid?
        expect(@user_auth_mail.errors.full_messages).to include("Password confirmationとPasswordの入力が一致しません")
      end

      it '仮登録済みのemailでは再度仮登録できないこと' do
        @user_auth_mail.confirmed_at = nil
        @user_auth_mail.password = ''
        @user_auth_mail.save
        user_auth_mail2 = FactoryBot.build(:user_auth_mail, email: @user_auth_mail.email)
        user_auth_mail2.confirmed_at = nil
        @user_auth_mail.password = ''
        user_auth_mail2.valid?
        expect(user_auth_mail2.errors.full_messages).to include("Emailはすでに存在します")
      end

      it '本登録済みのemailでは再度仮登録できないこと' do
        @user_auth_mail.save
        user_auth_mail2 = FactoryBot.build(:user_auth_mail, email: @user_auth_mail.email)
        user_auth_mail2.confirmed_at = nil
        @user_auth_mail.password = ''
        user_auth_mail2.valid?
        expect(user_auth_mail2.errors.full_messages).to include("Emailはすでに存在します")
      end
    end
  end
end
