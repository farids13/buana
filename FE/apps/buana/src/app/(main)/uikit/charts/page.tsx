"use client";
import type {ChartData, ChartOptions} from "chart.js";
import {Chart} from "primereact/chart";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/src/layout/context/layout-context";
import type {ChartDataState, ChartOptionsState} from "@/types/types";

function ChartDemo(): ReactElement {
  const [options, setOptions] = useState<ChartOptionsState>({});
  const [chartData, setChartData] = useState<ChartDataState>({});
  const {layoutConfig} = useContext(LayoutContext);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#212529";
    const textColorSecondary =
      documentStyle.getPropertyValue("--text-color-secondary") || "#6c757d";
    const surfaceBorder =
      documentStyle.getPropertyValue("--surface-border") || "#dee2e6";
    const barData: ChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor:
            documentStyle.getPropertyValue("--primary-500") || "#883cae",
          borderColor:
            documentStyle.getPropertyValue("--primary-500") || "#883cae",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          backgroundColor:
            documentStyle.getPropertyValue("--primary-200") || "#ccabdc",
          borderColor:
            documentStyle.getPropertyValue("--primary-200") || "#ccabdc",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    const barOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: "500",
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
      },
    };

    const pieData: ChartData = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--indigo-500") || "#6610f2",
            documentStyle.getPropertyValue("--purple-500") || "#9c27b0",
            documentStyle.getPropertyValue("--teal-500") || "#009688",
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--indigo-400") || "#833df4",
            documentStyle.getPropertyValue("--purple-400") || "#af50bf",
            documentStyle.getPropertyValue("--teal-400") || "#30aa9f",
          ],
        },
      ],
    };

    const pieOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

    const lineData: ChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--primary-500"),
          borderColor: documentStyle.getPropertyValue("--primary-500"),
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--primary-200"),
          borderColor: documentStyle.getPropertyValue("--primary-200"),
          tension: 0.4,
        },
      ],
    };

    const lineOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
      },
    };

    const polarData: ChartData = {
      datasets: [
        {
          data: [11, 16, 7, 3],
          backgroundColor: [
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--orange-500"),
          ],
          label: "My dataset",
        },
      ],
      labels: ["Indigo", "Purple", "Teal", "Orange"],
    };

    const polarOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    const radarData: ChartData = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "My First dataset",
          borderColor:
            documentStyle.getPropertyValue("--indigo-400") || "#833df4",
          pointBackgroundColor:
            documentStyle.getPropertyValue("--indigo-400") || "#833df4",
          pointBorderColor:
            documentStyle.getPropertyValue("--indigo-400") || "#833df4",
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor:
            documentStyle.getPropertyValue("--indigo-400") || "#833df4",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          borderColor:
            documentStyle.getPropertyValue("--purple-400") || "#8a66cd",
          pointBackgroundColor:
            documentStyle.getPropertyValue("--purple-400") || "#8a66cd",
          pointBorderColor:
            documentStyle.getPropertyValue("--purple-400") || "#8a66cd",
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor:
            documentStyle.getPropertyValue("--purple-400") || "#8a66cd",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    };

    const radarOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary,
          },
        },
      },
    };

    setOptions({
      barOptions,
      pieOptions,
      lineOptions,
      polarOptions,
      radarOptions,
    });
    setChartData({
      barData,
      pieData,
      lineData,
      polarData,
      radarData,
    });
  }, [layoutConfig]);

  return (
    <div className="grid p-fluid">
      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Linear Chart</h5>
          <Chart
            data={chartData.lineData}
            options={options.lineOptions}
            type="line"
          />
        </div>
      </div>
      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Bar Chart</h5>
          <Chart
            data={chartData.barData}
            options={options.barOptions}
            type="bar"
          />
        </div>
      </div>
      <div className="col-12 xl:col-6">
        <div className="card flex flex-column align-items-center">
          <h5 className="text-left w-full">Pie Chart</h5>
          <Chart
            data={chartData.pieData}
            options={options.pieOptions}
            type="pie"
          />
        </div>
      </div>
      <div className="col-12 xl:col-6">
        <div className="card flex flex-column align-items-center">
          <h5 className="text-left w-full">Doughnut Chart</h5>
          <Chart
            data={chartData.pieData}
            options={options.pieOptions}
            type="doughnut"
          />
        </div>
      </div>
      <div className="col-12 xl:col-6">
        <div className="card flex flex-column align-items-center">
          <h5 className="text-left w-full">Polar Area Chart</h5>
          <Chart
            data={chartData.polarData}
            options={options.polarOptions}
            type="polarArea"
          />
        </div>
      </div>
      <div className="col-12 xl:col-6">
        <div className="card flex flex-column align-items-center">
          <h5 className="text-left w-full">Radar Chart</h5>
          <Chart
            data={chartData.radarData}
            options={options.radarOptions}
            type="radar"
          />
        </div>
      </div>
    </div>
  );
}

export default ChartDemo;
