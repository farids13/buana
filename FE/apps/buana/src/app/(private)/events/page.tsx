"use client";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import type { DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { Column, type ColumnFilterElementTemplateOptions } from "primereact/column";
import type { Event } from "@/lib/validations/event";
import Link from "next/link";
import { useGetEvent } from "@/lib/api/event/get-event";
import { useDeleteEvent } from "@/lib/api/event/delete-event";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { classNames } from "primereact/utils";
import { RiDraftLine, RiTodoFill } from "react-icons/ri";
import { BiCheckCircle, BiTimer, BiXCircle } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/search-input";
import { useExportEvent } from "@/lib/api/export/export-event";
import ExportButton from "@/components/cards/export-button";
import { useTranslation } from "react-i18next";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import moment from "moment";

export default function Events(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const phase = searchParams?.get("phase");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phase: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const phaseValue = (filters.phase as any).value;
  const filter = { phase: phaseValue };

  const { data, isLoading, isFetching, refetch } = useGetEvent({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
    filterBy: JSON.stringify(filter),
  });

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      phase: { value: phase, matchMode: FilterMatchMode.EQUALS }
    }));
  }, [])

  useEffect(() => {
    void refetch();
  }, [filters]);


  const dataTable = data?.data;
  const deleteEvent = useDeleteEvent();
  const exportEvent = useExportEvent({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const { t } = useTranslation();


  const getSeverity = (status: string) => {
    switch (status) {
      case 'PRE':
        return 'warning';

      case 'ONGOING':
        return 'info';

      case 'POST':
        return 'success';

      case 'renewal':
        return null;
    }
  };
  const statusItemTemplate = (option: string) => {
    return <Tag
      severity={getSeverity(option)}
      value={option}
    />;
  };

  const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        className="p-column-filter"
        itemTemplate={statusItemTemplate}
        onChange={(e: DropdownChangeEvent) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            phase: { matchMode: FilterMatchMode.EQUALS, value: e.value }
          }));
          options.filterApplyCallback(e.value);
        }}
        options={["PRE", "ONGOING", "POST"]}
        placeholder="Select One"
        showClear
        style={{ minWidth: '7rem' }}
        value={options.value}
      />

    );
  };


  const statusBodyTemplate = (rowData: Event) => {
    const status = () => {
      if (rowData.status === "ACTIVE") {
        return "p-tag-success";
      }
      if (rowData.status === "INACTIVE") {
        return "p-tag-danger";
      }

      return "p-tag-warning";
    };
    return (
      <span
        className={classNames(
          "p-tag border-round-md tw-flex tw-items-center tw-justify-center tw-gap-1",
          status(),
        )}
      >
        {rowData.status === "ACTIVE" && <BiCheckCircle size={14} />}
        {rowData.status === "DRAFT" && <RiDraftLine size={14} />}
        {rowData.status === "INACTIVE" && <BiXCircle size={14} />}
        {rowData.status}
      </span>
    );
  };
  const statusPhase = (rowData: Event) => {
    return (
      <span className={`p-tag border-round-md tw-flex tw-items-center tw-justify-center tw-gap-1 ${rowData.phase === "PRE" && "p-tag-warning" || rowData.phase === "ONGOING" && "p-tag-info" || rowData.phase === "POST" && "p-tag-success"}`}>
        {rowData.phase === "PRE" && <RiTodoFill size={14} />}
        {rowData.phase === "ONGOING" && <BiTimer size={14} />}
        {rowData.phase === "POST" && <BiCheckCircle size={14} />}
        {rowData.phase}
      </span>
    )
  }
  const actionBodyTemplate = (rowData: Event) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteEvent.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/events/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/events/add">
            <Button className="border-round-sm" outlined>
              {t('Add Events')}
            </Button>
          </Link>
          <ExportButton
            action={exportEvent.mutate}
            className="border-round-sm"
          />
        </div>
        <SearchInput className="tw-w-1/4" />
      </div>
      <DataTable
        filters={filters}
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
        <Column body={actionBodyTemplate} field="action" header={t("Action")} />
        <Column field="eventName" header={t("Event Name")} />
        <Column body={(p: Event) => p.eventCategoryName || "-"} field="eventCategoryName" header={t("Category")} />
        <Column body={(p: Event) => moment(p.startAt).format("DD-MM-YYYY, HH:mm")} field="startAt" header={t("Start")} style={{ minWidth: "12rem" }} />
        <Column body={(p: Event) => moment(p.endAt).format("DD-MM-YYYY, HH:mm")} field="endAt" header={t("End")} style={{ minWidth: "12rem" }} />
        <Column body={statusBodyTemplate} field="status" header={t("Status")} />
        <Column
          body={statusPhase}
          field="phase"
          filter
          filterElement={statusRowFilterTemplate}
          filterField="phase"
          filterMenuStyle={{ width: '14rem' }}
          filterPlaceholder="Phase"
          header={t("Phase")}
          showClearButton={false}
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
        />

      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
