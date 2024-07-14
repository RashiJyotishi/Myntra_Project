import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const SentimentGraph = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/posts');
        const posts = response.data;

        const sentimentData = posts.reduce((acc, post) => {
          post.comments.forEach(comment => {
            if (!acc[post.hashtags]) acc[post.hashtags] = { positive: 0, negative: 0, neutral: 0 };
            acc[post.hashtags][comment.sentiment]++;
          });
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
    <div>
      {Object.keys(data).length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SentimentGraph;
