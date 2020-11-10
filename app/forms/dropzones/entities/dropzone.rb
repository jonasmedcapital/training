class Dropzones::Entities::Dropzone
  attr_accessor :status, :type, :message

  def initialize(params)
    # @dropzone_params.first.permit(@dropzone_params.first.keys).to_h
    @dropzone_params = params.require(:dropzone)
    # @dropzone = dropzone
  end

  def dropzone
    @dropzone ||= ::Dropzones::EntityRepository.build(@dropzone_params)
  end

  def save
    # ActiveRecord::Base.transaction do
      # if @dropzone.save
    true
      # else
      #   false
      #   raise ActiveRecord::Rollback
      # end
    # end
  end
  
  def status
    # if @valid
    return :created
    # else
    #   return :bad_request
    # end
  end

  def persisted?
    false
  end

  def process?
    true
  end

  def message
    # if @valid
    message = "dropzone realizado com sucesso!"
    #   return message
    # else
      # message = "Tivemos seguinte(s) problema(s):"
      # i = 0
      # @dropzone.errors.messages.each do |key, value|
      #   i += 1
      #   message += " (#{i}) #{value.first}"
      # end
    return message
    # end
  end

  def type
    # if @valid
    return "success"
    # else
    #   return "danger"
    # end
  end

  def data
    @dropzone_params
    # return cln = [] unless @can_current_user_create_dropzone
    # cln = ::Dropzones::EntityRepository.read(@dropzone)
    # return {:cln => cln.compact}.as_json
  end

end