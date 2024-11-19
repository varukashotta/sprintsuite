module Api
    module V1
      class ProductsController < ApplicationController
        skip_before_action :verify_authenticity_token

        rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

        def index
          products = Product.includes(:categories).all
          render json: products.as_json(include: { categories: { only: [ :id, :name ] } })
        end

        def show
          product = Product.includes(:categories).find(params[:id])
          render json: product.as_json(include: { categories: { only: [ :id, :name ] } })
        end

        def create
          product = Product.new(product_params)
          category_names = params[:product][:categories] || []

          category_names.each do |name|
            category = Category.find_or_create_by(name: name)
            product.categories << category
          end

          if product.save
            render json: product.as_json(include: { categories: { only: [ :id, :name ] } }), status: :created
          else
            render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          product = Product.find(params[:id])

          if product.update(product_params)
            product.categories.clear
            category_names = params[:product][:categories] || []

            category_names.each do |name|
              category = Category.find_or_create_by(name: name)
              product.categories << category
            end

            render json: product.as_json(include: { categories: { only: [ :id, :name ] } }), status: :ok
          else
            render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          product = Product.find(params[:id])

          if product.destroy
            render json: { message: "Product successfully deleted" }, status: :ok
          else
            render json: { errors: "Failed to delete product" }, status: :unprocessable_entity
          end
        end

        def search
          keyword = params[:keyword].downcase
          products = Product.joins(:categories)
                            .where("LOWER(products.name) LIKE ? OR LOWER(products.description) LIKE ? OR LOWER(categories.name) LIKE ?",
                                   "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
                            .distinct

          render json: products.as_json(include: { categories: { only: [ :id, :name ] } })
        end

        def filter_by_date
          start_date = params[:start_date]
          end_date = params[:end_date]

          if start_date.present? && end_date.present?
            products = Product.includes(:categories)
                              .where(created_at: Date.parse(start_date)..Date.parse(end_date))
            render json: products.as_json(include: { categories: { only: [ :id, :name ] } })
          else
            render json: { errors: "Start date and end date must be provided" }, status: :unprocessable_entity
          end
        end

        private

        def product_params
          params.require(:product).permit(:name, :description, :price)
        end

        def record_not_found
          render json: { errors: "Product not found" }, status: :not_found
        end
      end
    end
end
