"use client";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IData {
  name: string;
  value: string;
}

const OrderByMonthChart = ({
  label,
  data,
}: {
  label: string;
  data: IData[];
}) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="name" stroke="hsl(var(--primary))"/>
        <YAxis stroke="hsl(var(--primary))"/>
        <Tooltip />
        <Legend />
        <Bar name={label} dataKey="value" stroke="hsl(var(--primary))"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderByMonthChart;
