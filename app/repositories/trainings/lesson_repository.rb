class Trainings::LessonRepository < Base

  def self.build(attrs)
    entity.new(
      session_id: attrs["session_id"],
      name: attrs["name"],
      description: attrs["description"],
      transcription: "Maiores nostrum aut et eveniet voluptatem autem neque sint aut a in quia vero dolores.",
      order: attrs["order"],
      link: attrs["link"],
    )
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

  def self.read_search(lesson_id)
    lesson = find_by_id(lesson_id)
    mapper.map_search(lesson)
  end
  
  def self.list(lessons)
    mapper.map_collection(lessons)
  end

  def self.active_lessons(session)
    lessons = []
    session.lessons.where(active: true).each do |lesson|
      lessons << ::Trainings::LessonRepository.read(lesson)
    end
  end

  private

  def self.entity
    "Training::Lesson".constantize
  end

  def self.mapper
    "Trainings::LessonMapper".constantize
  end

end