class Trainings::Entities::Update
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @field_params = params.require(:training).permit(:value, :field)
    @training_params = params.require(:training).permit(:id, :active, :name, :title, :description, :copy, :meta_description, :meta_title,
                                                    :meta_keywords, :published_at, :path, :slug, :notes, :sharing, :content, :format, :kind)
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    # @current_user = current_user
    # @can_current_user_update_training = can_current_user_update_training?

    # return false unless @can_current_user_update_training
    @training = training
    
    if @field_params[:field].present? && @training.respond_to?(@field_params[:field])
      @training[@field_params[:field]] = @field_params[:value]
    else
      @training.attributes = @training_params
    end

    @valid = @training.valid?
  end

  def training
    @training ||= ::Trainings::EntityRepository.find_by_id(@training_params[:id])
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_update_training
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
    # return :forbidden unless @can_current_user_update_training
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
    # return false unless @can_current_user_update_training
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_update_training
    if @valid
      message = "Treinamento atualizado com sucesso!"
      return message
    else
      message = "Tivemos seguinte(s) problema(s):"
      i = 0
      @training.errors.messages.each do |key, value|
        i += 1
        message += " (#{i}) #{value.first}"
      end
      return message
    end
  end

  def type
    # return "danger" unless @can_current_user_update_training
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_update_training
    cln = ::Trainings::EntityRepository.read_show(@training)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def can_current_user_update_training?
  #   ::UserPolicies.new(@current_user.id, "update", "training_entities").can_current_user?
  # end


end