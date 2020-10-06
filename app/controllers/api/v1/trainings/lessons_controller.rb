class Api::V1::Trainings::LessonsController < ApplicationController

  def validate_field
    field = ::Trainings::Lessons::ValidateField.new(params)
    render json: {valid: field.valid, messages: field.messages}.as_json
  end

  def create
    lesson = ::Trainings::Lessons::Create.new(params)
    render :json => {:status => lesson.status, :process => lesson.process?, :type => lesson.type, :message => lesson.message, :save => lesson.save, :data => lesson.data}.as_json
  end

  def update
    lesson = ::Trainings::Lessons::Update.new(params)
    render :json => {:status => lesson.status, :process => lesson.process?, :type => lesson.type, :message => lesson.message, :save => lesson.save, :data => lesson.data}.as_json
  end

  def save_upload
    lesson = ::Trainings::Lessons::SaveUpload.new(params)
    render :json => {:status => lesson.status, :process => lesson.process?, :type => lesson.type, :message => lesson.message, :save => lesson.save, :data => lesson.data}.as_json
  end

end