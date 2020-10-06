class CreateTrainingEntityTable < ActiveRecord::Migration[5.2]
  def change
    create_table "training_entities", force: :cascade do |t|
      t.timestamps
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
  end
end
