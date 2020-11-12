class Dropzone::Entity < ApplicationRecord

  # self.table_name = "training_entities"
  
  # Relations
  has_one_attached :file 
  
  # Validations

  #Enums
            
  #Callbacks

end