module Api
  module V1
    module Users
      module Accounts
        class EntitiesController < ApplicationController

          skip_before_action :require_user, only: [:list, :create, :read, :update]
          skip_before_action :verify_authenticity_token

          def list
            list = ::Users::Accounts::Entities::List.new(params)
            render :json => {:data => list.data, :status => list.status, :process => list.process?, :type => list.type, :message => list.message}.as_json
          end

          def create
            account = ::Users::Accounts::Entities::Create.new(params)
            render :json => {:save => account.save, :data => account.data, :status => account.status, :type => account.type, :message => account.message}.as_json
          end

          def update
            account = ::Users::Accounts::Entities::Update.new(params)
            render :json => {:save => account.save, :data => account.data, :status => account.status, :type => account.type, :message => account.message}.as_json
          end
          
          def read
            account = ::Users::Accounts::Entities::Read.new(params)
            render :json => {:data => account.data, :status => account.status, :process => account.process?, :type => account.type, :message => account.message}.as_json
          end

        end
      end
    end
  end
end
