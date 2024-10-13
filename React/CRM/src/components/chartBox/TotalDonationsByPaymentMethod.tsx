

import React from 'react'; // Ensure React is imported
import "./chartBox.css";
import { useGetList } from "react-admin";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const TotalDonationsByPaymentMethod = () => {
    const { data = [], isLoading, error } = useGetList("donaciones");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const aggregatedData = data.reduce((acc, item) => {
        const { formaDePago, cantidad } = item;
        if (!acc[formaDePago]) {
            acc[formaDePago] = 0;
        }
        acc[formaDePago] += cantidad;
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(formaDePago => ({
        formaDePago,
        total: aggregatedData[formaDePago],
    }));

    const filteredData = chartData.filter(item => item.formaDePago === 'Efectivo' || item.formaDePago === 'Crédito');

    const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <div style={{ width: "100%", height: "400px" }}> 
            <span>Total Donations By Payment Method</span>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip />
                    <Pie
                        data={filteredData}
                        dataKey="total"
                        nameKey="formaDePago"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalDonationsByPaymentMethod;
