"use client";
import { useGetEventCategoryGraph } from "@/lib/api/event-category/get-event-category-graph";
import { truncateText } from "@/utils/string-utils";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { Chart } from "primereact/chart";
import type { ReactElement } from "react";
import React, { useMemo } from "react";

export default function EventCategoryChart(): ReactElement {
  const { data } = useGetEventCategoryGraph();
  const lineData: ChartData = useMemo(() => {
    const labels = data?.map((item) => truncateText(item.name, 20)) ?? [];
    const value = data?.map((item) => item.value) ?? [];

    return {
      labels,
      datasets: [
        {
          label: "Total Events",
          data: value,
          fill: true,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const { ctx, chartArea } = context.chart;

            if (!chartArea) {
              return;
            }

            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top,
            );
            gradient.addColorStop(0, "#F1EDFF00");
            gradient.addColorStop(1, "#F3F0FF");
            return gradient;
          },
          borderColor: "#9854CB",
          tension: 0.4,
        },
      ],
    };
  }, [data]);

  const lineOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Event Categories",
        font: {
          size: 16,
        },
        color: "#000000",
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: true,
        },
        ticks:{
          precision: 0
        },
        title: {
          display: true,
          text: 'Total Events',
        },
      },
    },
  };

  return (
    <Chart
      className="tw-w-full tw-p-4 tw-flex-1 tw-shadow-xl tw-border-2 tw-rounded-xl"
      data={lineData}
      options={lineOptions}
      type="line"
    />
  );
}
