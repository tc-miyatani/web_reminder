# アプリケーション名

CloudReminder

# アプリケーション概要

Web上でリマインダーを設定して、設定した日時にLINEやメールに通知を送れるウェブサービスです。
1回きりの通知だけでなく、毎日通知や毎週指定曜日に通知の設定もできます。

# URL

[https://web-reminder.jp/](https://web-reminder.jp/)

# テスト用アカウント

* メールアドレス : `test@web-reminder.jp`
* パスワード     : `abc123`

# 利用方法

* トップページファーストビュー中央の「今すぐ始める」または右上の「新規登録」からアカウント登録に進んでください。

![トップページ](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/top.gif?raw=true)

* メールに通知を送りたい場合はメールアドレスで登録を、LINEに通知を送りたい場合はLINEアカウントで登録をしてください。

* メールアドレスで登録する場合は、入力したメールアドレスに送られるメールに記載されている認証用URLから本登録に進んでください。

![メール認証](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/sign_up.gif?raw=true)

*  LINEアカウントで登録する場合は、公式アカウントと友達登録をお願いします
    * 友達登録しないと通知が送られません

![LINEログイン](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/line_login.gif?raw=true)

* リマインダー作成からリマインダーを登録してください。
  * 登録が完了したらWEBアプリは閉じていただいて大丈夫です。
  * 設定した日時になれば、通知が送られます。

![LINEログイン](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/reminder_create_once.gif?raw=true)

![LINEログイン](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/reminder_create_week.gif?raw=true)

* リマインダーの編集・削除はマイページから可能です。

![LINEログイン](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/reminder_update_delete.gif?raw=true)

* ユーザーアカウントの編集・削除は、画面右上のユーザーアイコンからユーザーアカウントページへ移行して行ってください。

![LINEログイン](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/user_name_update.gif?raw=true)

# 使用技術

* バックエンド
  * Ruby 2.6.5
  * Ruby on Rails 6.0.0
* フロントエンド
  * React(react-rails) / Material-UI
* API
  * Lineログイン / Line Messaging API
* インフラ
  * MySQL 5.6 (ローカル) / MariaDB 5.5 (AWS)
  * AWS
    * VPC
    * EC2
    * Route53
  * SSL/TLS: Let's Encrypt (Certbot)
  * cron (whenever): 任意のタイミングで通知できるようにする為
  * Zoho Mail: メール認証・メール通知時の送信元を独自ドメインメールにする為
  * Docker/Docker-compose
    * Dockerの構成詳細は[tc-miyatani/my_docker](https://github.com/tc-miyatani/my_docker)のリポジトリに分けています。
  * Capistrano3
  * CircleCI(自動テストのみ)

# インフラ構成図

![インフラ構成図](https://github.com/tc-miyatani/web_reminder/raw/readme-images/imgs/infra.jpg?raw=true)

# 機能一覧

* ユーザー登録、ログイン機能(device)
  * メール認証、パスワードリセット
  * LINEログイン
* リマインダー登録・編集・削除機能(Ajax(Axios))
* メール通知機能
* LINE通知機能

# テスト

* RSpec
  * 単体テスト(model, service)

# データベース設計

![ER図](erd.png)

## usersテーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| nickname           | string | null: false |

Association

+ has_one :user_auth_mail
+ has_one :user_auth_provider
+ has_many :reminders

## user_auth_mails

| Column               | Type       | Options     |
| -------------------- | ---------- | ----------- |
| email                | string     | null: false |
| encrypted_password   | string     | null: false |
| confirmation_token   | string     | null: false |
| confirmed_at         | string     | null: false |
| confirmation_sent_at | string     | null: false |
| reset_password_token   | string     | null: false |
| reset_password_sent_at | string     | null: false |
| user                 | references | foreign_key: true |

Association

+ belongs_to :user

## user_auth_providers

| Column               | Type       | Options     |
| -------------------- | ---------- | ----------- |
| provider_name        | string     | null: false |
| provider_id          | string     | null: false |
| user                 | references | foreign_key: true |

Association

+ belongs_to :user

## reminders

| Column                | Type       | Options     |
| --------------------- | ---------- | ----------- |
| message               | text       | null: false |
| notification_datetime | datetime   | null: false |
| repeat_type_id        | integer    | null: false |
| user                  | references | null: false, foreign_key: true |

Association

+ belongs_to :user
+ has_many   :notification_weekdays

## notification_logs

| Column                     | Type       | Options     |
| -------------------------- | ---------- | ----------- |
| notification_time          | datetime   | null: false |
| provider_name              | string     | null: false |
| provider_id                | string     | null: false |
| message                    | text       | null: false |
| reminder_id                | integer    | null: false |

Association

+ nothing
