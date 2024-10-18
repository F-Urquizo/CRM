import React from "react";
import "./chartBox.css";
import { useGetList } from "react-admin";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const TotalFinanciamientoPorProyecto = () => {
  // Fetching data from 'proyectos' collection
  const {
    data: proyectos = [],
    isLoading: proyectosLoading,
    error: proyectosError,
  } = useGetList("proyectos");

  // Loading and error handling
  if (proyectosLoading) return <p>Loading...</p>;
  if (proyectosError) return <p>Error: {proyectosError.message}</p>;

  // Aggregating data for pie chart
  const chartData = proyectos.map((proyecto) => ({
    nombre: proyecto.nombre || "Unnamed",
    total: proyecto.financiamiento_requerido || 0,
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <span>Financiamiento Requerido por Proyecto</span>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="total"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalFinanciamientoPorProyecto;
