"use client";

import { pingURL } from "@/actions/ping";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface DashboardCardProps {
  url: string;
}

export default function DashboardCard({ url }: DashboardCardProps) {
  const [status, setStatus] = useState("Checking...");
  const [responseTime, setResponseTime] = useState<number>();

  useEffect(() => {
    const ping = async () => {
      try {
        const { status, time } = await pingURL(url);
        setResponseTime(time);
        setStatus(status);
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
        Status: {status} <br />
        Response: {responseTime?.toFixed(0)} ms
      </CardContent>
    </Card>
  );
}
