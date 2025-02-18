import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "../utils/api";
import Loader from '../components/Loader'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define months array mapping index to month name
const months = [
  { index: 0, month: "Jan" },
  { index: 1, month: "Feb" },
  { index: 2, month: "Mar" },
  { index: 3, month: "Apr" },
  { index: 4, month: "May" },
  { index: 5, month: "Jun" },
  { index: 6, month: "Jul" },
  { index: 7, month: "Aug" },
  { index: 8, month: "Sep" },
  { index: 9, month: "Oct" },
  { index: 10, month: "Nov" },
  { index: 11, month: "Dec" },
];

const IncomeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchIncomeData = async () => {
      setLoading(true)
      try {
        const response = await API.get("/monthly-earning", { withCredentials: true });
        console.log("Raw Response:", response.data); // Log response to check structure

        const data = response.data;

        // Ensure data structure is correct and accessible
        if (Array.isArray(data) && data.length > 0) {
          console.log("Chart Data Labels:", data.map((item) => `${item.month}-${item.year}`));
          console.log("Chart Data Amounts:", data.map((item) => item.amount));

          // Map the month index to the month name
          setChartData({
            labels: data.map((item) => {
              const monthName = months.find(month => month.index === item.month - 1)?.month; // Adjust month to 0-based index
              return `${monthName} ${item.year}`;
            }), // Month-Year format
            datasets: [
              {
                label: "Monthly Income ($)",
                data: data.map((item) => item.amount),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.log("No earnings data available");
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      } finally{
        setLoading(false)
      }
    };

    fetchIncomeData();
  }, []);

  // ✅ Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Monthly Income Chart",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Income ($)",
        },
      },
    },
  };

  if(isLoading) return <Loader />

  return (
    <div className="w-full max-w-md mx-auto">
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">No income data available.</p>
      )}
    </div>
  );
};

export default IncomeChart;
