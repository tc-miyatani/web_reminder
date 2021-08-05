require File.expand_path(File.dirname(__FILE__) + '/environment')
rails_env = ENV['RAILS_ENV'] || :development
set :environment, rails_env
set :output, "#{Rails.root}/log/cron.log"
job_type :rbenv_rake, 'eval "$(rbenv init -)" && cd :path && :environment_variable=:environment bundle exec rake :task --silent :output'

every 1.minutes do
  rbenv_rake 'task_reminder:for_cron_test',
    environment_variable: 'RAILS_ENV',
    environment: rails_env
end
