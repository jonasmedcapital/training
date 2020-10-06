class Training::Comment < ApplicationRecord

  self.table_name = "training_comments"

  # Storage
  
  # Relations
  belongs_to :course, class_name: "Training::Entity", foreign_key: "course_id"
  
  # Validations

  #Enums
            
  #Callbacks

end


# create_table "training_comments", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.bigint "course_id"
# t.string "name"
# t.string "email"
# t.text "body"
# t.datetime "date"
# t.boolean "reply", default: false
# t.string "reply_name"
# t.text "reply_body"
# t.datetime "reply_date"