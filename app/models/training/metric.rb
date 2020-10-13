class Training::Metric < ApplicationRecord

  self.table_name = "training_metrics"

  # Storage
  
  # Relations
  belongs_to :training, class_name: "Training::Entity", foreign_key: "course_id"
  belongs_to :visitor, class_name: "Ahoy::Visitor", foreign_key: "visitor_id", optional: true
  belongs_to :user, class_name: "User", foreign_key: "user_id", optional: true
  
  # Validations

  #Enums
            
  #Callbacks

end

# create_table "training_metrics", force: :cascade do |t|
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.boolean "active", default: true, null: false
# t.bigint "course_id"
# t.bigint "user_id"
# t.bigint "visitor_id"
# t.string "rating"
# t.string "progress", array: true
# t.integer "lessons_progress", default: 0
# t.integer "duration_progress", default: 0