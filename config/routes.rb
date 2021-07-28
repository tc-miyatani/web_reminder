Rails.application.routes.draw do
  devise_for :user_auth_mails, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    sessions:      'users/sessions'
  }, path: 'users'
  devise_scope :user_auth_mail do
    get   'users/auth_mail_send', to: 'users/registrations#auth_mail_send'
    patch 'users/confirmation',   to: 'users/confirmations#confirm'
    get   'users/complete',       to: 'users/confirmations#complete'
  end
  root to: 'reminders/mypages#index'
end
