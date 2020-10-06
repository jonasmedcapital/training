class CreateTrainingCommentsTable < ActiveRecord::Migration[5.2]
  def change
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

    add_foreign_key "training_comments", "training_entities", column: "course_id"
  end
end
