require "rails_helper"

RSpec.describe ReminderMailer, type: :mailer do
  describe '#send_reminer' do
    before(:all) do
      @reminder = FactoryBot.build(:reminder)
      @user_auth_mail = @reminder.build_user(id: 99999).build_user_auth_mail(email: ENV['GMAIL_FROM'])
      described_class.send_reminder(@reminder).deliver_now
      @mail = ActionMailer::Base.deliveries.last
    end

    context 'リマインダーメール送信' do
      it 'from/to/subject/body' do
        expect(@mail.from.first).to eq ENV['MAIL_FROM']
        expect(@mail.to.first).to   eq @user_auth_mail.email
        expect(@mail.subject).to    eq 'CloudReminderによる通知'
        expect(@mail.body).to  include @reminder.message
      end
    end
  end
end
