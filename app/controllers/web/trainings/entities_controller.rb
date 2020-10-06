class Web::Trainings::EntitiesController < ApplicationController

  # skip_before_action :require_user, only: [:index]

  def index
  end

  def show
  end

  def public_show
    @meta_tags = true

    begin
      @course = ::Marketing::Course::Entity.friendly.find(course_params[:id])

      can_show = can_user_controller_action if current_user
      if @course.published_at? || can_show
        if current_user.nil?
          @field = Landing::Field.find_by(path: @course.path)
          @landing = @field.landing
          landing_url = request.base_url + "/" + @landing.slug

          token = request.params["token"]
          conversion = ActiveModel::Type::Boolean.new.cast(request.params["conversion"])
          visitor = current_visit.visitor if current_visit
          visitor_token = visitor.token if visitor

          metric = Marketing::Course::Metric.where(course_id: @course.id, visitor_id: visitor.id).first if visitor

          if metric || conversion
          else
            if token.nil?
              redirect_to landing_url
            elsif visitor_token != token
              redirect_to landing_url
            elsif !visitor.lead
              redirect_to landing_url
            end
          end

          redirect_back(fallback_location: blogs_path) unless @course.published_at
        end
      else
        redirect_to blogs_path
      end
      
    rescue ActiveRecord::RecordNotFound => e
      redirect_to blogs_path
    rescue NoMethodError => e
      redirect_to blogs_path
    end
  end
  

  private

  def course_params
    params.permit(:id)
  end
  
end