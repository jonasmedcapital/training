class Web::Trainings::EntitiesController < ApplicationController

  # skip_before_action :require_user, only: [:index]

  def index
  end

  def show
  end

  def public_show

    @meta_tags = true

    @training = ::Training::Entity.friendly.find(training_params[:id])

    # can_show = can_user_controller_action if current_user
    if !@training.published_at? #|| can_show
      redirect_to trainings_path
    end
  end
  
  private

  def training_params
    params.permit(:id)
  end
  
end