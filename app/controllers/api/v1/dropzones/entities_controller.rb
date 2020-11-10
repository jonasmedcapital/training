class Api::V1::Dropzones::EntitiesController < ApplicationController

  skip_before_action :verify_authenticity_token

 def dropzone
    dropzone = ::Dropzones::Entities::Dropzone.new(params)
    render :json => {:status => dropzone.status, :process => dropzone.process?, :type => dropzone.type, :message => dropzone.message, :save => dropzone.save, :data => dropzone.data }.as_json
  end

end