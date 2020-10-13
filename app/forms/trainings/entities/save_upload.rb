class Trainings::Entities::SaveUpload
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @training_id = params["course_id"].to_i
    @field = params["field"]
    @file = params["file"]
    @file_name = params["file_name"]
    # @current_user_id = params["user_id"]
    # @current_user = current_user
    # @can_current_user_training_upload = can_current_user_training_upload?

    # return false unless @can_current_user_training_upload

    @training = training

    if @field == "cover"
      @training.cover = @file      
    elsif @field == "material"
      @training.material = @file
    end
    
    @valid = @training.valid?
  end

  def training
    @training ||= ::Trainings::EntityRepository.find_by_id(@training_id)
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_id)
  # end

  def save
    # return false unless @can_current_user_training_upload
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
    # return :forbidden unless @can_current_user_training_upload
    if @valid
      return :created
    else
      return :bad_request
    end
  end

  def process?
    # return false unless @can_current_user_training_upload
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_training_upload
    if @valid
      message = "Arquivo salvo com sucesso!"
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
    # return "danger" unless @can_current_user_training_upload
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return [] unless @can_current_user_training_upload
    cln = ::Trainings::EntityRepository.read_show(@training)
    return {:cln => cln.compact}.as_json
  end

  
  # private

  # def can_current_user_training_upload?
  #   ::UserPolicies.new(@current_user.id, "upload", "training_entities").can_current_user?
  # end

end