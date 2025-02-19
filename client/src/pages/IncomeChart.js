import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "../utils/api";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isLoading, setLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchIncomeData = async () => {
      setLoading(true);
      try {
        const response = await API.get("/monthly-earning", { withCredentials: true });
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const total = data.reduce((sum, item) => sum + item.amount, 0);
          setTotalIncome(total);

          setChartData({
            labels: data.map((item) => {
              const monthName = months.find((month) => month.index === item.month - 1)?.month;
              return `${monthName} ${item.year}`;
            }),
            datasets: [
              {
                label: "Monthly Income ($)",
                data: data.map((item) => item.amount),
                backgroundColor: "rgba(59, 130, 246, 0.6)",
                borderColor: "rgba(37, 99, 235, 1)",
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: "rgba(59, 130, 246, 0.8)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Income Overview",
        color: "#1E40AF",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "rgba(30, 64, 175, 0.9)",
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 11 },
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(59, 130, 246, 0.1)" },
        ticks: { color: "#1E40AF", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(59, 130, 246, 0.1)" },
        ticks: {
          color: "#1E40AF",
          font: { size: 12 },
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 border border-blue-100"
    >
      {chartData.labels.length > 0 ? (
        <>
          <div className="mb-4 text-center">
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-blue-900 mb-1">
              Income Analytics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-600 text-sm font-medium"
            >
              Total Income: ${totalIncome.toFixed(2)}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50/50 rounded-lg p-3 h-[300px]"
          >
            <Bar data={chartData} options={options} />
          </motion.div>
        </>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-blue-900 text-sm font-medium py-6">
          No income data available yet.
        </motion.p>
      )}
    </motion.div>
  );
};

export default IncomeChart;
