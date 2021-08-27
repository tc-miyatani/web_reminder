# config valid for current version and patch releases of Capistrano
lock "3.16.0"

set :application, "web_reminder"
set :repo_url, "git@github.com:tc-miyatani/web_reminder.git"
set :deploy_to, '/var/www/web_reminder'
set :scm, :git

set :linked_dirs, fetch(:linked_dirs, []).push(
  'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets',
  'vendor/bundle', 'public/system', 'public/uploads',
  'node_modules', 'app/assets',
)

set :rbenv_type, :user
set :rbenv_ruby, '2.6.5'

set :ssh_options, auth_methods: ['publickey'],
                                  keys: ['~/.ssh/aws-and-infra-ssh-key.pem'] 

set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 3

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end
