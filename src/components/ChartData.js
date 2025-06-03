import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartData({ data }) {

    console.log("here");
    if (!data) {
        return <div></div>;

    }

    const allTemps = [
    ...data.daily.temperature_2m_min,
    ...data.daily.temperature_2m_max,
    ...data.daily.temperature_2m_mean,
    ...data.daily.apparent_temperature_min,
    ...data.daily.apparent_temperature_max,
    ...data.daily.apparent_temperature_mean
  ];
  const yMin = Math.floor(Math.min(...allTemps)) - 2;
  const yMax = Math.ceil(Math.max(...allTemps)) + 2;

    const labels = data.daily.time.map(date => new Date(date).toLocaleDateString());
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      
      plugins: {
    tooltip: {
      mode: 'index',
      intersect: false, // ensures all lines show at same X position
    },
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Daily Temperature Overview',
    },
  },
      y: {
        min: yMin,
        max: yMax,
    
    }
    };
    const graphData = {
        labels,
        datasets: [
            {
                label: 'Mean Temperature',
                data: data.daily.temperature_2m_mean,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Max Temperature',
                data: data.daily.temperature_2m_max,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Min Temperature',
                data: data.daily.temperature_2m_min,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Mean Apparent Temperature',
                data: data.daily.apparent_temperature_mean,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Max Apparent Temperature',
                data: data.daily.apparent_temperature_max,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: 'Min Apparent Temperature',
                data: data.daily.apparent_temperature_min,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    }




    return (
      <div className="w-full overflow-x-auto h-fit">
        <h2 className="text-lg font-semibold mb-2">Weather Graph</h2>
        <div className="min-w-[600px] h-[600px]">
          <Line data={graphData} options={options} />
        </div>
      </div>
    );
}