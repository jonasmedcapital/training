class User::Account::Entity < ApplicationRecord

  include CpfValidates

  self.table_name = "account_entities"
  # default_scope -> {order(name: :asc)}

  # Relations
  belongs_to :user, class_name: "User", foreign_key: "user_id", optional: true
  has_one :account_product, class_name: "Operation::Account::Product", foreign_key: "account_id"
  has_many :products, class_name: "Operation::Product::Entity", foreign_key: "account_id"
  has_one :book_patient, class_name: "Operation::Product::Book::Patient", foreign_key: "account_id"
  has_one :tax_return_patient, class_name: "Operation::Product::TaxReturn::Patient", foreign_key: "account_id"

  # Validations
  validates :name, presence: { message: "Por favor, insira o Nome. " }
  validate :cpf_validate, on: [:login, :create, :update]
  validates :cpf, presence: {message: "CPF não pode ficar em branco. "}, uniqueness: { case_sensitive: false, message: "CPF já existe na base. "  }, on: [:create, :update]

  def self.save_account
    true
  end
  
end

# create_table "account_entities", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.string "name"
# t.string "cpf"

