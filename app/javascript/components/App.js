import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CreateProductForm from './CreateProductForm';
import EditProductForm from './EditProductForm';
import KeywordSearch from './KeywordSearch';
import DateFilter from './DateFilter';
import TopCategories from './TopCategories';

const App = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    fetch('/api/v1/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId) => {
    fetch(`/api/v1/products/${productId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setSearchResults((prevResults) =>
          prevResults.filter((product) => product.id !== productId)
        );
        setNotification('Product successfully deleted');
        setTimeout(() => setNotification(null), 3000);
      }
    });
  };

  const handleCreate = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowCreateForm(false);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSearchResults((prevResults) =>
      prevResults.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const handleSearch = (keyword) => {
    fetch(`/api/v1/products/search?keyword=${encodeURIComponent(keyword)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrorNotification(data.errors);
          setTimeout(() => setErrorNotification(null), 3000);
        } else {
          setSearchResults(data);
          setErrorNotification(null);
        }
      });
  };

  const handleFilter = (startDate, endDate) => {
    fetch(
      `/api/v1/products/filter_by_date?start_date=${startDate}&end_date=${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrorNotification(data.errors);
          setTimeout(() => setErrorNotification(null), 3000);
        } else {
          setProducts(data);
          setSearchResults([]);
          setErrorNotification(null);
        }
      });
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Product Inventory Manager</h1>
        <button
          style={buttonStyle}
          onClick={toggleCreateForm}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = buttonStyle.backgroundColor)
          }
        >
          {showCreateForm ? 'Close Create Form' : 'Create Product'}
        </button>
      </header>
      {notification && <div style={notificationStyle}>{notification}</div>}
      {errorNotification && (
        <div style={errorNotificationStyle}>{errorNotification}</div>
      )}
      {showCreateForm && <CreateProductForm onCreate={handleCreate} />}
      {editingProduct && (
        <EditProductForm
          onUpdate={handleUpdate}
          product={editingProduct}
          onCancel={handleEditCancel}
        />
      )}
      {!editingProduct && !showCreateForm && (
        <>
          <div className='filters-container' style={filtersContainerStyle}>
            <div style={filterItemStyle}>
              <KeywordSearch
                onSearch={handleSearch}
                searchResults={searchResults}
              />
            </div>
            <div style={filterItemStyle}>
              <DateFilter onFilter={handleFilter} />
            </div>
          </div>

          <div className='content-container' style={contentContainerStyle}>
            <div style={contentItemStyle}>
              <TopCategories />
            </div>
            <div style={contentItemStyle}>
              <ProductList
                products={searchResults.length > 0 ? searchResults : products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '2rem',
  margin: '0',
};

const buttonStyle = {
  backgroundColor: '#FF5A5F',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#e04a4f',
};

const filtersContainerStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
};

const filterItemStyle = {
  flex: '1 1 50%',
  minWidth: '300px',
};

const contentContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
};

const contentItemStyle = {
  flex: '1 1 50%',
  minWidth: '300px',
};

const notificationStyle = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
  textAlign: 'center',
  fontSize: '1rem',
};

const errorNotificationStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
  textAlign: 'center',
  fontSize: '1rem',
};

export default App;
