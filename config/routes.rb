Rails.application.routes.draw do

  root 'products#index'
  get 'product_form', to: 'products#form'

  resources :products

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
