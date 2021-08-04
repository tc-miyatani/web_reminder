require File.expand_path(File.dirname(__FILE__) + '/environment')
rails_env = ENV['RAILS_ENV'] || :development
set :environment, rails_env
set :output, "#{Rails.root}/log/cron.log"

every 1.minutes do
  rake 'task_reminder:for_cron_test',
    environment_variable: 'RAILS_ENV',
    environment: rails_env
end
