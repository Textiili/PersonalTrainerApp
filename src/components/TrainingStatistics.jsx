import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from 'recharts';

export default function TrainingStatistics() {

  const [training, setTraining] = useState([]);

  useEffect(() => {
      fetchTraining();
  },[]);

  const fetchTraining = () => {
    fetch(import.meta.env.VITE_API_URL + '/gettrainings')
    .then(response =>{
        if (response.ok)
            return response.json();
        else throw new Error("Error in fetching trainings: " + response.statusText);
    })
    .then(data => setTraining(data))
    .catch(err => console.error(err))
  }

  const groupedData = _.groupBy(training, 'activity');
  const summedData = _.map(groupedData, (group, key) => ({
    activity: key,
    totalDuration: _.sumBy(group, 'duration'),
  }));

  return (
    <>
      <div>
        <BarChart style={{margin: 100}} width={1000} height={400} data={summedData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='activity' />
          <YAxis tickFormatter={(value) => `${value} min`}/>
          <Tooltip />
          <Legend />
          <Bar dataKey='totalDuration' fill='#1f77b4' name='Total duration of training activities'>
            <LabelList dataKey='totalDuration'/>
          </Bar>
        </BarChart>
      </div>
    </>
  );
}