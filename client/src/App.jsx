import './App.css'
import Color_Freq from './Components/Color_Freq'
import TrendingFashion from './Components/TrendingFashion'
import WordCloud from './Components/WordCloud'
import SentimentAnalysis from './Components/SentimentAnalysis'
import PhotoUpload from './Components/PhotoUpload'
import PostList from './Components/PostList'
import SentimentGraph from './Components/SentimentGraph'

function App() {
  return (
    <div className='bg-orange-50'>
      <TrendingFashion />
      <div>
        <PhotoUpload />
        <PostList />
        <SentimentGraph />
      </div>
      <Color_Freq />
      <WordCloud />
      <SentimentAnalysis />
    </div>
  )
}

export default App
