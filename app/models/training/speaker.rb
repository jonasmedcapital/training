class Training::Speaker < ApplicationRecord

  self.table_name = "training_speakers"

  # Storage
  
  # Relations
  belongs_to :training, class_name: "Training::Entity", foreign_key: "course_id"
  belongs_to :author, class_name: "Content::Author", foreign_key: "speaker_id"
  
  # Validations
   validates :course_id, uniqueness: { scope: :speaker_id, message: "Esse tutor já foi adicionado" }

  #Enums
            
  #Callbacks

end


# create_table "training_speakers", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.bigint "course_id"
# t.bigint "speaker_id"
# t.text "role"