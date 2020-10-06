class Trainings::Lessons::UpdateTotalLessonsService

  def self.update(lesson_id)

    lesson = Training::Lesson.find(lesson_id)
    session = lesson.session
    course = session.course

    course.total_sessions = course.sessions.where(active: true).count
    course.total_lessons = course.sessions.where(active: true).joins(:lessons).where(:training_lessons => {active: true}).count

    session.total_lessons = session.lessons.where(active: true).count

    course.duration = course.sessions.where(active: true).map{|session| session.lessons.sum(:duration)}.sum
    session.duration = session.lessons.where(active: true).sum(:duration)

    course.save
    session.save
    
  end
  

end