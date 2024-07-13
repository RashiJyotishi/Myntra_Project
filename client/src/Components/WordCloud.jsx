import React from 'react'
import WordCld from "../assets/WordCloud/wordcloud.png"
const WordCloud = () => {
  return (
    <div className='h-[40vh] flex flex-col items-center justify-center rounded-2xl drop-shadow-sm'>
        <img src={WordCld} alt="" />
    </div>
  )
}

export default WordCloud