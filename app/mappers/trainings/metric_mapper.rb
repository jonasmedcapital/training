class Trainings::MetricMapper

  def self.map model
    student = model.visitor ? model.visitor : model.user

    model_attributes = model.attributes
    model_attributes = model_attributes.merge({"student_name" =>  student.name}) if student
    model_attributes = model_attributes.merge({"student_email" =>  student.email}) if student
    model_attributes
  end
  

  def self.map_collection model_collection
    collection = model_collection.map{ |model| map(model) }
    return {:collection => collection}
  end

end