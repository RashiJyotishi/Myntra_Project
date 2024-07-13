import React, { useState, useEffect } from 'react';
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

const cardsData = [
    { id: 1, image: image1, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image2, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image3, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image4, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image5, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image6, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image7, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image8, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image9, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image10, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image11, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image12, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image13, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] },
    { id: 2, image: image14, sentimentScore: 88, engagementScore: 90, colorInfo: [
      { percentage: 15, hexCode: '#ff0000' },
      { percentage: 25, hexCode: '#00ff00' },
      { percentage: 30, hexCode: '#0000ff' },
      { percentage: 10, hexCode: '#ffff00' },
      { percentage: 20, hexCode: '#00ffff' }
    ] },
    { id: 1, image: image15, sentimentScore: 85, engagementScore: 92, colorInfo: [
      { percentage: 20, hexCode: '#ff0000' },
      { percentage: 30, hexCode: '#00ff00' },
      { percentage: 10, hexCode: '#0000ff' },
      { percentage: 25, hexCode: '#ffff00' },
      { percentage: 15, hexCode: '#00ffff' }
    ] }
    // Add more data for other cards as needed
  ];

const TrendingFashion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const autoSlide = () => {
      setTransition(true);
      setCurrentIndex(prevIndex => (prevIndex + 1) % cardsData.length);
    };

    const interval = setInterval(autoSlide, 3000);

    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    if (transition) {
      const timer = setTimeout(() => setTransition(false), 500);
      return () => clearTimeout(timer);
    }
  }, [transition]);

  const handleNext = () => {
    setTransition(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setTransition(true);
    setCurrentIndex(prevIndex => (prevIndex - 1 + cardsData.length) % cardsData.length);
  };

  const getCardsToShow = () => {
    const nextIndex = (currentIndex + 1) % cardsData.length;
    const nextNextIndex = (currentIndex + 2) % cardsData.length;
    return [cardsData[currentIndex], cardsData[nextIndex], cardsData[nextNextIndex]];
  };

  return (
    <div className="relative flex items-center justify-center w-full my-8">
      <button
        onClick={handlePrev}
        className="z-10 p-2 -ml-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
        // Adjusted transform
      >
        ←
      </button>
      <div className={`flex ${transition ? 'transition-transform duration-500 ease-in-out' : ''}`}>
        {getCardsToShow().map((card) => (
          <div key={card.id} className="flex-shrink-0 w-1/3 p-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={card.image} alt={`Card ${card.id}`} className="object-cover w-full h-48" />
              <div className="p-4 bg-white">
                <p className="text-gray-700">Sentiment Score: {card.sentimentScore}</p>
                <p className="text-gray-700">Engagement Score: {card.engagementScore}</p>

                <div className="flex items-center mt-2">
                  {card.colorInfo
                    .sort((a, b) => b.percentage - a.percentage) // Sort colors by percentage in descending order
                    .map((color, index) => (
                      <div
                        key={index}
                        style={{
                          width: `${color.percentage}%`,
                          height: '10px',
                          backgroundColor: color.hexCode,
                          marginRight: '0',
                        }}
                        title={`${color.hexCode} - ${color.percentage}%`}
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
        className="z-10 p-2 -mr-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
      >
        →
      </button>
    </div>
  );
};

export default TrendingFashion;
