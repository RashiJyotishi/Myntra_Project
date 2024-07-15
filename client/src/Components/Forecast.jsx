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
    <div className=" w-[100vw] p-4 px-auto bg-pink-50">
      <h1 className="mt-10 mb-5 text-4xl text-pink-600 font-bold text-center">Forecast Sales</h1>
      <div className="flex items-center justify-center mb-6">
        <label className="mr-5 text-lg font-bold">Select an item:</label>
        <select 
          value={selectedItem} 
          onChange={handleItemChange} 
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled className='font-bold'>Select an item</option>
          {items.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button 
          onClick={handleForecastClick} 
          className="p-2 ml-5 text-white font-bold bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          Get Forecast
        </button>
      </div>
      {forecastImage && (
        <div className="flex flex-col items-center">
          <h2 className="mb-4 mx-36 text-center text-lg font-semibold text-orange-600">Below Graph shows how a trend varied with time till now and what our model predicts it to be in future. It can be used to determine the items to be kept in stock and thus helps in Inventory Management and reducing the expenses on extra clothes.</h2>
          <img src={forecastImage} alt="Forecast Graph" className="border border-gray-300 rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default Forecast;
