class CreateTrainingLessonsTable < ActiveRecord::Migration[5.2]
  def change
    create_table "training_lessons", force: :cascade do |t|
      t.timestamps
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

    add_foreign_key "training_lessons", "training_sessions", column: "session_id"
  end
end
