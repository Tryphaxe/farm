import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Fev',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mars',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Avr',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Mai',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Juin',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Juil',
    pv: 4300,
    amt: 2100,
  },
];

export default function Graphome() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
        barSize={15}
        barGap={5}
      >
        <XAxis dataKey="name" scale="point" tickLine={false} axisLine={false} padding={{ left: 2, right: 2 }} />
        <Tooltip />
        <Legend />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Bar dataKey="pv" fill="#562731" background={{ fill: "#e0e0e0" }}/>
      </BarChart>
    </ResponsiveContainer>
  );
}