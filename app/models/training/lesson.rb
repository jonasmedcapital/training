class Training::Lesson < ApplicationRecord

  self.table_name = "training_lessons"

  attr_accessor :result_kind, :mapper, :repository

  # Storage
  # has_one_attached :video
  
  # Relations
  belongs_to :session, class_name: "Training::Session", foreign_key: "session_id"
  
  # Validations
  validates :name, presence: { message: "Por favor, insira o Nome da Aula." }
  validates :link, presence: { message: "Por favor, insira o Link da Aula." }
  validates :duration, presence: { message: "Por favor, insira o Tempo de Duração da Aula." }

  #Enums
            
  #Callbacks
  after_initialize :set_attr_accessors

  def set_attr_accessors
    self.result_kind = "course"
    self.mapper = "Trainings::LessonMapper"
    self.repository = "Trainings::LessonRepository"
  end

end


# create_table "training_lessons", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.bigint "session_id"
# t.string "name"
# t.string "description"
# t.text "transcription"
# t.string "link"
# t.integer "duration", default: 0
# t.integer "order"
# t.boolean "status", default: false