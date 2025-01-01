import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const [month, setMonth] = useState(1);  // Default to January
  const [chartData, setChartData] = useState(null);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/piechart', { month });
      const categories = response.data.map(item => item._id);
      const counts = response.data.map(item => item.count);

      setChartData({
        labels: categories,
        datasets: [{
          data: counts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
      });
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <button onClick={fetchPieChartData}>Get Data</button>

      {chartData && <Pie data={chartData} />}
    </div>
  );
};

export default PieChart;
