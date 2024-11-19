FactoryBot.define do
    factory :product do
      sequence(:name) { |n| "Product #{n}" }
      description { "Sample product description" }
      price { 10.0 }
    end
  end

  FactoryBot.define do
    factory :category do
      sequence(:name) { |n| "Category #{n}" }
    end
  end
