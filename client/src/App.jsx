import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Color_Freq from './Components/Color_Freq';
import TrendingFashion from './Components/TrendingFashion';
import WordCloud from './Components/WordCloud';
import SentimentAnalysis from './Components/SentimentAnalysis';
import RealTimeSentimentAnalysis from './Components/RealTimeSentimentAnalysis';
import Forecast from './Components/Forecast';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trending-fashion" component={TrendingFashion} />
        <Route path="/realtime-sentiment-analysis" component={RealTimeSentimentAnalysis} />
        <Route path="/color-freq" component={Color_Freq} />
        <Route path="/word-cloud" component={WordCloud} />
        <Route path="/sentiment-analysis" component={SentimentAnalysis} />
        <Route path="/forecast" component={Forecast} />
      </Switch>
    </Router>
  );
}

export default App;
