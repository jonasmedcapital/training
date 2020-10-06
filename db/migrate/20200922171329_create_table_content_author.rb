class CreateTableContentAuthor < ActiveRecord::Migration[5.2]
  def change
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

    add_foreign_key "training_speakers", "author_entities", column: "speaker_id"
  end
end
