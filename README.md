# アプリケーション名

WebReminder

# アプリケーション概要

リマインダーを作成して、メールやLINEに通知させることができます。

# 目指した課題解決

忘れてはいけないことを通知によって思い出させることで日々のタスクのやり忘れを防ぎます。
その通知先として、それぞれのユーザーが自分が特によく確認するものに通知させるように設定できるようにすることで、リマインダーを設定したがその通知にも気付かなかったといったことを少しでも減らすことが出来れば良いと考えました。

# データベース設計

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

# user_notification_mails

| Column               | Type       | Options     |
| -------------------- | ---------- | ----------- |
| email                | string     | null: false |
| confirmation_token   | string     | null: false |
| confirmed_at         | string     | null: false |
| confirmation_sent_at | string     | null: false |
| unconfirmed_email    | string     | null: false |
| user                 | references | foreign_key: true |

Association
+ belongs_to :user

## user_notification_providers

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
| notification_time     | datetime   | null: false |
| repeat_rule           | text       | null: false |
| user                  | references | null: false, foreign_key: true |

Association
+ belongs_to :user
+ has_many :reminder_providers

## reminder_providers

| Column                     | Type       | Options     |
| -------------------------- | ---------- | ----------- |
| reminder                   | references | null: false, foreign_key: true |
| user_notification_mail     | references | foreign_key: true |
| user_notification_provider | references | foreign_key: true |

Association
+ belongs_to :reminder

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
