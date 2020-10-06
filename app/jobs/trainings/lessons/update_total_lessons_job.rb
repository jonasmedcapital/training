class Trainings::Lessons::UpdateTotalLessonsJob < ApplicationJob

  queue_as :default

  def perform(lesson_id)

    ::Trainings::Lessons::UpdateTotalLessonsService.update(lesson_id)
    
  end

end