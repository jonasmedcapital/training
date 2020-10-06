class Trainings::Lessons::Create
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @lesson_params = params.require(:lesson).permit(:active, :session_id, :name, :description, :order, :link) 
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    # @current_user = current_user
    # @can_current_user_create_lesson = can_current_user_create_lesson?

    # return false unless @can_current_user_create_lesson
    @lesson = lesson

    @valid = @lesson.valid?
  end

  def lesson
    @lesson ||= ::Trainings::LessonRepository.build(@lesson_params)
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_create_lesson
    ActiveRecord::Base.transaction do
      if @valid
        @lesson.save
        ::Trainings::Lessons::UpdateTotalLessonsJob.perform_later(@lesson.id)
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    # return :forbidden unless @can_current_user_create_lesson
    if @valid
      return :created
    else
      return :bad_request
    end
  end

  def persisted?
    false
  end

  def process?
    # return false unless @can_current_user_create_lesson
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_create_lesson
    if @valid
      message = "Sessão de Curso criada com sucesso!"
      return message
    else
      message = "Tivemos seguinte(s) problema(s):"
      i = 0
      @lesson.errors.messages.each do |key, value|
        i += 1
        message += " (#{i}) #{value.first}"
      end
      return message
    end
  end

  def type
    # return "danger" unless @can_current_user_create_lesson
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_create_lesson
    cln = ::Trainings::LessonRepository.read(@lesson)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def can_current_user_create_lesson?
  #   ::UserPolicies.new(@current_user.id, "create", "course_lessons").can_current_user?
  # end


end