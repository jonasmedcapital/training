class Api::V1::Trainings::EntitiesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def validate_field
    field = ::Trainings::Entities::ValidateField.new(params)
    render json: {valid: field.valid, messages: field.messages}.as_json
  end

  def list
    training = ::Trainings::Entities::List.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :data => training.data}.as_json
  end

  def read
    training = ::Trainings::Entities::Read.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :data => training.data}.as_json
  end

  def read_public
    training = ::Trainings::Entities::ReadPublic.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :data => training.data}.as_json
  end

  def create
    training = ::Trainings::Entities::Create.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :save => training.save, :data => training.data, :listener => training.listener}.as_json
    # render :json => "oi"
  end

  def update
    training = ::Trainings::Entities::Update.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :save => training.save, :data => training.data, :listener => training.listener}.as_json
  end

  def update_public
    training = ::Trainings::Entities::UpdatePublic.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :save => training.save}.as_json
  end

  def save_upload
    training = ::Trainings::Entities::SaveUpload.new(params)
    render :json => {:status => training.status, :process => training.process?, :type => training.type, :message => training.message, :save => training.save, :data => training.data}.as_json
  end


end