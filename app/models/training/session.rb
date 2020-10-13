class Training::Session < ApplicationRecord

  self.table_name = "training_sessions"

  # Storage
  
  # Relations
  belongs_to :training, class_name: "Training::Entity", foreign_key: "course_id"
  has_many :lessons, class_name: "Training::Lesson", foreign_key: "session_id"
  
  # Validations
  validates :name, presence: { message: "Por favor, insira o Nome." }

  #Enums
            
  #Callbacks

end




# create_table "training_sessions", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.bigint "course_id"
# t.string "name"
# t.string "description"
# t.integer "order"
# t.integer "duration", default: 0
# t.integer "total_lessons", default: 0