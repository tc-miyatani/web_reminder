# アプリケーション名

CloudReminder

# アプリケーション概要

リマインダーを作成して、メールやLINEに通知させることができます。

# URL

[https://web-reminder.jp/](https://web-reminder.jp/)

# 利用方法

1. トップページの新規登録からアカウント登録に進んでください。
1. メールに通知を贈りたい場合はメールアドレスで登録を、LINEに通知を贈りたい場合はLINEアカウントで登録をしてください。
  * メールアドレスで登録する場合は、入力したメールアドレスに送られるメールに記載されている認証用URLから本登録に進んでください。
  * LINEアカウントで登録する場合は、公式アカウントと友達登録をお願いします(友達登録しないと通知が送られません)。
1. リマインダー作成からリマインダーを登録してください。
  * 登録が完了したらWEBアプリは閉じていただいて大丈夫です。設定した日時になれば、通知が送られます。
1. リマインダーの編集・削除はマイページから可能です。

# 目指した課題解決

忘れてはいけないことを通知によって思い出させることで日々のタスクのやり忘れを防ぎます。
その通知先として、それぞれのユーザーが自分が特によく確認するものに通知させるように設定できるようにすることで、リマインダーを設定したがその通知にも気付かなかったといったことを少しでも減らすことが出来れば良いと考えました。

# データベース設計

![ER図](erd.png)

## usersテーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| nickname           | string | null: false |

Association

+ has_one :user_auth_mail
+ has_one :user_auth_provider
+ has_many :user_notification_mails
+ has_many :user_notification_providers
+ has_many :reminders

## user_auth_mails

| Column               | Type       | Options     |
| -------------------- | ---------- | ----------- |
| email                | string     | null: false |
| encrypted_password   | string     | null: false |
| confirmation_token   | string     | null: false |
| confirmed_at         | string     | null: false |
| confirmation_sent_at | string     | null: false |
| unconfirmed_email    | string     | null: false |
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
