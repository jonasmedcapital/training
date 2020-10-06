class Trainings::SessionRepository < Base

  def self.build(attrs)
    entity.new(
      course_id: attrs["course_id"],
      name: attrs["name"],
      description: attrs["description"],
      order: attrs["order"],
    )
  end

  def self.find_by_id(id)
    entity.find_by(id: id)
  end

  def self.all_active
    entity.where(active: true)
  end
    
  def self.read(session)
    mapper.map(session)
  end

  def self.list(sessions)
    mapper.map_collection(sessions)
  end

  def self.active_lessons(session)
    lessons = []
    session.lessons.where(active: true).each do |lesson|
      lessons << ::Trainings::LessonRepository.read(lesson)
    end

    return lessons
  end
  


  private

  def self.entity
    "Training::Session".constantize
  end

  def self.mapper
    "Trainings::SessionMapper".constantize
  end

end