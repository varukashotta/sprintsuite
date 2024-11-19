import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(startDate, endDate);
  };

  return (
    <form onSubmit={handleFilter} style={formStyle}>
      <label style={labelStyle}>Start Date:</label>
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={inputStyle}
      />
      <label style={labelStyle}>End Date:</label>
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={inputStyle}
      />
      <button
        type='submit'
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyle.backgroundColor)
        }
      >
        Filter
      </button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px',
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '1rem',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
};

export default DateFilter;
