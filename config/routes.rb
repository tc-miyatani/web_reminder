Rails.application.routes.draw do
  devise_for :user_auth_mails, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    sessions:      'users/sessions',
    passwords:     'users/passwords'
  }, path: 'users'
  devise_scope :user_auth_mail do
    get   'users/auth_mail_send', to: 'users/registrations#auth_mail_send'
    patch 'users/confirmation',   to: 'users/confirmations#confirm'
    get   'users/password/send',     to: 'users/passwords#forgot_send'
  end

  devise_for :user_auth_providers, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }, path: 'users'

  root to: 'react_pages#empty'
  resource :user, only: [:edit], controller: 'reminders/mypages',
                  path: 'users/profile', as: 'user_profile'

  resources :reminders, only: [:new], controller: 'react_pages'
  scope :api, format: 'json' do
    resources :reminders, only: [:create, :update, :destroy], controller: 'reminders/mains'
    resource  :reminders, only: [:show],                      controller: 'reminders/mains'
    resource :user, only: :update,  controller: 'reminders/mypages', path: 'users/profile', as: 'api_user_profile'
    resource :user, only: :destroy, controller: 'reminders/mypages', path: 'users', as: 'api_user'
  end
end
