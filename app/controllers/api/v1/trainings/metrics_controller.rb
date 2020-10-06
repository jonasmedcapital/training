class Api::V1::Trainings::MetricsController < ApplicationController

  skip_before_action :require_user, only: [:save_public, :read_public]

  def save_public
    metric = ::Trainings::Metrics::SavePublic.new(params)
    render :json => {:status => metric.status, :process => metric.process?, :type => metric.type, :message => metric.message, :save => metric.save, :data => metric.data}.as_json
  end

  def read_public
    metric = ::Trainings::Metrics::ReadPublic.new(params)
    render :json => {:status => metric.status, :process => metric.process?, :type => metric.type, :message => metric.message, :save => metric.save, :data => metric.data}.as_json
  end

end