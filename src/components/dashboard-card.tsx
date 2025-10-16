"use client";

import { pingURL } from "@/actions/ping";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  time: {
    label: "Response Time (ms)",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

interface DashboardCardProps {
  url: string;
}

export default function DashboardCard({ url }: DashboardCardProps) {
  const [status, setStatus] = useState("Checking...");
  const [responseTime, setResponseTime] = useState<number>();
  const [history, setHistory] = useState<{ id: number; time: number }[]>([]);
  const counter = useRef(1);

  useEffect(() => {
    // let counter = 1;
    const ping = async () => {
      try {
        const { status, time } = await pingURL(url);
        setResponseTime(time);
        setStatus(status);

        setHistory((prev) => {
          const newData = [...prev, { id: counter.current++, time }];
          return newData.slice(-10);
        });
      } catch {
        setStatus("Down");
      }
    };
    ping();

    const interval = setInterval(ping, 5000);
    return () => clearInterval(interval);
  }, [url]);

  return (
    <Card className="w-full max-w-md h-fit">
      <CardHeader>
        <CardTitle>{url}</CardTitle>
        <CardAction>
          {status === "Up" ? (
            <div className="w-4 h-4 rounded-full bg-green-500" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-red-500" />
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="mb-5">
          Status: {status} <br />
          Response: {responseTime?.toFixed(0)} ms
        </div>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={history}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="id"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `#${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="time"
              stroke={chartConfig.time.color}
              strokeWidth={2}
              dot={false}
              type="monotone"
            />
            {/* <Bar dataKey="time" fill={chartConfig.time.color} radius={4} /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
