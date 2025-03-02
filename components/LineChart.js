// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Badge } from 'flowbite-react';
import { Rabbit } from 'lucide-react';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Ventes',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: '#ff9677',
      tension: 0.1,
    },
  ],
};
const LineChart = () => {
  return (
    <div>
      <Badge className='mb-2' icon={Rabbit} size='md' color='black'>Listes des derniers lapins ajoutés</Badge>
      <Line data={data} />
    </div>
  );
};
export default LineChart;