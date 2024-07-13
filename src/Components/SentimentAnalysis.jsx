import { BarChart } from '@mui/x-charts/BarChart';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import React from 'react';

const quarters = [
  'Blouses', 'Knits', 'Sweaters', 'Fine-Guage', 'Outwear', 'Jackets', 'Intimates', 'Lounge', 
  'Sleep', 'Swim', 'Legwear', 'Layering', 'Chemises', 'Dresses', 'Pants', 'Skirts', 'Jeans', 
  'Shorts', 'Casual Bottoms'
];

const sentimentData = {
  Blouses: [0.031482, 0.713719, 0.217999],
  Knits: [0.030198, 0.696738, 0.228254],
  Sweaters: [0.032266, 0.730553, 0.203557],
  'Fine-Guage': [0.030505, 0.721972, 0.210255],
  Outwear: [0.031241, 0.751933, 0.18939],
  Jackets: [0.026509, 0.741517, 0.202139],
  Intimates: [0.032532, 0.686688, 0.235338],
  Lounge: [0.029192, 0.720236, 0.218751],
  Sleep: [0.029092, 0.678654, 0.230873],
  Swim: [0.032143, 0.708489, 0.207926],
  Legwear: [0.026636, 0.708127, 0.22283],
  Layering: [0.019815, 0.685089, 0.199233],
  Chemises: [0.0, 0.697, 0.303],
  Dresses: [0.033414, 0.736194, 0.202852],
  Pants: [0.031612, 0.725876, 0.215132],
  Skirts: [0.028051, 0.720929, 0.206584],
  Jeans: [0.029368, 0.715306, 0.217841],
  Shorts: [0.028697, 0.715659, 0.214631],
  'Casual Bottoms': [0.0, 0.447, 0.053],
};

const SentimentAnalysis = () => {
  const [selectedQuarters, setSelectedQuarters] = React.useState(quarters);

  const handleChange = (event) => {
    setSelectedQuarters(event.target.value);
  };

  const getFilteredData = () => {
    const neg = selectedQuarters.map(quarter => sentimentData[quarter][0]);
    const neu = selectedQuarters.map(quarter => sentimentData[quarter][1]);
    const pos = selectedQuarters.map(quarter => sentimentData[quarter][2]);

    return [
      { name: 'Negative', data: neg },
      { name: 'Neutral', data: neu },
      { name: 'Positive', data: pos },
    ];
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Quarters</InputLabel>
        <Select
          multiple
          value={selectedQuarters}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {quarters.map((quarter) => (
            <MenuItem key={quarter} value={quarter}>
              <Checkbox checked={selectedQuarters.indexOf(quarter) > -1} />
              <ListItemText primary={quarter} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <BarChart
        series={getFilteredData()}
        height={290}
        xAxis={[{ data: selectedQuarters, scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
};

export default SentimentAnalysis;
