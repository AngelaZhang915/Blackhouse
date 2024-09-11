"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as FinancialChart,
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  discontinuousTimeScaleProviderBuilder,
} from 'react-financial-charts';

import {
  Chart as ChartJS,
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
ChartJS.register(
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
  date: Date;
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
        // Format data for react-financial-charts
        const formattedData = res.data.data.map((d: any) => ({
          date: new Date(d.x),
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }));
        setCandlestickData(formattedData);
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



  const { data, xScale, xAccessor, displayXAccessor } = discontinuousTimeScaleProviderBuilder()
  .inputDateAccessor((d: CandlestickData) => d.date)(candlestickData);
  
  return (
    <div>
      <h1 style={{ textAlign: 'center' }} >Dashboard</h1>

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
        <ChartCanvas
          height={400}
          width={600}
          ratio={1}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          seriesName="Candlestick"
          data={data}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
        >
          <Chart id={1} yExtents={(d: CandlestickData) => [d.high, d.low]}>
            <XAxis />
            <YAxis />
            <CandlestickSeries />
            <MouseCoordinateX displayFormat={(date: Date) => date.toLocaleDateString()} />
            <MouseCoordinateY displayFormat={(price: number) => price.toFixed(2)} />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>

      </div>
    </div>
  );
};

export default Dashboard;