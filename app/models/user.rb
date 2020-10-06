class User < ApplicationRecord
  include CpfValidates
  extend FriendlyId
  friendly_id :cpf, use: :slugged
  devise :database_authenticatable, :registerable, :confirmable, :timeoutable,
         :recoverable, :rememberable, :validatable, :trackable, :lockable, authentication_keys: [ :cpf ]


  # Validations
  validate :cpf_validate, on: [:login, :create, :update]
  validates :cpf, presence: {message: "CPF não pode ficar em branco. "}, uniqueness: { case_sensitive: false, message: "CPF já existe na base. "  }, on: [:create, :update]
  validates :email, presence: {message: "E-mail não pode ficar em branco. "}, uniqueness: { case_sensitive: false, message: "E-mail já existe na base. "  }, on: [:create, :update]

  # Relation
  has_one :account, class_name: "Account::Entity", foreign_key: "user_id"

  def should_generate_new_friendly_id?
    self.cpf_changed?
  end

  def normalize_friendly_id(value)
    value.to_s.parameterize(preserve_case: true)
  end
end
