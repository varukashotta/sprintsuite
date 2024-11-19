module Api
    module V1
      class CategoriesController < ApplicationController
        def index
          categories = Category.all
          render json: categories
        end

        def show
          category = Category.find(params[:id])
          render json: category
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Category not found" }, status: :not_found
        end

        def create
          category = Category.new(category_params)
          if category.save
            render json: category, status: :created
          else
            render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          category = Category.find(params[:id])
          if category.destroy
            render json: { message: "Category successfully deleted" }, status: :ok
          else
            render json: { errors: "Failed to delete category" }, status: :unprocessable_entity
          end
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Category not found" }, status: :not_found
        end

        def top
          top_categories = Category.joins(:products)
                                   .group("categories.id")
                                   .select("categories.*, COUNT(products.id) AS products_count")
                                   .order("products_count DESC")
                                   .limit(5)
          render json: top_categories, methods: :products_count
        end

        private

        def category_params
          params.require(:category).permit(:name)
        end
      end
    end
end
