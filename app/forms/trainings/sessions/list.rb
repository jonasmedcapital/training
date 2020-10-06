class Trainings::Sessions::List
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    # @current_user_params = params.require(:current_user).permit(:current_user_id)

    # @current_user = current_user
    # @can_current_user_list_session = can_current_user_list_session?

    # return false unless @can_current_user_list_session
    
    @sessions = sessions
  end

  def sessions
    @sessions ||= ::Trainings::SessionRepository.all_active
  end
  
  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end
  
  def process?
    # return false unless @can_current_user_list_session
    true
  end

  def status
    # return :forbidden unless @can_current_user_list_session
    :ok
  end
  

  def data
    # return cln = [] unless @can_current_user_list_session
    cln = ::Trainings::SessionRepository.list @sessions
    return {:cln => cln.compact}.as_json
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_list_session
  end

  def type
    # return "danger" unless @can_current_user_list_session
  end

  # private

  # def can_current_user_list_session?
  #   ::UserPolicies.new(@current_user.id, "list", "course_sessions").can_current_user?
  # end
  
end