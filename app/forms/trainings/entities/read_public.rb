class Trainings::Entities::ReadPublic
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @training_params = params.require(:training).permit(:id, :slug)
    @training = training
  end

  def training
    @training ||= ::Trainings::EntityRepository.find_by_slug(@training_params[:slug])
  end

  def persisted?
    false
  end

  def process?
    return false unless @training
    true
  end

  def status
    return false unless @training
    :ok
  end

  def data
    return cln = [] unless @training
    cln = ::Trainings::EntityRepository.read_show(@training)
    return {:cln => cln}.as_json
  end

  def message
    return message = "A ação não é permitida" unless @training
  end

  def type
    return "danger" unless @training
  end

end