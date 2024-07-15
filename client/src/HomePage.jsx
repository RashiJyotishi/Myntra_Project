import React from 'react';
import { Link } from 'react-router-dom';
import Hero from "../src/assets/Hero.png"
const HomePage = () => {
  return (
    <div className="h-[90vh] w-[100vw] py-36 px-24 bg-pink-50">
      <div className='flex flex-row items-center justify-between'>
        <div>
          <img src={Hero} alt="" />
        </div>
        <div className='pl-10'>
          <h1 className='text-7xl text-pink-600 font-semibold'>Welcome to the Myntra Trend Dashboard </h1>
          <ul className='text-orange-600 text-lg mt-10'>
            <li>1. Get Latest Instagram, Pinterest and other Social Media Fashion Trends, to know what Genz is wearing.</li>
            <li>2. Know what your customer likes, our Sentiment Analysis works just perfect.</li>
            <li>3. Latest Trending Colors? Why Not. Explore Famous #Hashtags to refine your Data.</li>
            <li>4. Our Trend forecasting Graphs lets you know Trend timeline, Make sure to update ypur inventory accordingly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
