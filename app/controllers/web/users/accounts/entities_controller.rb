class Web::Users::Accounts::EntitiesController < ApplicationController

  skip_before_action :require_user, only: [:index]

  def index
  end
  
end