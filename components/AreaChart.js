import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Fev',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mars',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Avr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Mai',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Juin',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Juil',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ChartArea() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#562731" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#562731" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffa627" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffa627" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" scale="point" tickLine={false} axisLine={false} padding={{ left: 2, right: 2 }} />
        {/* <YAxis tickLine={false} axisLine={false} /> */}
        <Tooltip />
        <Area type="monotone" dataKey="pv" stroke="#562731" fill="url(#colorUv)"/>
        <Area type="monotone" dataKey="uv" stroke="#ffa627" fill="url(#colorPv)"/>
      </AreaChart>
    </ResponsiveContainer>
  );
};