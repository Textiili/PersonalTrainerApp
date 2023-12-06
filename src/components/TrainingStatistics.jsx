import Container from '@mui/material/Container';
import { groupBy, sumBy } from 'lodash'
import React, { useState, useEffect } from 'react';
//TODO
export default function TrainingStatistics() {

  const [data, setData] =useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/trainings')
    .then(response =>{
        if (response.ok)
            return response.json();
        else throw new Error("Error in fetching trainings: " + response.statusText);
    })
    .then(data => setData(data))
    .catch(err => console.error(err))
  }

  return(
  <>
  <h1>TODO</h1>
  </>
  );
}