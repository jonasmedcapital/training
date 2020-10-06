class Trainings::Entities::ValidateField
  include ActiveModel::Model

  attr_accessor :status, :type, :message

  def initialize(params)
    validations_params = params.require(:validations).permit(:obj_column, :obj_value, :filter_column, :filter_value, :association_column, :association_value)

    @filter_value = validations_params[:filter_value].presence
    @filter_column = validations_params[:filter_column].try(:to_sym)
    @association_value = validations_params[:association_value].presence
    @association_column = validations_params[:association_column].try(:to_sym)
    @obj_value = validations_params[:obj_value]
    @obj_column = validations_params[:obj_column].try(:to_sym)

    # @valid_query = permitted_query

    # return false unless @valid_query
    
    if @association_value
      @event = Training::Entity.new(@association_column => @association_value, @obj_column => @obj_value)
    else
      @event = Training::Entity.new(@obj_column => @obj_value)
    end
    
    @valid = valid
  end

  def valid
    # return false unless @valid_query
    if @filter_value
      @event.valid? unless Training::Entity.find_by(@filter_column => @filter_value)[@obj_column] == @obj_value
    else
      @event.valid?
    end
    
    return !@event.errors.include?(@obj_column)
  end

  def messages
    # return messages = "A ação não é permitida" unless @valid_query
    if @valid
      messages = "true"
    else
      messages = @event.errors[@obj_column]
    end

    return messages
  end
  
  # private

  # def permitted_query
  #   ::Contents::Searchs::PermittedQuery.check @obj_value
  # end

end