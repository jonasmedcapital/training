# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_26_131948) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "ahoy_events", force: :cascade do |t|
    t.bigint "visit_id"
    t.bigint "user_id"
    t.string "name"
    t.jsonb "properties"
    t.datetime "time"
    t.index ["name", "time"], name: "index_ahoy_events_on_name_and_time"
    t.index ["properties"], name: "index_ahoy_events_on_properties", opclass: :jsonb_path_ops, using: :gin
    t.index ["user_id"], name: "index_ahoy_events_on_user_id"
    t.index ["visit_id"], name: "index_ahoy_events_on_visit_id"
  end

  create_table "ahoy_visits", force: :cascade do |t|
    t.string "visit_token"
    t.string "visitor_token"
    t.bigint "user_id"
    t.string "ip"
    t.text "user_agent"
    t.text "referrer"
    t.string "referring_domain"
    t.text "landing_page"
    t.string "browser"
    t.string "os"
    t.string "device_type"
    t.string "country"
    t.string "region"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.string "utm_source"
    t.string "utm_medium"
    t.string "utm_term"
    t.string "utm_content"
    t.string "utm_campaign"
    t.string "app_version"
    t.string "os_version"
    t.string "platform"
    t.datetime "started_at"
    t.index ["user_id"], name: "index_ahoy_visits_on_user_id"
    t.index ["visit_token"], name: "index_ahoy_visits_on_visit_token", unique: true
  end

  create_table "author_entities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.string "name"
    t.text "bio"
    t.string "facebook"
    t.string "linkedin"
    t.string "email"
    t.string "title"
    t.index ["active"], name: "index_author_entities_on_active"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "training_comments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.bigint "course_id"
    t.string "name"
    t.string "email"
    t.text "body"
    t.datetime "date"
    t.boolean "reply", default: false
    t.string "reply_name"
    t.text "reply_body"
    t.datetime "reply_date"
    t.index ["course_id"], name: "index_training_comments_on_course_id"
    t.index ["date"], name: "index_training_comments_on_date"
    t.index ["email"], name: "index_training_comments_on_email"
    t.index ["name"], name: "index_training_comments_on_name"
    t.index ["reply"], name: "index_training_comments_on_reply"
    t.index ["reply_date"], name: "index_training_comments_on_reply_date"
    t.index ["reply_name"], name: "index_training_comments_on_reply_name"
  end

  create_table "training_entities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.string "name"
    t.string "title"
    t.string "description"
    t.string "copy"
    t.string "meta_title"
    t.string "meta_description"
    t.string "meta_keywords"
    t.string "path"
    t.string "slug"
    t.string "notes"
    t.string "question_one"
    t.string "answer_one"
    t.string "question_two"
    t.string "answer_two"
    t.string "question_three"
    t.string "answer_three"
    t.string "material_name"
    t.string "material_description"
    t.integer "sharing"
    t.integer "content"
    t.integer "format"
    t.integer "kind"
    t.integer "duration", default: 0
    t.integer "total_lessons", default: 0
    t.integer "total_sessions", default: 0
    t.integer "total_rating", default: 0
    t.integer "total_voting", default: 0
    t.date "published_at"
    t.index ["content"], name: "index_training_entities_on_content"
    t.index ["format"], name: "index_training_entities_on_format"
    t.index ["kind"], name: "index_training_entities_on_kind"
    t.index ["name"], name: "index_training_entities_on_name"
    t.index ["path"], name: "index_training_entities_on_path"
    t.index ["published_at"], name: "index_training_entities_on_published_at"
    t.index ["sharing"], name: "index_training_entities_on_sharing"
    t.index ["slug"], name: "index_training_entities_on_slug", unique: true
  end

  create_table "training_lessons", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.bigint "session_id"
    t.string "name"
    t.string "description"
    t.text "transcription"
    t.string "link"
    t.integer "duration", default: 0
    t.integer "order"
    t.boolean "status", default: false
    t.date "published_at"
    t.index ["duration"], name: "index_training_lessons_on_duration"
    t.index ["order"], name: "index_training_lessons_on_order"
    t.index ["session_id"], name: "index_training_lessons_on_session_id"
    t.index ["status"], name: "index_training_lessons_on_status"
  end

  create_table "training_metrics", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.bigint "course_id"
    t.bigint "user_id"
    t.bigint "visitor_id"
    t.string "rating"
    t.string "progress", default: [], array: true
    t.integer "lessons_progress", default: 0
    t.integer "duration_progress", default: 0
    t.index ["course_id"], name: "index_training_metrics_on_course_id"
    t.index ["rating"], name: "index_training_metrics_on_rating"
    t.index ["user_id"], name: "index_training_metrics_on_user_id"
    t.index ["visitor_id"], name: "index_training_metrics_on_visitor_id"
  end

  create_table "training_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.bigint "course_id"
    t.string "name"
    t.string "description"
    t.integer "order"
    t.integer "duration", default: 0
    t.integer "total_lessons", default: 0
    t.index ["course_id"], name: "index_training_sessions_on_course_id"
    t.index ["name"], name: "index_training_sessions_on_name"
    t.index ["order"], name: "index_training_sessions_on_order"
  end

  create_table "training_speakers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.bigint "course_id"
    t.bigint "speaker_id"
    t.text "role"
    t.index ["course_id"], name: "index_training_speakers_on_course_id"
    t.index ["speaker_id"], name: "index_training_speakers_on_speaker_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "cpf", default: "", null: false
    t.boolean "active", default: true, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["cpf"], name: "index_users_on_cpf", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "posts", "users"
  add_foreign_key "training_comments", "training_entities", column: "course_id"
  add_foreign_key "training_lessons", "training_sessions", column: "session_id"
  add_foreign_key "training_metrics", "training_entities", column: "course_id"
  add_foreign_key "training_sessions", "training_entities", column: "course_id"
  add_foreign_key "training_speakers", "author_entities", column: "speaker_id"
  add_foreign_key "training_speakers", "training_entities", column: "course_id"
end
