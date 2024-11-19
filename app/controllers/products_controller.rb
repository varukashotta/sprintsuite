class ProductsController < ApplicationController
    before_action :set_product, only: [ :show, :edit, :update, :destroy ]

    def index
      @products = Product.all
      @top_categories = Product.top_categories(5)
    end

    def show
    end

    def new
      @product = Product.new
    end

    def create
        @product = Product.new(product_params)
        category_names = params[:product][:categories].split(",").map(&:strip)

        category_names.each do |name|
          category = Category.find_or_create_by(name: name)
          @product.categories << category
        end

        if @product.save
          redirect_to products_path, notice: "Product was successfully created."
        else
          respond_to do |format|
            format.turbo_stream { render turbo_stream: turbo_stream.replace("form-container", partial: "products/form", locals: { product: @product }) }
            format.html { render :new }
          end
        end
      end



    def update
        if @product.update(product_params)
            @product.categories.clear
            category_names = params[:product][:categories].split(",").map(&:strip)
            category_names.each do |name|
            category = Category.find_or_create_by(name: name)
            @product.categories << category
            end
            redirect_to products_path, notice: "Product was successfully updated."
        else
            respond_to do |format|
            format.turbo_stream { render turbo_stream: turbo_stream.replace("form-container", partial: "products/form", locals: { product: @product }) }
            format.html { render :edit }
            end
        end
    end

    def edit
    end

    def destroy
      @product.destroy
      redirect_to products_url, notice: "Product was successfully deleted."
    end

    def search
      keyword = params[:keyword]
      @products = Product.search_by_keyword(keyword)

      respond_to do |format|
        format.html { render :index }
        format.json { render json: @products }
      end
    end

    def filter_by_date
      start_date = params[:start_date]
      end_date = params[:end_date]

      if start_date.present? && end_date.present?
        @products = Product.created_within(start_date, end_date)
      else
        @products = Product.all
        flash[:alert] = "Please provide both start and end dates for filtering."
      end

      respond_to do |format|
        format.html { render :index }
        format.json { render json: @products }
      end
    end

    private

    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price)
    end
end
