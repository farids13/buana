"use client";
import {Button} from "primereact/button";
import {Chart} from "primereact/chart";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import type {ItemTemplateOptions} from "primereact/fileupload";
import {FileUpload} from "primereact/fileupload";
import {Menu} from "primereact/menu";
import {Toast} from "primereact/toast";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import type {ChartData, ChartOptions, Plugin} from "chart.js";
import {nanoid} from "nanoid";
import {FileService} from "@/src/demo/service/file-service";
import {LayoutContext} from "@/src/layout/context/layout-context";
import type {Demo} from "@/types/types";

export default function Files(): ReactElement {
  const [files, setFiles] = useState<Demo.File[]>([]);
  const [metrics, setMetrics] = useState<Demo.Metric[]>([]);
  const [folders, setFolders] = useState<Demo.BaseFolder[]>([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartPlugin, setChartPlugin] = useState({});
  const layoutConfig = useContext(LayoutContext);
  const fileUploader = useRef<FileUpload>(null);
  const toast = useRef<Toast>(null);
  const menu = useRef<Menu>(null);
  const dt = useRef<DataTable<Demo.File[]>>(null);

  const menuItems = [
    {label: "View", icon: "pi pi-search"},
    {label: "Refresh", icon: "pi pi-refresh"},
  ];

  const nameBodyTemplate = (rowData): ReactElement => {
    return (
      <div className="flex align-items-center">
        <i className={`text-xl text-primary mr-2 ${rowData.icon}`} />
        <span>{rowData.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: Demo.File): ReactElement => {
    return <span>{rowData.date}</span>;
  };

  const fileSizeBodyTemplate = (rowData: Demo.File): ReactElement => {
    return <span>{rowData.fileSize}</span>;
  };

  const uploadBodyCenter = (): ReactElement => {
    return (
      <div className="text-center">
        <Button
          className="mr-2"
          icon="pi pi-times"
          rounded
          severity="danger"
          text
        />
        <Button icon="pi pi-search" rounded text />
      </div>
    );
  };
  const onFileUploadClick = (): void => {
    const inputEl = fileUploader.current?.getInput();
    inputEl?.click();
  };

  const itemTemplate = (
    file: object,
    props: ItemTemplateOptions
  ): ReactElement => {
    const buttonEl = createRef<Button>();
    const fileObject = file as Demo.File;

    const onImageMouseOver = (
      button: React.RefObject<Button | HTMLButtonElement>
    ): void => {
      if (button.current) {
        (button.current as HTMLButtonElement).style.display = "flex";
      }
    };

    const onImageMouseLeave = (
      button: React.RefObject<Button | HTMLButtonElement>
    ): void => {
      if (button.current) {
        (button.current as HTMLButtonElement).style.display = "none";
      }
    };

    return (
      <div
        className="w-full py-3"
        onClick={onFileUploadClick}
        style={{cursor: "copy"}}
      >
        <div
          className="h-full relative w-7rem h-7rem border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto"
          onMouseEnter={() => {
            onImageMouseOver(buttonEl);
          }}
          onMouseLeave={() => {
            onImageMouseLeave(buttonEl);
          }}
          style={{padding: "1px"}}
        >
          <img
            alt={fileObject.name}
            className="w-full h-full border-round shadow-2"
            src={fileObject.objectURL}
          />
          <Button
            className="hover:flex text-sm absolute justify-content-center align-items-center cursor-pointer"
            icon="pi pi-times"
            id={fileObject.name}
            onClick={(event) => {
              event.stopPropagation();
              props.onRemove(event);
            }}
            ref={buttonEl}
            rounded
            style={{top: "-10px", right: "-10px", display: "none"}}
            type="button"
          />
        </div>
      </div>
    );
  };

  const emptyTemplate = (): ReactElement => {
    return (
      <div
        className="w-full py-3"
        onClick={onFileUploadClick}
        style={{cursor: "copy"}}
      >
        <div className="h-full flex flex-column justify-content-center align-items-center">
          <i className="pi pi-upload text-900 text-2xl mb-3" />
          <span className="font-bold text-900 text-xl mb-3">Upload Files</span>
          <span className="font-medium text-600 text-md text-center">
            Drop or select files
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    FileService.getFiles()
      .then((_files) => {
        setFiles(_files);
      })
      .catch(() => ({}));
    FileService.getMetrics()
      .then((_metrics) => {
        setMetrics(_metrics);
      })
      .catch(() => ({}));
    FileService.getFoldersLarge()
      .then((_folders) => {
        setFolders(_folders);
      })
      .catch(() => ({}));
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const _chartPlugin: Plugin<"doughnut"> = {
      id: "chartPlugin",
      beforeDraw(chart) {
        if (chart.config.data.datasets.length <= 0) return;
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const fontSize = 1.5;
        const oldFill = ctx.fillStyle;

        ctx.restore();
        ctx.font = `${fontSize}rem sans-serif`;
        ctx.textBaseline = "middle";

        const text = "Free Space";
        const text2 = `${50}GB / ${80}GB`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = (height + chart.chartArea.top) / 2.25;

        const text2X = Math.round((width - ctx.measureText(text).width) / 2.1);
        const text2Y = (height + chart.chartArea.top) / 1.75;

        ctx.fillStyle = chart.config.data.datasets[0].backgroundColor as string;
        ctx.fillText(text, textX, textY);
        ctx.fillText(text2, text2X, text2Y);
        ctx.fillStyle = oldFill;
        ctx.save();
      },
    };

    const fileChart: ChartData = {
      datasets: [
        {
          data: [300, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--primary-600"),
            documentStyle.getPropertyValue("--primary-100"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--primary-700"),
            documentStyle.getPropertyValue("--primary-200"),
          ],
          borderColor: "transparent",
          fill: true,
        },
      ],
    };

    const fileChartOptions: ChartOptions<"doughnut"> = {
      animation: {
        duration: 0,
      },
      responsive: true,
      maintainAspectRatio: false,
      cutout: "90%",
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
    setChartData(fileChart);
    setChartOptions(fileChartOptions);
    setChartPlugin(_chartPlugin);
  }, [layoutConfig]);

  return (
    <div className="grid">
      {metrics.map((metric) => {
        return (
          <div className="col-12 md:col-6 lg:col-3" key={nanoid()}>
            <div className="card h-full">
              <div className="flex align-items-center justify-content-between mb-3">
                <span className="text-900 text-xl font-semibold">
                  {metric.title}
                </span>
                <div>
                  <Button
                    icon={metric.icon}
                    onClick={(event) => menu.current?.toggle(event)}
                    rounded
                    size="small"
                    text
                  />
                  <Menu appendTo="self" model={menuItems} popup ref={menu} />
                </div>
              </div>
              <div>
                <div
                  className={classNames("border-round", metric.color)}
                  style={{height: "6px"}}
                >
                  <div
                    className={classNames(
                      "h-full border-round",
                      metric.fieldColor
                    )}
                    style={{width: "34%"}}
                  />
                </div>
                <div className="flex align-item-center justify-content-between">
                  <span className="text-900 mt-3 text-md font-medium">
                    {metric.files}
                  </span>
                  <span className="text-900 mt-3 text-md font-medium">
                    {metric.fileSize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-12 md:col-5 xl:col-3">
        <div className="card">
          <div className="text-900 text-xl font-semibold mb-3">
            Account Storage
          </div>
          <div className="flex flex-row justify-content-center">
            <Chart
              data={chartData}
              id="country-chart"
              options={chartOptions}
              plugins={[chartPlugin]}
              style={{width: "75%"}}
              type="doughnut"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <Button
              className="flex-1"
              icon="pi pi-search"
              label="Details"
              outlined
            />
            <Button className="flex-1" icon="pi pi-upload" label="Upgrade" />
          </div>
        </div>

        <div className="card">
          <div className="text-900 text-xl font-semibold mb-3">Categories</div>
          <ul className="list-none p-0 m-0">
            <li className="p-3 mb-3 flex align-items-center justify-content-between cursor-pointer border-round bg-indigo-50 text-indigo-900">
              <div className="flex align-items-center">
                <i className="pi pi-image text-2xl mr-3" />
                <span className="ext-lg font-medium">Images</span>
              </div>
              <span className="text-lg font-bold">85</span>
            </li>
            <li className="p-3 mb-3 flex align-items-center justify-content-between cursor-pointer border-round bg-purple-50 text-purple-900">
              <div className="flex align-items-center">
                <i className="pi pi-file text-2xl mr-3" />
                <span className="ext-lg font-medium">Documents</span>
              </div>
              <span className="text-lg font-bold">231</span>
            </li>
            <li className="p-3 flex align-items-center justify-content-between cursor-pointer border-round bg-teal-50 text-teal-900">
              <div className="flex align-items-center">
                <i className="pi pi-video text-2xl mr-3" />
                <span className="ext-lg font-medium">Videos</span>
              </div>
              <span className="text-lg font-bold">40</span>
            </li>
          </ul>
        </div>

        <div className="card p-0">
          <Toast key="fu" ref={toast} />
          <div className="card">
            <FileUpload
              accept="image/*"
              auto
              className="upload-button-hidden w-full"
              customUpload
              emptyTemplate={emptyTemplate}
              invalidFileSizeMessageDetail="Max Size: 1MB"
              invalidFileSizeMessageSummary="Invalid File Size"
              itemTemplate={itemTemplate}
              maxFileSize={1000000}
              multiple
              name="demo[]"
              ref={fileUploader}
              url="./upload.php"
            />
          </div>
        </div>
      </div>
      <div className="col-12 md:col-7 xl:col-9">
        <div className="card">
          <div className="text-900 text-xl font-semibold mb-3">Folders</div>
          <div className="grid">
            {folders.map((folder) => {
              return (
                <div className="col-12 md:col-6 xl:col-4" key={nanoid()}>
                  <div className="p-3 border-1 surface-border flex align-items-center justify-content-between hover:surface-100 cursor-pointer border-round">
                    <div className="flex align-items-center">
                      <i className={classNames("text-2xl mr-3", folder.icon)} />
                      <span className="text-900 text-lg font-medium">
                        {folder.name}
                      </span>
                    </div>
                    <span className="text-600 text-lg font-semibold">
                      {folder.size}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div className="text-900 text-xl font-semibold mb-3">
            Recent Uploads
          </div>
          <DataTable
            paginator
            ref={dt}
            responsiveLayout="scroll"
            rows={8}
            value={files}
          >
            <Column
              body={nameBodyTemplate}
              field="name"
              header="Name"
              headerStyle={{minWidth: "12rem"}}
              sortable
            />
            <Column
              body={dateBodyTemplate}
              field="date"
              header="Date"
              headerClassName="white-space-nowrap"
              headerStyle={{minWidth: "12rem"}}
            />
            <Column
              body={fileSizeBodyTemplate}
              field="fileSize"
              header="File Size"
              headerStyle={{minWidth: "12rem"}}
              sortable
            />
            <Column body={uploadBodyCenter} style={{width: "10rem"}} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
