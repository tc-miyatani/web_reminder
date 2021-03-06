# 開発時に使用するコマンドのメモ

## デプロイ

```zsh:local
# Capistranoを使用した自動デプロイ
bundle exec cap production deploy

# AWSにSSH接続
ssh -i ファイル名x.pem ec2-user@web-reminder.jp
```

```zsh:AWS
# unicornプロセスkill
ps aux | grep unicorn | grep master | awk '{ print "kill", $2 }' | sh
```

## react-rails

```zsh:local
rails g react:component dir_name/ComponentName prop_name:string
```

## command test



## rake / cron / whenever

### rake test
```zsh:AWS
cd /var/www/web_reminder/current
rails task_reminder:notification RAILS_ENV=production
```

### whenever local

```zsh:local
# wheneverの設定にエラーがないか確認
bundle exec whenever
# wheneverの`config/schedule.rb`をcronに反映
bundle exec whenever --update-crontab
# cronに設定されている内容を確認
crontab -l
# wheneverの設定内容をcronから削除
bundle exec whenever --clear-crontab
```

### whenever AWS

```zsh:AWS
cd /var/www/web_reminder/current
bundle exec whenever --update-crontab --set environment='production'
crontab -l
crontab -e
# `/releases/xxxxx`を`/current`に変更
# `RAILS_ENV=development`を`RAILS_ENV=production`に変更
```

## ER

rails-ERDを利用したER図の自動生成

```zsh
# pdf
sudo bundle exe erd
# png
sudo bundle exe erd --filetype=dot
dot -Tpng erd.dot > erd.png
```

## 開発時に使用したコマンド

### SSH

```zsh:local
chmod 600 ファイル名.pem
```

### MariaDB

```zsh:AWS
sudo yum -y install  mariadb-server mysql-devel
sudo systemctl start mariadb
sudo /usr/bin/mysql_secure_installation
```

```sql:AWS
-- `rails db:create RAILS_ENV=production`前に以下実行
CREATE USER 'web_reminder'@'localhost' IDENTIFIED BY 'パスワード';
grant create on *.* to 'web_reminder'@'localhost';
-- `rails db:create RAILS_ENV=production`後に以下実行
revoke create on *.* from 'web_reminder'@'localhost';
GRANT ALL ON web_reminder_production.* TO 'web_reminder'@'localhost';
```

### SSL/TLS証明書発行(Let's Encrypt Certbot)

```zsh:AWS
sudo systemctl stop nginx
sudo certbot-auto certonly --standalone -d web-reminder.jp -m master@web-reminder.jp --agree-tos -n
sudo systemctl start nginx
```

# EC2再起動時

```zsh
sudo systemctl start mariadb
sudo systemctl start nginx
```

# 開発時のwebpacker

react開発時、毎回１からbuildせずにホットリロードさせる

```zsh
bin/webpack-dev-server
```
