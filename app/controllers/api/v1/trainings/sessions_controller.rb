class Api::V1::Trainings::SessionsController < ApplicationController

  def validate_field
    field = ::Trainings::Sessions::ValidateField.new(params)
    render json: {valid: field.valid, messages: field.messages}.as_json
  end

  def create
    session = ::Trainings::Sessions::Create.new(params)
    render :json => {:status => session.status, :process => session.process?, :type => session.type, :message => session.message, :save => session.save, :data => session.data, :listener => session.listener}.as_json
  end

  def update
    session = ::Trainings::Sessions::Update.new(params)
    render :json => {:status => session.status, :process => session.process?, :type => session.type, :message => session.message, :save => session.save, :data => session.data, :listener => session.listener}.as_json
  end

end