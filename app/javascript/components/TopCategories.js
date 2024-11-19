import React, { useState, useEffect } from 'react';

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/v1/categories/top')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const containerStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  const categoryListStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const categoryItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    fontSize: '0.95rem',
  };

  const categoryNameStyle = {
    fontWeight: 'bold',
  };

  const productCountStyle = {
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <h2>Top 5 Categories</h2>
      <ul style={categoryListStyle}>
        {categories.map((category) => (
          <li key={category.id} style={categoryItemStyle}>
            <span style={categoryNameStyle}>{category.name}</span>
            <span style={productCountStyle}>
              {category.products_count} products
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCategories;
