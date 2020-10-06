class Api::V1::Trainings::SpeakersController < ApplicationController

  def create
    speaker = ::Trainings::Speakers::Create.new(params)
    render :json => {:status => speaker.status, :process => speaker.process?, :type => speaker.type, :message => speaker.message, :save => speaker.save, :data => speaker.data}.as_json
  end

  def destroy
    speaker = ::Trainings::Speakers::Destroy.new(params)
    render :json => {:status => speaker.status, :process => speaker.process?, :type => speaker.type, :message => speaker.message, :save => speaker.save, :data => speaker.data}.as_json
  end

end