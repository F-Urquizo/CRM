import React from 'react';
import { useGetList } from "react-admin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./chartBox.css"; 

const UsersAgeChart = () => {
    const { data = [], isLoading, error } = useGetList("usuarios");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const ageCount = data.reduce((acc, user) => {
        const age = user.edad;  
        acc[age] = (acc[age] || 0) + 1; 
        return acc;
    }, {});

    const chartData = Object.keys(ageCount).map(age => ({
        age: +age,               
        count: ageCount[age]     
    }));

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <span>Distribución de Usuarios por Edades</span>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="age" 
                        tick={{ fill: '#808080' }} 
                    />
                    <YAxis 
                        tick={{ fill: '#808080' }} 
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsersAgeChart;
