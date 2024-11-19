class CategoriesController < ApplicationController
    def top
      @top_categories = Category.joins(:products)
                                .group("categories.id")
                                .order("COUNT(products.id) DESC")
                                .limit(5)

      render json: @top_categories
    end
end
