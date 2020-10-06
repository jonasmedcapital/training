class CreateTrainingMetricsTable < ActiveRecord::Migration[5.2]
  def change
    create_table "training_metrics", force: :cascade do |t|
      t.timestamps
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

    add_foreign_key "training_metrics", "training_entities", column: "course_id"
  end
end
