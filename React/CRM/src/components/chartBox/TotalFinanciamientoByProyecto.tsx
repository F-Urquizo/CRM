import React from "react";
import "./chartBox.css";
import { useGetList } from "react-admin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const TotalFinanciamientoByProyecto = () => {
    // Fetching data from 'proyectos' collection
    const { data: proyectos = [], isLoading: proyectosLoading, error: proyectosError } = useGetList("proyectos");

    // Loading and error handling
    if (proyectosLoading) return <p>Loading...</p>;
    if (proyectosError) return <p>Error: {proyectosError.message}</p>;

    // Aggregating data
    const chartData = proyectos.map(proyecto => ({
        nombre: proyecto.nombre || "Unnamed", // Assuming 'nombre' is the field for project name
        total: proyecto.financiamiento_actual || 0, // Assuming 'financiamiento_actual' is the field for current financing
    }));

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <span>Financiamiento Actual por Proyecto</span>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="nombre" 
                        angle={0}
                        textAnchor="middle" 
                        fontSize={12}
                        interval={0} 
                    />
                    <YAxis 
                        angle={-20}
                    />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalFinanciamientoByProyecto;
