class Trainings::Metrics::SavePublic
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    @metric_params = params.require(:metric).permit(:id, :progress, :rating)

    # permitted_id = permitted_query(@metric_params[:id])
    # permitted_progress = permitted_query(@metric_params[:progress])
    # permitted_rating = permitted_query(@metric_params[:rating])


    # @valid_query = permitted_id && permitted_progress && permitted_rating

    # return false unless @valid_query
    @metric = metric

    # if @metric_params[:rating]
    #   @metric.rating = @metric_params[:rating]
    # end

    # if @metric_params[:progress]
    #   session = @metric_params[:progress].split("-")[0]
    #   lesson = @metric_params[:progress].split("-")[1]
    #   duration = @metric_params[:progress].split("-")[2]
    #   status = ActiveModel::Type::Boolean.new.cast(@metric_params[:progress].split("-")[3])

    #   if status
    #     @metric.lessons_progress += 1
    #     @metric.duration_progress += duration.to_i
    #     @metric.progress += ["#{session}-#{lesson}-#{duration}"]
    #   else
    #     @metric.lessons_progress -= 1
    #     @metric.duration_progress -= duration.to_i
    #     @metric.progress -= ["#{session}-#{lesson}-#{duration}"]
    #   end
      
    # end
    
    @valid = @metric.valid?
  end

  def metric
    @metric ||= ::Trainings::MetricRepository.find_by_id(@metric_params[:id])
  end  

  def save
    # return false unless @valid_query
    ActiveRecord::Base.transaction do
      if @valid
        @metric.save
        true
      else
        false
        raise ActiveRecord::Rollback
      end
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