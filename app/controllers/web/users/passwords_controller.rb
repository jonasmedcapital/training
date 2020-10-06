# frozen_string_literal: true

class Web::Users::PasswordsController < Devise::PasswordsController

  # before_action :check_for_mobile, only: [:edit]
  # skip_before_action :require_user, only: [:forgotten, :create, :edit, :update]

  # GET /resource/password/new
  # def new
  #   super
  # end

  def forgotten
    
  end
  

  # POST /resource/password
  def create
    # super
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      render :json => {resource: resource, process: true, type: "success", message: "E-mail com instruções enviado com sucesso!"}.as_json
    else
      respond_with(resource)
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    super
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        resource.after_database_authentication
        sign_in(resource_name, resource)
      end
      render :json => {resource: resource, location: after_resetting_password_path_for(resource)}.as_json
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  # protected

  def after_resetting_password_path_for(resource)
    dashboard_path
  end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  # end
end
