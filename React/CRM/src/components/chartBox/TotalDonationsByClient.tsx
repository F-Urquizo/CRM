import "./chartBox.css";
import { useGetList } from "react-admin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const TotalDonationsByClient = () => {
    const { data: donaciones = [], isLoading: donacionesLoading, error: donacionesError } = useGetList("donaciones");
    const { data: usuarios = [], isLoading: usuariosLoading, error: usuariosError } = useGetList("usuarios");

    if (donacionesLoading || usuariosLoading) return <p>Loading...</p>;
    if (donacionesError || usuariosError) return <p>Error: {donacionesError?.message || usuariosError?.message}</p>;

    const usuarioMap = usuarios.reduce((acc, usuario) => {
        acc[usuario._id] = usuario.nombre;
        return acc;
    }, {});

    const aggregatedData = donaciones.reduce((acc, item) => {
        const { usuarioId, cantidad } = item;
        const nombre = usuarioMap[usuarioId] || "Unknown"; 

        if (!acc[nombre]) {
            acc[nombre] = 0;
        }
        acc[nombre] += cantidad;
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(nombre => ({
        nombre,
        total: aggregatedData[nombre],
    }));

    return (
        <div style={{ width: "100%", height: "400px" }}> 
            <span>Donaciones Totales por Cliente</span>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="nombre" 
                        angle={-10}
                        textAnchor="middle" 
                        fontSize={10}
                        interval={0} 
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalDonationsByClient;
