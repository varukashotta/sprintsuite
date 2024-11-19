Rails.application.routes.draw do
  # Route for React view
  get "frontend", to: "pages#frontend"

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Root path route
  root "products#index"

  # Product routes with additional collection routes for views
  resources :products do
    collection do
      get :search
      get :filter_by_date
    end
  end

  # Category routes for views
  resources :categories, only: [ :index, :show ] do
    collection do
      get "top"
    end
  end

  # API namespace for JSON endpoints
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [ :index, :show, :create, :update, :destroy ] do
        collection do
          get :search
          get :filter_by_date
        end
      end

      resources :categories, only: [ :index, :show, :create, :destroy ] do
        collection do
          get "top"
          get :filter_by_date
        end
      end
    end
  end
end
