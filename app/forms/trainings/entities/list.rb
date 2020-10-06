class Trainings::Entities::List
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    # @current_user_params = params.require(:current_user).permit(:current_user_id)

    # @current_user = current_user
    # @can_current_user_list_training = can_current_user_list_training?

    # return false unless @can_current_user_list_training
    
    @trainings = trainings
  end

  def trainings
    @trainings ||= ::Trainings::EntityRepository.all_active
  end
  
  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end
  
  def process?
    # return false unless @can_current_user_list_training
    true
  end

  def status
    # return :forbidden unless @can_current_user_list_training
    :ok
  end
  

  def data
    # return cln = [] unless @can_current_user_list_training
    cln = ::Trainings::EntityRepository.list @trainings
    return {:cln => cln.compact}.as_json
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_list_training
  end

  def type
    # return "danger" unless @can_current_user_list_training
  end

  # private

  # def can_current_user_list_training?
  #   ::UserPolicies.new(@current_user.id, "list", "training_entities").can_current_user?
  # end
  
end