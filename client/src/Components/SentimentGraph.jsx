import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

Chart.register(...registerables);

const SentimentGraph = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/sentiment');
        const results = response.data;
        
        const sentimentData = results["Hashtag"].reduce((acc, hashtag, index) => {
          if (!acc[hashtag]) acc[hashtag] = { positive: 0, negative: 0, neutral: 0 };
          acc[hashtag].positive += results["Positive"][index];
          acc[hashtag].negative += results["Negative"][index];
          acc[hashtag].neutral += results["Neutral"][index];
          return acc;
        }, {});

        setData(sentimentData);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Positive',
        backgroundColor: 'green',
        data: Object.values(data).map(item => item.positive)
      },
      {
        label: 'Negative',
        backgroundColor: 'red',
        data: Object.values(data).map(item => item.negative)
      },
      {
        label: 'Neutral',
        backgroundColor: 'yellow',
        data: Object.values(data).map(item => item.neutral)
      }
    ]
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Sentiment Analysis of Comments</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {Object.keys(data).length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SentimentGraph;
