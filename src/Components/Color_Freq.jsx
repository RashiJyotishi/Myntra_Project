import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Color_Freq = () => {
  return (
    <div className='w-[40vw] ml-20 h-[40vh] bg-white rounded-2xl py-6 drop-shadow-sm'>
      <h1 className='text-pink-600 text-xl font-bold px-10 mb-4'>Trending Colors (July 2024)</h1>
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
  );
}

export default Color_Freq;
