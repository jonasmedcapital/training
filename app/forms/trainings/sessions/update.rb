class Trainings::Sessions::Update
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @field_params = params.require(:session).permit(:value, :field)
    @session_params = params.require(:session).permit(:active, :id, :name, :description, :order) 
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    # @current_user = current_user
    # @can_current_user_update_session = can_current_user_update_session?

    # return false unless @can_current_user_update_session
    @session = session

    if @field_params[:field].present? && @session.respond_to?(@field_params[:field])
      @session[@field_params[:field]] = @field_params[:value]
    else
      @session.attributes = @session_params
    end

    @valid = @session.valid?
  end

  def session
    @session ||= ::Trainings::SessionRepository.find_by_id(@session_params[:id])
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_update_session
    ActiveRecord::Base.transaction do
      if @valid
        @session.save
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    # return :forbidden unless @can_current_user_update_session
    if @valid
      return :ok
    else
      return :bad_request
    end
  end

  def persisted?
    false
  end

  def process?
    # return false unless @can_current_user_update_session
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_update_session
    if @valid
      message = "Sessão de Treinamento atualizada com sucesso!"
      return message
    else
      message = "Tivemos seguinte(s) problema(s):"
      i = 0
      @session.errors.messages.each do |key, value|
        i += 1
        message += " (#{i}) #{value.first}"
      end
      return message
    end
  end

  def type
    # return "danger" unless @can_current_user_update_session
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_update_session
    cln = ::Trainings::SessionRepository.read(@session)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def can_current_user_update_session?
  #   ::UserPolicies.new(@current_user.id, "update", "course_sessions").can_current_user?
  # end


end