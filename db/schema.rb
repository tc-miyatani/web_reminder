# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_02_050801) do

  create_table "notification_logs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "notification_time", null: false
    t.text "message", null: false
    t.string "provider_name", null: false
    t.string "provider_id", null: false
    t.integer "reminder_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notification_time"], name: "index_notification_logs_on_notification_time"
    t.index ["provider_id", "provider_name", "notification_time", "reminder_id"], name: "idx_notification_logs_provider_id_name_time", unique: true
  end

  create_table "notification_weekdays", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "weekday_id", null: false
    t.bigint "reminder_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["reminder_id"], name: "index_notification_weekdays_on_reminder_id"
    t.index ["weekday_id", "reminder_id"], name: "index_notification_weekdays_on_weekday_id_and_reminder_id", unique: true
  end

  create_table "reminders", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "message", null: false
    t.datetime "notification_datetime", null: false
    t.integer "repeat_type_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_reminders_on_user_id"
  end

  create_table "user_auth_mails", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_user_auth_mails_on_confirmation_token", unique: true
    t.index ["email"], name: "index_user_auth_mails_on_email", unique: true
    t.index ["reset_password_token"], name: "index_user_auth_mails_on_reset_password_token", unique: true
    t.index ["user_id"], name: "index_user_auth_mails_on_user_id"
  end

  create_table "user_auth_providers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "provider_name", null: false
    t.string "provider_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["provider_id", "provider_name"], name: "index_user_auth_providers_on_provider_id_and_provider_name", unique: true
    t.index ["user_id"], name: "index_user_auth_providers_on_user_id"
  end

  create_table "user_mails", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_user_mails_on_confirmation_token", unique: true
    t.index ["email", "user_id"], name: "index_user_mails_on_email_and_user_id", unique: true
    t.index ["user_id"], name: "index_user_mails_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "nickname", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "auth_type", default: 0, null: false
  end

  add_foreign_key "notification_weekdays", "reminders"
  add_foreign_key "reminders", "users"
  add_foreign_key "user_auth_mails", "users"
  add_foreign_key "user_auth_providers", "users"
  add_foreign_key "user_mails", "users"
end
