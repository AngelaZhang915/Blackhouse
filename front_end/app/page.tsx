"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register chart components for Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define types for the data structures
interface CandlestickData {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface LineChartData {
  labels: string[];
  data: number[];
}

interface BarChartData {
  labels: string[];
  data: number[];
}

interface PieChartData {
  labels: string[];
  data: number[];
}

const Dashboard: React.FC = () => {
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);

  const [lineChartData, setLineChartData] = useState<ChartData<'line', number[]>>({
    labels: [],
    datasets: [
      {
        label: 'Line Data',
        data: [],
        borderColor: '#42A5F5',
        fill: false,
      },
    ],
  });
  
  const [barChartData, setBarChartData] = useState<ChartData<'bar', number[]>>({
    labels: [],
    datasets: [
      {
        label: 'Bar Data',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  });
  
  const [pieChartData, setPieChartData] = useState<ChartData<'pie', number[]>>({
    labels: [],
    datasets: [
      {
        label: 'Pie Data',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  // Fetching data from Django API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/candlestick-data/')
      .then((res) => {
        console.log('Candlestick Data:', res.data.data); // Check data structure
        setCandlestickData(res.data.data);
      })
      .catch((err) => console.error('Error fetching candlestick data:', err));

    axios
      .get('http://localhost:8000/api/line-chart-data/')
      .then((res) =>
        setLineChartData({
          labels: res.data.labels,
          datasets: [
            {
              label: 'Line Data',
              data: res.data.data,
              borderColor: '#42A5F5',
              fill: false,
            },
          ],
        })
      )
      .catch((err) => console.error(err));

    axios
      .get('http://localhost:8000/api/bar-chart-data/')
      .then((res) =>
        setBarChartData({
          labels: res.data.labels,
          datasets: [
            {
              label: 'Bar Data',
              data: res.data.data,
              backgroundColor: 'rgba(75,192,192,0.4)',
            },
          ],
        })
      )
      .catch((err) => console.error(err));

    axios
      .get('http://localhost:8000/api/pie-chart-data/')
      .then((res) =>
        setPieChartData({
          labels: res.data.labels,
          datasets: [
            {
              label: 'Pie Data',
              data: res.data.data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Line Chart */}
      <div>
        <h2>Line Chart</h2>
        <Line data={lineChartData} />
      </div>

      {/* Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        <Bar data={barChartData} />
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        <Pie data={pieChartData} />
      </div>

      {/* Candlestick Chart (Placeholder for now) */}
      <div>
        <h2>Candlestick Chart</h2>
        {/* You can integrate any library for Candlestick chart here */}
        <pre>{JSON.stringify(candlestickData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;