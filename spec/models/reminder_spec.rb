require 'rails_helper'

RSpec.describe Reminder, type: :model do
  describe '#create' do
    before do
      @reminder = FactoryBot.build(:reminder)
    end

    context '登録ができる時' do
      it '入力内容に問題がなければ登録できること' do
        expect(@reminder).to be_valid
      end

      it 'notification_datetimeが未来だと登録できること' do
        @reminder.notification_datetime = Time.current.since(1.minutes)
        expect(@reminder).to be_valid
      end

      it 'repeat_typeが繰り返し(毎週○曜日)で曜日が選択されていると登録できること' do
        @reminder.repeat_type = RepeatType.find_by(name: 'repeat-weekly')
        @reminder.weekdays = [0]
        expect(@reminder).to be_valid
      end
    end

    context '登録ができない時' do
      it 'messageが空では登録できないこと' do
        @reminder.message = ''
        @reminder.valid?
        expect(@reminder.errors.full_messages).to include("Messageを入力してください")
      end

      it 'notification_datetimeが空では登録できないこと' do
        @reminder.notification_datetime = nil
        @reminder.valid?
        expect(@reminder.errors.full_messages).to include("Notification datetimeを入力してください")
      end

      it 'notification_timeが過去だと登録できないこと' do
        @reminder.notification_datetime = Time.current.ago(1.minutes)
        @reminder.valid?
        expect(@reminder.errors.full_messages).to include("Notification datetime: 過去の日時に通知することはできません")
      end

      it 'repeat_typeが繰り返し(毎週○曜日)で曜日が選択されていないと登録できないこと' do
        @reminder.repeat_type = RepeatType.find_by(name: 'repeat-weekly')
        @reminder.weekdays = []
        @reminder.valid?
        expect(@reminder.errors.full_messages).to include("Notification datetime: 曜日を選択してください")
      end
    end
  end
end
