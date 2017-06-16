class ProductsController < ApplicationController
  before_action :set_product, only: [:update, :destroy]
  
  def index
    @products = Product.all
  end
  

  def form
    @product = params[:id] ? Product.find(params[:d]) : Product.new
    render partial: 'form'
  end
  

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product
    else
      render_error(@product)
    end
    
  end
  
  def update
    if @product.update(product_params)
      render json: @product
    else
      render_error(@product)
    end
  end

  def destroy
    @product.destroy
    render json: { message: 'removed' }, status: :ok
  end
  

  

  private

    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price)
    end
    
    
  
end
