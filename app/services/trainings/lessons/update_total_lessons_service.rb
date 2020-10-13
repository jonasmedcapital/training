class Trainings::Lessons::UpdateTotalLessonsService

  def self.update(lesson_id)

    lesson = Training::Lesson.find(lesson_id)
    session = lesson.session
    training = session.training

    training.total_sessions = training.sessions.where(active: true).count
    training.total_lessons = training.sessions.where(active: true).joins(:lessons).where(:training_lessons => {active: true}).count

    session.total_lessons = session.lessons.where(active: true).count

    training.duration = training.sessions.where(active: true).map{|session| session.lessons.sum(:duration)}.sum
    session.duration = session.lessons.where(active: true).sum(:duration)

    training.save
    session.save
    
  end
  

end