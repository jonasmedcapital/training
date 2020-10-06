class Trainings::SessionMapper

  def self.map model
    model_attributes = model.attributes
    model_attributes = model_attributes.merge({"lessons_list" =>  ::Trainings::SessionRepository.active_lessons(model)})
    model_attributes
  end
  

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end

end