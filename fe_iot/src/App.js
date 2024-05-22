import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import TemperaturMonitoring from './components/temperaturMonitoring';
import {formatDateTime} from './utils/util'
import TemperatureChart from './components/temperatureChart';

function App() {
  const [currentTime, setCurrentTime] = useState(formatDateTime(new Date()));
  console.log("currentTime",currentTime)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000); // Cập nhật mỗi giây

    // Cleanup interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div className="container">
    <div className="header">Hệ Thống Giám Sát Nhiệt Độ Trung Tâm R&D Ô Tô</div>
    <div className='time'>Thời gian: {currentTime}</div>
    <div className='main'>
     <TemperaturMonitoring name="Phòng Server"></TemperaturMonitoring>
      <TemperatureChart></TemperatureChart>
    </div>
  </div>
  )
  }
export default App;
