class Trainings::Speakers::Create
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @speaker_params = params.require(:speaker).permit(:active, :course_id, :speaker_id) 
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    # @current_user = current_user
    # @can_current_user_create_speaker = can_current_user_create_speaker?

    # return false unless @can_current_user_create_speaker
    @speaker = speaker

    @valid = @speaker.valid?
  end

  def speaker
    @speaker ||= ::Trainings::SpeakerRepository.build(@speaker_params)
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_create_speaker
    ActiveRecord::Base.transaction do
      if @valid
        @speaker.save
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    # return :forbidden unless @can_current_user_create_speaker
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
    # return false unless @can_current_user_create_speaker
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_create_speaker
    if @valid
      message = "Speaker adicionado com sucesso!"
      return message
    else
      message = "Tivemos seguinte(s) problema(s):"
      i = 0
      @speaker.errors.messages.each do |key, value|
        i += 1
        message += " (#{i}) #{value.first}"
      end
      return message
    end
  end

  def type
    # return "danger" unless @can_current_user_create_speaker
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_create_speaker
    cln = ::Trainings::SpeakerRepository.read(@speaker)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def can_current_user_create_speaker?
  #   ::UserPolicies.new(@current_user.id, "create", "course_speakers").can_current_user?
  # end


end