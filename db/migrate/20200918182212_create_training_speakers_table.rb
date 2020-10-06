class CreateTrainingSpeakersTable < ActiveRecord::Migration[5.2]
  def change
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

    add_foreign_key "training_speakers", "training_entities", column: "course_id"
  end
end
