class Trainings::Comments::Update
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @comment_params = params.require(:comment).permit(:id, :active, :reply, :reply_name, :reply_body) 
    # @current_user_params = params.require(:current_user).permit(:current_user_id)
    
    # @current_user = current_user
    # @can_current_user_update_comment = can_current_user_update_comment?

    # return false unless @can_current_user_update_comment
    @comment = comment

    if @comment_params[:reply]
      @comment.reply = true
      @comment.reply_name = @comment_params[:reply_name]
      @comment.reply_body = @comment_params[:reply_body]
      @comment.reply_date = Time.current
    elsif @comment_params[:reply] == false
      @comment.reply = false
      @comment.reply_name = nil
      @comment.reply_body = nil
      @comment.reply_date = nil
    end

    if @comment_params[:active] == false
      @comment.active = false
    end
    

    @valid = @comment.valid?
  end

  def comment
    @comment ||= ::Trainings::CommentRepository.find_by_id(@comment_params[:id])
  end

  # def current_user
  #   @current_user ||= ::Users::UserRepository.new.find_by_id(@current_user_params[:current_user_id])
  # end

  def save
    # return false unless @can_current_user_update_comment
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
    # return :forbidden unless @can_current_user_update_comment
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
    # return false unless @can_current_user_update_comment
    true
  end

  def message
    # return message = "A ação não é permitida" unless @can_current_user_update_comment
    if @valid
      message = "Comentário respondido com sucesso!"
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
    # return "danger" unless @can_current_user_update_comment
    if @valid
      return "success"
    else
      return "danger"
    end
  end

  def data
    # return cln = [] unless @can_current_user_update_comment
    cln = ::Trainings::CommentRepository.read(@comment)
    return {:cln => cln.compact}.as_json
  end

  def notification
    # return false unless @can_current_user_update_comment
    if @comment.reply && @comment.active
      # ::Trainings::Comments::SendReplyEmailJob.perform_later(@comment)
    end
  end

  # private

  # def can_current_user_update_comment?
  #   ::UserPolicies.new(@current_user.id, "update", "course_comments").can_current_user?
  # end


end