module Api
  module V1
    module Contents
      class AuthorsController < ApplicationController

          skip_before_action :verify_authenticity_token

        def create
          author = ::Contents::Authors::Create.new(params)
          render :json => {:status => author.status, :unprocess => author.unprocess?, :type => author.type, :message => author.message, :save => author.save}.as_json
        end

        def update
          author = ::Contents::Authors::Update.new(params)
          render :json => {:status => author.status, :unprocess => author.unprocess?, :type => author.type, :message => author.message, :save => author.save}.as_json
        end

        def save_avatar
          author = ::Contents::Authors::SaveAvatar.new(params)
          render :json => {:status => author.status, :unprocess => author.unprocess?, :type => author.type, :message => author.message, :save => author.save}.as_json
        end
        
        def read
          author = ::Contents::Authors::Read.new(params)
          render :json => {:status => author.status, :unprocess => author.unprocess?, :type => author.type, :message => author.message, :data => author.data}.as_json
        end

        def list
          list = ::Contents::Authors::List.new(params)
          render :json => {:status => list.status, :unprocess => list.unprocess?, :type => list.type, :message => list.message, :data => list.data}.as_json
        end

      end
    end
  end
end