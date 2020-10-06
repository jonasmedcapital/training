module Api
  module V1
    module Validations
      class LoginsController < ApplicationController
           
        before_action :require_user, except: [:validate]

        def validate
          value = validations_params[:value]
          field = "cpf"
          event_class = "User".constantize
          event_field = field.try(:to_sym)

          @value_query = value

          event = event_class.new(event_field => value)
          event.valid?(:login)
          
          validation_response = !event.errors.include?(event_field)
          
          #validation_response = true unless event.errors.include?(event_field)
          
          if validation_response
            message = "Ok!"
          else
            message = event.errors[event_field]
          end

          render json: {field_name: event_field, valid: validation_response, messages: message}
        end

        private

        def validations_params
          params.require(:validation).permit(:id, :filter, :field, :field_class, :value)
        end

      end
    end
  end
end
