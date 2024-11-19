import React, { useState } from 'react';

const KeywordSearch = ({ onSearch, searchResults }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      onSearch(keyword);
    }
  };

  // Inline styles for the search form and results
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
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const resultsStyle = {
    marginTop: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={formStyle}>
        <label style={labelStyle}>Search by keyword:</label>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
          Search
        </button>
      </form>
    </div>
  );
};

export default KeywordSearch;
