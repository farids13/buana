"use client"

import type { ReactElement } from "react";
import React, { useRef } from "react";
import TimeManagement from "~/svg/time-management.svg";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Toast } from 'primereact/toast';
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import { truncateText } from "@/utils/string-utils";
import { Chart } from "primereact/chart";
import type { ChartData, ChartOptions } from "chart.js";

const Dashboard = (): ReactElement => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const { data } = useGetUserDetail();

  // Data dummy untuk grafik
  const chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Members',
        data: [5, 8, 12, 15, 20, 25],
        fill: true,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return;
          
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
      }
    ]
  };

  const chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('Member Growth'),
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
        ticks: {
          precision: 0
        },
        title: {
          display: true,
          text: t('Total Members'),
        },
      },
    },
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12 -tw-mb-5">
        <div className="card tw-flex tw-justify-between tw-relative tw-h-[280px]">
          <div className="tw-space-y-2 tw-flex tw-flex-col tw-min-h-full tw-w-full tw-min-w-max tw-p-6 tw-pt-10 tw-overflow-hidden">
            <h1 className="tw-text-[64px] max-sm:tw-text-[25px] max-sm:tw-text-center max-2xl:tw-text-[38px]">{t(`Hi, ${truncateText(data?.name, 25)}`)}</h1>
            <h4 className="tw-font-light tw-pt-2 max-sm:tw-text-center">{t('Welcome to Dashboard Buana!')}</h4>
          </div>
          <TimeManagement className="tw-max-w-xs tw-absolute tw-right-10 -tw-top-12 max-xl:tw-hidden " />
        </div>
      </div>
      <div className="col-12">
        <div className="card tw-h-full">
          <div className="tw-w-full tw-h-[300px]">
            <Chart
              type="line"
              data={chartData}
              options={chartOptions}
              className="tw-w-full tw-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
