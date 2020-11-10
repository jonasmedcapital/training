class Dropzone::Entity < ApplicationRecord

  # self.table_name = "training_entities"
  
  # Relations
  has_one_attached :feature_image 
  
  # Validations

  #Enums
            
  #Callbacks

end