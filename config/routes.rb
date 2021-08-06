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

  devise_for :user_auth_providers, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }, path: 'users'

  root to: 'reminders/mypages#index'
  resource :user, only: [:edit, :update], controller: 'reminders/mypages',
                  path: 'users/profile', as: 'user_profile'

  resources :reminders, only: [:new], controller: 'reminders/mains'
  scope :api, format: 'json' do
    resources :reminders, only: [:create], controller: 'reminders/mains'
    resource  :reminders, only: [:show],   controller: 'reminders/mains'
  end
end
