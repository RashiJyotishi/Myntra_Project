import React, { useState, useEffect } from 'react';

const cardsData = [
  { id: 1, image: 'image1.jpg', sentimentScore: 85, engagementScore: 92 },
  { id: 2, image: 'image2.jpg', sentimentScore: 88, engagementScore: 90 },
  { id: 3, image: 'image3.jpg', sentimentScore: 82, engagementScore: 85 },
  { id: 4, image: 'image4.jpg', sentimentScore: 90, engagementScore: 93 },
  { id: 5, image: 'image5.jpg', sentimentScore: 87, engagementScore: 89 },
  { id: 6, image: 'image6.jpg', sentimentScore: 84, engagementScore: 91 },
  { id: 7, image: 'image7.jpg', sentimentScore: 83, engagementScore: 88 },
  { id: 8, image: 'image8.jpg', sentimentScore: 85, engagementScore: 92 },
  { id: 9, image: 'image9.jpg', sentimentScore: 88, engagementScore: 90 },
  { id: 10, image: 'image10.jpg', sentimentScore: 82, engagementScore: 85 },
  { id: 11, image: 'image11.jpg', sentimentScore: 90, engagementScore: 93 },
  { id: 12, image: 'image12.jpg', sentimentScore: 87, engagementScore: 89 },
  { id: 13, image: 'image13.jpg', sentimentScore: 84, engagementScore: 91 },
  { id: 14, image: 'image14.jpg', sentimentScore: 83, engagementScore: 88 },
  { id: 15, image: 'image15.jpg', sentimentScore: 85, engagementScore: 92 }
];

const TrendingFashion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

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
        className="z-10 px-4 py-[11px] -ml-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
        // Adjusted transform
      >
        ←
      </button>
      <div className={`flex ${transition ? 'transition-transform duration-500 ease-in-out' : ''}`}>
        {getCardsToShow().map((card) => (
          <div key={card.id} className="flex-shrink-0 w-1/3 p-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={card.image} alt={`Card ${card.id}`} className="object-cover w-full h-48 bg-white" />
              <div className="p-4 bg-white">
                <p className="text-gray-700">Sentiment Score: {card.sentimentScore}</p>
                <p className="text-gray-700">Engagement Score: {card.engagementScore}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="z-10 px-4 py-[11px] -mr-4 text-2xl text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
         // Adjusted transform
      >
        →
      </button>
    </div>
  );
};

export default TrendingFashion;
