"use client";

import {
  BarChart,
  Bar,
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
  return (
    <ResponsiveContainer width="100%" minHeight={314}>
      <BarChart data={data}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="name" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" />
        <Tooltip />
        <Legend />
        <Bar name={label} dataKey="value" stroke="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderByMonthChart;
