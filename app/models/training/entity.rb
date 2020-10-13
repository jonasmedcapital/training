class Training::Entity < ApplicationRecord
  extend FriendlyId
  friendly_id :path, use: :slugged

  self.table_name = "training_entities"

  attr_accessor :result_kind, :mapper, :repository

  # Storage
  # has_one_attached :cover
  # has_one_attached :material
  
  # Relations
  has_many :sessions, class_name: "Training::Session", foreign_key: "course_id"
  has_many :training_speakers, class_name: "Training::Speaker", foreign_key: "course_id"
  has_many :speakers, through: :course_speakers, source: "author"
  has_many :metrics, class_name: "Training::Metric", foreign_key: "course_id"
  has_many :comments, class_name: "Training::Comment", foreign_key: "course_id"
  
  # Validations
  VALID_PATH_REGEX = /\A[\w+\-]+\z/i

  validates :name, presence: { message: "Por favor, insira o Nome." }
  validates :meta_title, presence: { message: "Por favor, insira a Meta Title." }, on: [:update]
  validates :meta_description, presence: { message: "Por favor, insira a Meta Descrição." }, on: [:update]
  validates :meta_keywords, presence: { message: "Por favor, insira a Meta Keywords. " }, on: [:update]
  validates :title, presence: { message: "Por favor, insira o Título. " }
  validates :description, presence: { message: "Por favor, insira o Descrição. " }
  validates :path, presence: { message: "Por favor, insira a URL do Treinamento. " },
                   uniqueness: { case_sensitive: false, message: "A URL do Treinamento já existe na base. " },
                   format: {with: VALID_PATH_REGEX, message: "A URL do Treinamento é inválida. "}

  #Enums
  enum sharing: { public: 0,
                  client: 1,
                  intern: 2 }, _prefix: :_


  enum content: { clinic: 0,
                  booking: 1,
                  taxes: 2,
                  billing: 3,
                  insurance: 4,
                  education: 5,
                  development: 6,
                  operation: 7,
                  financial: 8}, _prefix: :_


  enum format: { paid: 0,
                 free: 1 }, _prefix: :_


  enum kind: { course: 0,
               lesson: 1,
               talk: 2,
               training: 3}, _prefix: :_

            
  #Callbacks
  after_find :set_attr_accessors

  def set_attr_accessors
    self.result_kind = "course"
    self.mapper = "Trainings::EntityMapper"
    self.repository = "Trainings::EntityRepository"
  end  

  def should_generate_new_friendly_id?
    self.path_changed?
  end


end

# create_table "training_entities", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.string "name"
# t.string "title"
# t.string "description"
# t.string "copy"
# t.string "meta_title"
# t.string "meta_description"
# t.string "meta_keywords"
# t.string "question_one"
# t.string "answer_one"
# t.string "question_two"
# t.string "answer_two"
# t.string "question_three"
# t.string "answer_three"
# t.string "material_name"
# t.string "material_description"
# t.string "path"
# t.string "slug"
# t.string "notes"
# t.integer "sharing"
# t.integer "content"
# t.integer "format"
# t.integer "duration", default: 0
# t.integer "total_lessons", default: 0
# t.integer "total_sessions", default: 0
# t.integer "total_rating", default: 0
# t.integer "total_voting", default: 0
# t.date "published_at"