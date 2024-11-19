require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  let!(:categories) { create_list(:category, 5) }
  let!(:products) { create_list(:product, 10, categories: [ categories.sample ]) }
  let(:product_id) { products.first.id }
  let(:valid_attributes) { { name: 'New Product', description: 'Great product', price: 100.0, categories: [ 'New Category' ] } }

  # Helper method to parse JSON response
  def json
    JSON.parse(response.body)
  end

  describe 'POST /api/v1/products' do
    context 'when the request is valid' do
      it 'creates a new product with new categories' do
        post '/api/v1/products', params: { product: valid_attributes }

        expect(response).to have_http_status(201)
        expect(json['name']).to eq('New Product')
        expect(json['categories'].map { |cat| cat['name'] }).to include('New Category')
      end
    end

    context 'when the request is invalid' do
      it 'returns a validation failure message' do
        post '/api/v1/products', params: { product: { name: '' } }

        expect(response).to have_http_status(422)
        expect(json['errors']).to include("Name can't be blank")
      end
    end
  end

  describe 'GET /api/v1/products' do
    it 'returns all products' do
      get '/api/v1/products'

      expect(response).to have_http_status(200)
      expect(json.size).to eq(10)
    end
  end

  describe 'PUT /api/v1/products/:id' do
    context 'when the product exists' do
      it 'updates the product' do
        put "/api/v1/products/#{product_id}", params: { product: { name: 'Updated Product' } }

        expect(response).to have_http_status(200)
        expect(json['name']).to eq('Updated Product')
      end
    end

    context 'when the product does not exist' do
      it 'returns a not found message' do
        put '/api/v1/products/0', params: { product: { name: 'Updated Product' } }

        expect(response).to have_http_status(404)
        expect(json['errors']).to include('Product not found')
      end
    end
  end

  describe 'DELETE /api/v1/products/:id' do
    it 'deletes the product' do
      expect {
        delete "/api/v1/products/#{product_id}"
      }.to change(Product, :count).by(-1)

      expect(response).to have_http_status(200)
      expect(json['message']).to eq('Product successfully deleted')
    end
  end

  describe 'GET /api/v1/products/search' do
    it 'returns products matching the search keyword' do
      get '/api/v1/products/search', params: { keyword: products.first.name.split.first }

      expect(response).to have_http_status(200)
      expect(json).not_to be_empty
    end
  end

  describe 'GET /api/v1/products/filter_by_date' do
    it 'returns products within the date range' do
      start_date = 2.days.ago.to_date
      end_date = Date.today
      get '/api/v1/products/filter_by_date', params: { start_date: start_date, end_date: end_date }

      expect(response).to have_http_status(200)
      expect(json).to all(satisfy { |product| Date.parse(product['created_at']) >= start_date && Date.parse(product['created_at']) <= end_date })
    end

    it 'returns an error when dates are missing' do
      get '/api/v1/products/filter_by_date', params: { start_date: '' }

      expect(response).to have_http_status(422)
      expect(json['errors']).to eq('Start date and end date must be provided')
    end
  end

  describe 'GET /api/v1/categories/top' do
    before do
      5.times do |i|
        category = create(:category, name: "Category #{i}")
        create_list(:product, i + 1, categories: [ category ])
      end
    end

    it 'returns the top 5 categories with the most products' do
      get '/api/v1/categories/top'

      expect(response).to have_http_status(200)
      expect(json.size).to eq(5)
      expect(json.first['products_count']).to be >= json.last['products_count']
    end
  end
end
