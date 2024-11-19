import React from 'react';

const ProductList = ({ products = [], onEdit, onDelete }) => {
  return (
    <div style={containerStyle}>
      <h2>Products</h2>
      {products.length > 0 ? (
        <ul style={productListStyle}>
          {products.map((product) => (
            <li key={product.id} style={productItemStyle}>
              <span style={productNameStyle}>{product.name}</span>
              <span style={productPriceStyle}>${product.price}</span>
              <div>
                <button style={editButtonStyle} onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button
                  style={deleteButtonStyle}
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

const containerStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

const productListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const productItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};

const productNameStyle = {
  fontWeight: 'bold',
  fontSize: '1rem',
};

const productPriceStyle = {
  color: '#555',
};

const buttonStyle = {
  marginLeft: '10px',
  padding: '5px 10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#FF5A5F',
  color: 'white',
};

export default ProductList;
