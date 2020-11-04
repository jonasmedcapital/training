class Api::V1::Uploads::EntitiesController < ApplicationController

  skip_before_action :verify_authenticity_token

 def upload
    upload = ::Uploads::Entities::Upload.new(params)
    render :json => {:status => upload.status, :process => upload.process?, :type => upload.type, :message => upload.message, :save => upload.save, :data => upload.data }.as_json
  end

end