class Trainings::Entities::Create
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @training_params = params.require(:training).permit(:active, :name, :title, :description, :meta_title, :meta_description,
                                                    :copy, :meta_keywords, :path, :slug, :notes, :sharing, :content, :format,
                                                    :published_at, :kind) 
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    # @current_user = current_user
    # @can_current_user_create_training = can_current_user_create_training?

    # return false unless @can_current_user_create_training
    @training = training

    @valid = @training.valid?
  end

  def training
    @training ||= ::Trainings::EntityRepository.build(@training_params)
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_create_training
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
    # return :forbidden unless @can_current_user_create_training
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
    # return false unless @can_current_user_create_training
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_create_training
    if @valid
      message = "Treinamento criado com sucesso!"
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
    # return "danger" unless @can_current_user_create_training
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_create_training
    cln = ::Trainings::EntityRepository.read(@training)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def can_current_user_create_training?
  #   ::UserPolicies.new(@current_user.id, "create", "training_entities").can_current_user?
  # end


end