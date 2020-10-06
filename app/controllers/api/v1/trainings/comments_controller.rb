class Api::V1::Trainings::CommentsController < ApplicationController

    # skip_before_action :require_user, only: [:create]

    def create
      comment = ::Trainings::Comments::Create.new(params)
      render :json => {:status => comment.status, :process => comment.process?, :type => comment.type, :message => comment.message, :save => comment.save, :data => comment.data, :notification => comment.notification}.as_json
    end

    def update
      comment = ::Trainings::Comments::Update.new(params)
      render :json => {:status => comment.status, :process => comment.process?, :type => comment.type, :message => comment.message, :save => comment.save, :data => comment.data, :notification => comment.notification}.as_json
    end
    
end