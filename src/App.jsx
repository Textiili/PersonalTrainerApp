import './App.css'
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './components/CustomerList';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import CalendarView from './components/CalendarView';

export default function App() {
  const [value, setValue] = useState('Customers');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
    <div>
    <Container maxWidth="xl">
        <AppBar position='fixed' style={{ background: '#bd842f' }}>
          <Toolbar>
            <Typography variant="h6" marginRight={25}>PERSONAL TRAINER APP</Typography> 
            <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {background:'#000000'}}}>
            <Tab value="Customers" label="Customers" />
            <Tab value="Trainings" label="Trainings" />
            <Tab value="Calendar" label="Calendar" />
            </Tabs>
          </Toolbar> 
        </AppBar>
      </Container>
    </div>
    {value === 'Customers' && <CustomerList/>}
    {value === 'Trainings' && <TrainingList/>}
    {value === 'Calendar' && <CalendarView/>}
    </>
  )
}


