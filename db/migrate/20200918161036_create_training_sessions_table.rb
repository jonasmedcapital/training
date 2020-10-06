class CreateTrainingSessionsTable < ActiveRecord::Migration[5.2]
  def change
    create_table "training_sessions", force: :cascade do |t|
      t.timestamps
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

    add_foreign_key "training_sessions", "training_entities", column: "course_id"
  end
end
