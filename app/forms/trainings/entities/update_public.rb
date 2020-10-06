class Trainings::Entities::UpdatePublic
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @training_params = params.require(:training).permit(:id, :rating) 

    # permitted_id = permitted_query(@training_params[:id])
    # permitted_rating = permitted_query(@training_params[:rating])

    # @valid_query = permitted_id && permitted_rating

    # return false unless @valid_query
    
    # if [1, 2, 3, 4, 5].include?(@training_params[:rating].to_i)
    #   @training = training
    #   @training.total_rating += @training_params[:rating].to_i
    #   @training.total_voting += 1
    # end

    @valid = @training.valid?
  end

  def training
    @training ||= ::Trainings::EntityRepository.find_by_id(@training_params[:id])
  end

  def save
    # return false unless @valid_query
    ActiveRecord::Base.transaction do
      if @valid
        @training.save
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    # return false unless @valid_query
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
    # return false unless @valid_query
    true
  end

  def message
    # return message = "Não conseguimos computar a sua avaliação!" unless @valid_query
    if @valid
      message = "Avaliação computada com sucesso!"
      return message
    else
      message = "Não conseguimos computar a sua avaliação!"
      return message
    end
  end

  def type
    # return "danger" unless @valid_query
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  # private

  # def permitted_query(value)
  #   ::Contents::Searchs::PermittedQuery.check(value.to_s)
  # end


end