class Product < ApplicationRecord
    has_many :categorised_products, dependent: :destroy
    has_many :categories, through: :categorised_products

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }

    scope :search_by_keyword, ->(keyword) {
      keyword = "%#{keyword.downcase}%"
      joins(:categories)
        .where("LOWER(products.name) LIKE :keyword OR LOWER(products.description) LIKE :keyword OR LOWER(categories.name) LIKE :keyword", keyword: keyword)
    }

    scope :created_within, ->(start_date, end_date) {
      where(created_at: start_date..end_date)
    }

    def category_names
      categories.pluck(:name).join(", ")
    end

    def self.top_categories(limit = 5)
      Category.joins(:products)
              .group("categories.id")
              .order("COUNT(products.id) DESC")
              .limit(limit)
    end
end
