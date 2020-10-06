class Trainings::Comments::Create
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @comment_params = params.require(:comment).permit(:active, :course_id, :name, :email, :body)
    @comment = comment

    @valid = @comment.valid?
  end

  def comment
    @comment ||= ::Trainings::CommentRepository.build(@comment_params)
  end

  def save
    return false unless @valid
    ActiveRecord::Base.transaction do
      if @valid
        @comment.save
        true
      else
        false
        raise ActiveRecord::Rollback
      end
    end
  end
  
  def status
    return :forbidden unless @valid
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
    return false unless @valid
    true
  end

  def message
    return message = "A ação não é permitida" unless @valid
    if @valid
      message = "Obrigado por comentar!"
      return message
    else
      message = "Tivemos seguinte(s) problema(s):"
      i = 0
      @comment.errors.messages.each do |key, value|
        i += 1
        message += " (#{i}) #{value.first}"
      end
      return message
    end
  end

  def type
    return "danger" unless @valid
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    return cln = [] unless @valid
    cln = ::Trainings::CommentRepository.read(@comment)
    return {:cln => cln.compact}.as_json
  end

  def notification
    return false unless @valid
    # ::Trainings::Comments::SendCreateEmailJob.perform_later(@comment)
  end

end