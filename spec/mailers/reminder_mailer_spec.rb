require "rails_helper"

RSpec.describe ReminderMailer, type: :mailer do
  describe '#send_reminer' do
    before(:all) do
      @reminder = FactoryBot.create(:reminder)
      @user_mail = @reminder.create_user.user_mails.create(email: 'sample@com')
      @reminder_user_mail = @reminder.reminder_user_mails.create(user_mail_id: @user_mail.id)
      described_class.send_reminder(@reminder_user_mail).deliver_now
      @mail = ActionMailer::Base.deliveries.last
    end

    context 'リマインダーメール送信' do
      it 'from/to/subject/body' do
        expect(@mail.from.first).to eq ENV['MAIL_FROM']
        expect(@mail.to.first).to   eq @user_mail.email
        expect(@mail.subject).to    eq 'CloudReminderによる通知'
        expect(@mail.body).to  include @reminder.message
      end
    end
  end
end
