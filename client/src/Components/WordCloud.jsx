import React from 'react'
import WordCld from "../assets/WordCloud/wordcloud.png"
const WordCloud = () => {
  return (
    <div className=' flex flex-col justify-center w-[100vw] h-[88vh] bg-pink-50 px-36'>
      <h1 className='text-5xl font-semibold text-pink-600 mb-10'>Word Cloud</h1>
      <h1 className='text-xl font-regular text-orange-600 mb-10'> <b className='mb-10'>Need: What is GenZ looking for?</b> <br /> <span className='font-regular'>Solution: Get the information of latest and trending hashtags, cloth items, and a summary of words to attract GenZ on Social Media. Knowing what GenZ is searching for matters. Be at tight place and right time to be discovered.</span> </h1>
        <img src={WordCld} alt="" className='rounded-3xl drop-shadow-sm'/>
    </div>
  )
}

export default WordCloud