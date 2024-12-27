"use client";
import { useState, type ReactElement } from "react";
import { Button } from "primereact/button";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Event } from "@/lib/validations/event";
import Link from "next/link";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useGetAudience } from "@/lib/api/audience/get-audience";
import { useDeleteAudience } from "@/lib/api/audience/delete-audience";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/search-input";

export default function AudienceGroupPage(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });
  const { data, isLoading, isFetching } = useGetAudience({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const dataTable = data?.data;
  const deleteEvent = useDeleteAudience();

  const columns = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "totalAudience", header: "Total Audience" },
    { field: "action", header: "Action" },
  ];

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
        <Link href={`/audience-group/edit/${rowData.id}`}>
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
          <Link href="/audience-group/add">
            <Button className="border-round-sm" outlined>
              Add
            </Button>
          </Link>
        </div>
        <SearchInput className="tw-w-1/4" />
      </div>
      <DataTable
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
        {columns.map((col) => (
          <Column
            body={col.field === "action" && actionBodyTemplate}
            field={col.field}
            header={col.header}
            key={col.field}
          />
        ))}
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
