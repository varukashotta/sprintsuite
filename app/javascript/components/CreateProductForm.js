import React, { useState } from 'react';

const CreateProductForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      categories: categories.split(',').map((cat) => cat.trim()),
    };

    fetch('/api/v1/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: productData }),
    })
      .then((response) => response.json())
      .then((data) => {
        onCreate(data);
        setName('');
        setDescription('');
        setPrice('');
        setCategories('');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Create Product</h2>
      <label style={labelStyle}>Name:</label>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />
      <label style={labelStyle}>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={textareaStyle}
      />
      <label style={labelStyle}>Price:</label>
      <input
        type='number'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={inputStyle}
      />
      <label style={labelStyle}>Categories (comma-separated):</label>
      <input
        type='text'
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        style={inputStyle}
      />
      <button type='submit' style={buttonStyle}>
        Create
      </button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '0.95rem',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none',
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '80px',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  alignSelf: 'flex-start',
};

export default CreateProductForm;
