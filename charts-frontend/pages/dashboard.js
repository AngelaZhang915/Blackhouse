import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    // Fetch data for all charts
    const fetchData = async () => {
      try {
        const candlestickRes = await axios.get('http://localhost:8000/api/candlestick-data/');
        const lineChartRes = await axios.get('http://localhost:8000/api/line-chart-data/');
        const barChartRes = await axios.get('http://localhost:8000/api/bar-chart-data/');
        const pieChartRes = await axios.get('http://localhost:8000/api/pie-chart-data/');
        
        setCandlestickData(candlestickRes.data);
        setLineChartData(lineChartRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Line Chart */}
      <div>
        <h2>Line Chart</h2>
        {lineChartData?.data && (
          <Line
            data={{
              labels: lineChartData.labels,
              datasets: [{
                label: 'Line Chart Data',
                data: lineChartData.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              }],
            }}
          />
        )}
      </div>
      
      {/* Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        {barChartData?.data && (
          <Bar
            data={{
              labels: barChartData.labels,
              datasets: [{
                label: 'Bar Chart Data',
                data: barChartData.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
              }],
            }}
          />
        )}
      </div>
      
      {/* Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        {pieChartData?.data && (
          <Pie
            data={{
              labels: pieChartData.labels,
              datasets: [{
                data: pieChartData.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
              }],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

