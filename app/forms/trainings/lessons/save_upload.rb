class Trainings::Lessons::SaveUpload
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @lesson_id = params["lesson_id"].to_i
    @field = params["field"]
    @file = params["file"]
    @file_name = params["file_name"]
    # @current_user_id = params["user_id"]
    # @current_user = current_user
    # @can_current_user_lesson_upload = can_current_user_lesson_upload?

    # return false unless @can_current_user_lesson_upload

    @lesson = lesson

    if @field == "video"
      @lesson.video = @file
      puts "VIDEO UPLOAD"
    end
    
    @valid = @lesson.valid?
  end

  def lesson
    @lesson ||= ::Trainings::LessonRepository.find_by_id(@lesson_id)
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_id)
  # end

  def save
    # return false unless @can_current_user_lesson_upload
    ActiveRecord::Base.transaction do
      if @valid
        @lesson.save
        puts "LESSON SAVED"
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    # return :forbidden unless @can_current_user_lesson_upload
    if @valid
      return :created
    else
      return :bad_request
    end
  end

  def process?
    # return false unless @can_current_user_lesson_upload
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_lesson_upload
    if @valid
      message = "Arquivo salvo com sucesso!"
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
    # return "danger" unless @can_current_user_lesson_upload
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return [] unless @can_current_user_lesson_upload
    cln = ::Trainings::LessonRepository.read(@lesson)
    return {:cln => cln.compact}.as_json
  end

  
  # private

  # def can_current_user_lesson_upload?
  #   ::UserPolicies.new(@current_user.id, "upload", "course_lessons").can_current_user?
  # end

end