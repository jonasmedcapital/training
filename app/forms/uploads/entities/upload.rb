class Uploads::Entities::Upload
  attr_accessor :status, :type, :message

  def initialize(params)
    # @upload_params.first.permit(@upload_params.first.keys).to_h
    @upload_params = params.require(:upload)
    # @upload = upload
  end

  def upload
    @upload ||= ::Uploads::EntityRepository.build(@upload_params)
  end

  def save
    # ActiveRecord::Base.transaction do
      # if @upload.save
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
    message = "Upload realizado com sucesso!"
    #   return message
    # else
      # message = "Tivemos seguinte(s) problema(s):"
      # i = 0
      # @upload.errors.messages.each do |key, value|
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
    @upload_params
    # return cln = [] unless @can_current_user_create_upload
    # cln = ::Uploads::EntityRepository.read(@upload)
    # return {:cln => cln.compact}.as_json
  end

end