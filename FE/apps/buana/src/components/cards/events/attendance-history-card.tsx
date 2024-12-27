"use client";
import { Column } from "primereact/column";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { useGetAttendHistory } from "@/lib/api/event/get-attend-history";
import { useParams } from "next/navigation";
import moment, {utc} from "moment";
import type { AttendHistory } from "@/lib/validations/event";
import { useExportAttendanceHistory } from "@/lib/api/export/export-attendance-history";
import ExportButton from "../export-button";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";

export default function AttendaceHistoryCard() {
  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "";

  const [date, setDate] = useState<Date | null>();
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const formattedDate = date ? moment(date).format("YYYY-MM-DD") : undefined;
  const { data, isLoading, isFetching } = useGetAttendHistory(eventId, {
    pageIndex: tableState.page,
    limit: tableState.rows,
    date: formattedDate,
  });
  const dataTable = data?.data;
  const exportAttendHistory = useExportAttendanceHistory(eventId, {
    pageIndex: tableState.page,
    limit: tableState.rows,
    date: formattedDate,
  });

  const dateBodyTemplate = (rowData: AttendHistory) =>
    utc(rowData.attendedAt).format("YYYY-MM-DD");
  
  const {t} = useTranslation();

  return (
    <div className="card tw-space-y-3">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center tw-space-x-4">
          <h4>{t('Attendance History')}</h4>
          <Calendar
            dateFormat="yy-mm-dd"
            onChange={(e) => {
              setDate(e.value);
            }}
            placeholder={t("Filter by date")}
            readOnlyInput
            showButtonBar
            value={date}
          />
        </div>
        <ExportButton action={exportAttendHistory.mutate} outlined />
      </div>
      <DataTable
        emptyMessage={t("No Attendance History")}
        first={tableState.first}
        lazy
        loading={isLoading || isFetching}
        onPage={(e) => {
          setTableState({
            ...tableState,
            page: e.page,
            rows: e.rows,
            pageCount: e.pageCount,
            first: e.first,
          });
        }}
        paginator
        rows={tableState.rows}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
        tableStyle={{ minWidth: "50rem" }}
        totalRecords={data?.total}
        value={dataTable}
      >
        <Column
          body={dateBodyTemplate}
          field="attendedAt"
          header={t("Attended At")}
        />
        <Column field="name" header={t("Name")} />
        <Column field="email" header={t("Email")}/>
        <Column field="phoneNumber" header={t("Phone Number")}/>
        <Column field="job" header={t("Job")} />
        <Column field="description" header={t("Description")}/>
      </DataTable>
    </div>
  );
}
