class Trainings::Entities::Read
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @training_params = params.require(:training).permit(:id, :slug)
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    
    # @current_user = current_user
    # @can_current_user_read_training = can_current_user_read_training?
    
    # return false unless @can_current_user_read_training

    @training = training
  end

  def training
    if @training_params[:id].present?      
      @training ||= ::Trainings::EntityRepository.find_by_id(@training_params[:id])
    elsif @training_params[:slug].present?
      @training ||= ::Trainings::EntityRepository.find_by_slug(@training_params[:slug])
    end
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end
  
  def persisted?
    false
  end

  def process?
    # return false unless @can_current_user_read_training
    true
  end

  def status
    # return :forbidden unless @can_current_user_read_training
    :ok
  end

  def data
    # return cln = [] unless @can_current_user_read_training
    cln = ::Trainings::EntityRepository.read_show(@training)
    return {:cln => cln}.as_json
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_read_training
  end

  def type
    # return "danger" unless @can_current_user_read_training
  end

  # private

  # def can_current_user_read_training?
  #   ::UserPolicies.new(@current_user.id, "read", "training_entities").can_current_user?
  # end

end