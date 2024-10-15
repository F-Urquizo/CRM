import React from 'react';
import { useGetList } from "react-admin";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./chartBox.css"; 

// Define the interface for the tooltip props
interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}

// Custom tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "5px", padding: "10px", border: "1px solid #ccc" }}>
                <p className="label" style={{ color: 'black' }}>{`Date: ${label}`}</p>
                <p className="total" style={{ color: 'black' }}>{`Total Donations: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const DonationsByDate = () => {
    const { data = [], isLoading, error } = useGetList("donaciones");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const aggregatedData = data.reduce((acc, item) => {
        const date = new Date(item.fecha);
        date.setDate(date.getDate() - 1); // This line subtracts one day
        const formattedDate = date.toISOString().split("T")[0]; // Format the date to "YYYY-MM-DD"
        const cantidad = item.cantidad;

        if (!acc[formattedDate]) {
            acc[formattedDate] = 0;
        }
        acc[formattedDate] += cantidad;
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(date => ({
        date,
        total: aggregatedData[date],
    }));

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <span>Donaciones por Fecha</span>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        interval={1} 
                        tick={{ fill: '#808080' }} 
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="linear" dataKey="total" stroke="#82ca9d" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonationsByDate;
