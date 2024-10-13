import React from "react";
import { useGetList } from "react-admin";
import { LineChart, Line, Tooltip } from "recharts";
import "./chartBox.css";
import { Link } from "react-router-dom";

const ChartBox = () => {
    // Fetch data from the data provider
    const { data = [], total, isLoading, error } = useGetList("donaciones"); // Use destructuring to provide a default value for data

    // Check for loading or error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Transform data to the format required by recharts
    const chartData = data.map(item => ({
        name: item.cliente,  // Assuming you want to use 'cliente' as the label
        uv: item.cantidad,    // Assuming 'cantidad' is the value to plot
        pv: item.formaDePago  // You can adjust this to whatever you want to visualize
    }));

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src="../../public/donaciones.png" alt="" />
                    <span>Total Donations</span>
                </div>
                <h1>{total}</h1> {/* Use total for the count of donations */}
                <Link to="/">View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <LineChart width={400} height={200} data={chartData}>
                        <Tooltip
                            contentStyle={{ backgroundColor: "transparent", border: "none" }}
                            labelStyle={{ display: "none" }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="white" strokeWidth={2} dot={false} />
                    </LineChart>
                </div>
                <div className="texts">
                    <span className="percentage">45%</span>
                    <span className="duration">this month</span>
                </div>
            </div>
        </div>
    );
};

export default ChartBox;







/*
import { Link } from "react-router-dom";
import "./chartBox.css";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartBox = () => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src="../../public/donaciones.png" alt="" />
                    <span>Total Donations</span>
                </div>
                <h1>11,238</h1>
                <Link to="/">View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <LineChart width={100} height={100} data={data}>
                        <Tooltip 
                            contentStyle={{backgroundColor: "transparent", border: "none"}}
                            labelStyle={{display: "none"}}
                            position={{x: 10 , y: 65}}
                        />
                        <Line                                 type="monotone" 
                            dataKey="pv" 
                            stroke="white" 
                            strokeWidth={2} 
                            dot= {false}
                        />
                    </LineChart>
                </div>
                <div className="texts">
                    <span className="percentage">45%</span>
                    <span className="duration">this month</span>
                </div>
            </div>
        </div>
    );
};

export default ChartBox;
*/