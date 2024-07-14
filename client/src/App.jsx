import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Color_Freq from './Components/Color_Freq';
import TrendingFashion from './Components/TrendingFashion';
import WordCloud from './Components/WordCloud';
import SentimentAnalysis from './Components/SentimentAnalysis';
import RealTimeSentimentAnalysis from './Components/RealTimeSentimentAnalysis';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trending-fashion" component={TrendingFashion} />
        <Route path="/realtime-sentiment-analysis" component={RealTimeSentimentAnalysis} />
        <Route path="/color-freq" component={Color_Freq} />
        <Route path="/word-cloud" component={WordCloud} />
        <Route path="/sentiment-analysis" component={SentimentAnalysis} />
      </Switch>
    </Router>
  );
}

export default App;
