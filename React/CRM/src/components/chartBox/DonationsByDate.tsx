import React from 'react'; // Ensure React is imported
import "./chartBox.css";
import { useGetList } from "react-admin";
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const DonationsByDateChart = () => {
    const { data = [], isLoading, error } = useGetList("donaciones");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const aggregatedData = data.reduce((acc, item) => {
        const { fecha, cantidad } = item;
        const date = new Date(fecha).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += cantidad;
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(fecha => ({
        fecha,
        total: aggregatedData[fecha],
    }));

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <span>Total Donations By Date</span>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonationsByDateChart;
