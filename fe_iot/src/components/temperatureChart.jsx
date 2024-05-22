import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary to register Chart.js

const TemperatureChart = ({ data }) => {
    const temperatureData = [
        { time: '00:00', temperature: 24.5 },
        { time: '01:00', temperature: 24.6 },
        { time: '02:00', temperature: 25.7 },
        { time: '03:00', temperature: 24.7 },
        { time: '04:00', temperature: 25 },
        { time: '05:00', temperature: 26 },
        { time: '06:00', temperature: 25 },
        { time: '07:00', temperature: 27 },
        { time: '08:00', temperature: 26 },
        { time: '09:00', temperature: 26 },
        { time: '10:00', temperature: 26.2 },
        { time: '11:00', temperature: 26.7 },
        { time: '12:00', temperature: 25.6 },
        { time: '13:00', temperature: 28.1 },
        { time: '14:00', temperature: 28.4 },
        { time: '15:00', temperature: 28.2 },
        { time: '16:00', temperature: 28.3 },
        { time: '17:00', temperature: 25 },
        { time: '18:00', temperature: 26 },
        { time: '19:00', temperature: 27 },
        { time: '20:00', temperature: 26 },
        { time: '21:00', temperature: 25 },
        { time: '22:00', temperature: 24 },
        { time: '23:00', temperature: 23 },
      ]
  const chartData = {
    labels: temperatureData.map(entry => entry.time), // Sử dụng mảng thời gian làm nhãn trục x
    datasets: [
      {
        label: 'Biểu đồ nhiệt độ (°C) phòng Server',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: temperatureData.map(entry => entry.temperature), // Sử dụng mảng nhiệt độ làm dữ liệu biểu đồ
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false, // Không cần bắt đầu từ 0 vì nhiệt độ có thể không cần thiết
        ticks: {
          callback: function (value) {
            return value + '°C'; // Thêm đơn vị °C vào các giá trị trục y
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureChart;
