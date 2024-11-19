class Category < ApplicationRecord
    has_many :categorised_products
    has_many :products, through: :categorised_products

    validates :name, presence: true, uniqueness: true
end
