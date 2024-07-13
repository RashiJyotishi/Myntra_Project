import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../assets/Img1.png';
import image2 from '../assets/Img2.png';
import image3 from '../assets/Img3.png'; 
import image4 from '../assets/Img4.png';
import image5 from '../assets/Img5.png';
import image6 from '../assets/Img6.png';
import image7 from '../assets/Img7.png';
import image8 from '../assets/Img8.png';
import image9 from '../assets/Img9.png';
import image10 from '../assets/Img10.png';
import image11 from '../assets/Img11.png';
import image12 from '../assets/Img12.png';
import image13 from '../assets/Img13.png';
import image14 from '../assets/Img14.png';
import image15 from '../assets/Img15.png';

const imageMap = {
  'Img1.png': image1,
  'Img2.png': image2,
  'Img3.png': image3,
  'Img4.png': image4,
  'Img5.png': image5,
  'Img6.png': image6,
  'Img7.png': image7,
  'Img8.png': image8,
  'Img9.png': image9,
  'Img10.png': image10,
  'Img11.png': image11,
  'Img12.png': image12,
  'Img13.png': image13,
  'Img14.png': image14,
  'Img15.png': image15,
};

const TrendingFashion = () => {
  const [cardsData, setCardsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get-colors');
        setCardsData(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    if (cardsData.length === 0) return;

    const autoSlide = () => {
      setTransition(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
    };

    const interval = setInterval(autoSlide, 3000);

    return () => clearInterval(interval);
  }, [cardsData.length]);

  useEffect(() => {
    if (transition) {
      const timer = setTimeout(() => setTransition(false), 500);
      return () => clearTimeout(timer);
    }
  }, [transition]);

  const handleNext = () => {
    setTransition(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setTransition(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length);
  };

  const getCardsToShow = () => {
    if (cardsData.length < 3) return cardsData;

    const nextIndex = (currentIndex + 1) % cardsData.length;
    const nextNextIndex = (currentIndex + 2) % cardsData.length;
    return [cardsData[currentIndex], cardsData[nextIndex], cardsData[nextNextIndex]];
  };

  const getImageSource = (filename) => {
    return imageMap[filename];
  };

  if (cardsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center w-full my-8">
      <button
        onClick={handlePrev}
        className="z-10 px-4 py-[11px] -ml-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
      >
        ←
      </button>
      <div className={`flex ${transition ? 'transition-transform duration-500 ease-in-out' : ''}`}>
        {getCardsToShow().map((card, index) => (
          <div key={index} className="flex-shrink-0 w-1/3 p-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={getImageSource(card.image)} alt={`Card ${card.index}`} className="object-cover w-full h-48 bg-white" />
              <div className="p-4 bg-white">
                <div className="p-4 bg-white">
                  <p className="text-gray-700">Sentiment Score: {card.sentimentScore}</p>
                  <p className="text-gray-700">Engagement Score: {card.engagementScore}</p>
                </div>
                <div className="flex items-center mt-2">
                  {card.top_colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      style={{
                        width: `${100 / card.top_colors.length}%`,
                        height: '20px',
                        backgroundColor: color,
                      }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="z-10 px-4 py-[11px] -mr-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
      >
        →
      </button>
    </div>
  );
};

export default TrendingFashion;
