class Trainings::Metrics::ReadPublic
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @metric_params = params.require(:metric).permit(:id, :course_id, :user_id)

    # permitted_id = permitted_query(@metric_params[:id])
    # permitted_course_id = permitted_query(@metric_params[:course_id])
    # permitted_user_id = permitted_query(@metric_params[:user_id])

    # @valid_query = permitted_id && permitted_course_id && permitted_user_id

    # return false unless @valid_query
    @user = user
    @metric = metric
    # @valid = @metric.valid?
  end

  def metric
    @metric ||= ::Trainings::MetricRepository.find_or_initialize(@metric_params, @user)
  end

  def training
    @training ||= ::Trainings::EntityRepository.find_by_id(@metric_params[:course_id])
  end

  def user
    @user ||= ::Users::UserRepository.find_by_id(@metric_params[:user_id])
  end
  
  def save
    # return false unless @valid_query
    ActiveRecord::Base.transaction do
      # if @valid
        @metric.save!
        true
      # else
      #   false
      #   raise ActiveRecord::Rollback
      # end
    end
  end
  
  def status
    # return :forbidden unless @valid_query
  end

  def persisted?
    false
  end

  def process?
    # return false unless @valid_query
    true
  end

  def message
    # return message = "A ação não é permitida" unless @valid_query
  end

  def type
    # return "danger" unless @valid_query
  end

  def data
    # return cln = [] unless @valid_query
    cln = ::Trainings::MetricRepository.read(@metric)
    return {:cln => cln.compact}.as_json
  end

  def listener
  end

  # private

  # def permitted_query(value)
  #   ::Contents::Searchs::PermittedQuery.check(value.to_s)
  # end



end