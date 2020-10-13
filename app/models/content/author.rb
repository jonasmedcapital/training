class Content::Author < ApplicationRecord

  self.table_name = "author_entities"

  # Storage
  has_one_attached :avatar

  # Relations
  has_many :posts, class_name: "Content::Post::Entity", foreign_key: "author_id"
  has_many :training_speakers, class_name: "Training::Speaker", foreign_key: "speaker_id"
  # has_many :courses, through: :course_speakers, source: "task"
  has_many :trainings, through: :training_speakers

  # validations
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: { message: "Por favor, insira o Nome. " }
  validates :bio, presence: { message: "Por favor, insira a Bio. " }
  validates :linkedin, presence: { message: "Por favor, insira o perfil do LinkedIn. " }
  validates :email, presence: { message: "Por favor, insira o E-mail. " },
                    length: {maximum: 255, message: "Tamanho de e-mail inválido. " },
                    format: {with: VALID_EMAIL_REGEX, message: "E-mail inválido. " }
end