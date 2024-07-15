import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Color_Freq = () => {
  return (
    <div className='w-[100vw] h-[88vh] bg-pink-50 flex flex-col items-center justify-center'>

    <div className='h-[70vh] w-[80vw] bg-white rounded-2xl py-6 drop-shadow-sm mx-10'>
      <h1 className='text-pink-600 text-4xl font-semibold px-10 mb-4'>Trending Colors (July 2024)</h1>
      {/* <h1 className='text-5xl font-semibold text-pink-600 mb-10'>Word Cloud</h1> */}
      <h1 className='text-xl font-regular text-orange-600 mb-10 px-10'> <b className='mb-10'>Need: What colors do GenZ prefer?</b> <br /> <span className='font-regular'>Solution: Get the overall Color Analysis. For this, we took out trending fashion clothing from instagram and did color analysis on each post, then we combined them into a pie chart and displayed using React.js Material UI.</span> </h1>
      <div className="flex justify-center">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 7, label: 'darkolivegreen' },
                { id: 1, value: 39, label: 'black' },
                { id: 2, value: 11, label: 'rosybrown' },
                { id: 3, value: 6, label: 'tan' },
                { id: 4, value: 6, label: 'sienna' },
                { id: 6, value: 19, label: 'darkslategray' },
                { id: 7, value: 2, label: 'peru' },
                { id: 8, value: 7, label: 'silver' },
                { id: 9, value: 2, label: 'white' },
                { id: 10, value: 15, label: 'gray' },
                { id: 12, value: 10, label: 'darkgray' },
                { id: 13, value: 13, label: 'dimgray' },
                { id: 15, value: 5, label: 'lightgray' },
                { id: 16, value: 2, label: 'indianred' },
                { id: 18, value: 2, label: 'brown' },
                { id: 23, value: 3, label: 'saddlebrown' },
                { id: 25, value: 2, label: 'whitesmoke' },
                { id: 26, value: 2, label: 'darkslateblue' },
                { id: 28, value: 2, label: 'burlywood' },
                { id: 30, value: 3, label: 'gainsboro' },
              ],
            },
          ]}
          width={1100}
          height={250}
        />
      </div>
    </div>
    </div>
  );
}

export default Color_Freq;
