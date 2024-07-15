import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Forecast() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [forecastImage, setForecastImage] = useState('');

  useEffect(() => {
    // Fetch top 5 most profitable items
    axios.get('http://localhost:5000/top-profitable-items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleForecastClick = () => {
    if (selectedItem) {
      axios.get(`http://localhost:5000/forecast/${selectedItem}`, { responseType: 'blob' })
        .then(response => {
          const imageObjectURL = URL.createObjectURL(response.data);
          setForecastImage(imageObjectURL);
        })
        .catch(error => {
          console.error("There was an error fetching the forecast image!", error);
        });
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Forecast Sales</h1>
      <div className="flex items-center justify-center mb-6">
        <label className="mr-2 text-lg">Select an item:</label>
        <select 
          value={selectedItem} 
          onChange={handleItemChange} 
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select an item</option>
          {items.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button 
          onClick={handleForecastClick} 
          className="p-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Get Forecast
        </button>
      </div>
      {forecastImage && (
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-xl font-semibold">Forecast Graph</h2>
          <img src={forecastImage} alt="Forecast Graph" className="border border-gray-300 rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default Forecast;
