import './App.css'
import Color_Freq from './Components/Color_Freq'
import TrendingFashion from './Components/TrendingFashion'
import WordCloud from './Components/WordCloud'
import SentimentAnalysis from './Components/SentimentAnalysis'
function App() {

  return (
    <div className='bg-orange-50'>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div>
      <TrendingFashion/>
      <Color_Freq/>
      <WordCloud/>
      <SentimentAnalysis/>
    </div>
    </div>
  )
}

export default App
