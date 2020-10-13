class Trainings::MetricRepository < Base

  def self.find_or_initialize(attrs, user)
    
    if attrs["user_id"]
      obj = entity.where(active: true, user_id: attrs["user_id"], course_id: attrs["course_id"]).first
    end

    if obj
      return obj
    else
      if attrs["user_id"]
        new_obj = entity.new( course_id: attrs["course_id"], user_id: attrs["user_id"] )
      end
      
      return new_obj
    end
    
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.all_active
    entity.where(active: true)
  end
    
  def self.read(lesson)
    mapper.map(lesson)
  end

  def self.list(lessons)
    mapper.map_collection(lessons)
  end

  private

  def self.entity
    "Training::Metric".constantize
  end

  def self.mapper
    "Trainings::MetricMapper".constantize
  end

end