Rails.application.routes.draw do
  resources :posts
  devise_for :users,
    path: '',
    path_names: {sign_in: 'entrar',
                 sign_out: 'sair',
                 edit: 'dados-acesso/editar',
                 password: 'senha',
                 sign_up: "97hm4An0M6o2u0Wys6KyoLH88RSlpZHC2cEH94uEQSyOcwfn",
                 confirmation: "confirmacao",
                 unlock: "RGHnLUassurePx2f7dl1TTFG1x6dmPc799C80HHKEsItQJUN"},
    controllers: {
      sessions: 'web/users/sessions',
      confirmations: 'web/users/confirmations',
      passwords: 'web/users/passwords',
      registrations: 'web/users/registrations',
      unlocks: 'web/users/unlocks'
    }
  as :user do
    get "/esqueci-minha-senha", to: "web/users/passwords#forgotten", as: :esqueci_minha_senha
  end

  scope path: '/a' do
    resources :trainings, only: [:index, :show], path: '/treinamentos', controller: 'web/trainings/entities'
    resources :uploads, only: [:index, :show], path: '/uploads', controller: 'web/uploads/entities'
    resources :dropzones, only: [:index, :show], path: '/dropzones', controller: 'web/dropzones/entities'
    resources :printings, only: [:index, :show], path: '/printings', controller: 'web/printings/entities'
    resources :trackers, only: [:index, :show], path: '/trackers', controller: 'web/trackers/trackers'
  end

  get "/treinamentos/:id", to: "web/trainings/entities#public_show"
  
  namespace :api, path: '/' do
    namespace :v1, path: '/' do

      namespace :contents do
        post "authors/list", to: "authors#list"
        post "authors/read", to: "authors#read"
        post "authors/create", to: "authors#create"
        put "authors/update", to: "authors#update"
        put "authors/save_avatar", to: "authors#save_avatar"
      end

      namespace :validations do
        post "forms/validate", to: "forms#validate"
        post "forms/validate_lead", to: "forms#validate_lead"
        post "forms/validate_field", to: "forms#validate_field"
        post "forms/validate_user_password", to: "forms#validate_user_password"
        post "logins/validate", to: "logins#validate"  
      end
      
      namespace :trainings do
        post "entities/validate_field", to: "entities#validate_field"
        post "entities/list", to: "entities#list"
        post "entities/read", to: "entities#read"
        post "entities/read_public", to: "entities#read_public"
        post "entities/create", to: "entities#create"
        put "entities/update", to: "entities#update"
        put "entities/update_public", to: "entities#update_public"
        put "entities/save_upload", to: "entities#save_upload"

        post "sessions/validate_field", to: "sessions#validate_field"
        post "sessions/create", to: "sessions#create"
        put "sessions/update", to: "sessions#update"

        post "lessons/validate_field", to: "lessons#validate_field"
        post "lessons/create", to: "lessons#create"
        put "lessons/update", to: "lessons#update"
        put "lessons/save_upload", to: "lessons#save_upload"

        post "speakers/create", to: "speakers#create"
        delete "speakers/destroy", to: "speakers#destroy"

        post "metrics/save_public", to: "metrics#save_public"
        post "metrics/read_public", to: "metrics#read_public"

        post "comments/create", to: "comments#create"
        put "comments/update", to: "comments#update"
      end

      namespace :uploads do
        post "entities/upload", to: "entities#upload"
      end

      namespace :dropzones do
        post "entities/dropzone", to: "entities#dropzone"
        post "entities/upload", to: "entities#upload"
      end
    end
  end


end
