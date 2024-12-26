"use client";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import type { DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useSearchParams } from "next/navigation";
import {  PelangganDialogForm } from "./dialog-form/pelanggan-dialog-form";
import { PelangganDialogDeleteConfirmation } from "./dialog-form/pelanggan-dialog-delete-confirmation";
import SearchInput from "@/src/components/ui/search-input-form";
import { useGetPelangganQuery } from "@/src/services/master/pelanggan/tanstack/use-get-pelanggan-query";
import type { UpsertPelangganSchema } from "@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema";

export default function Pelanggan(): ReactElement {
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading } = useGetPelangganQuery({
    pageIndex: (tableState.page ?? 0) + 1,
    limit: tableState.rows,
    search: search ?? "",
    orderBy: 'updated_at',
    sortDir: 'desc',
  });

  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const clearFilter = (): void => {
    initFilters();
  };

  const initFilters = (): void => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nama: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      is_active: { value: null, matchMode: FilterMatchMode.EQUALS },
      is_default: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
  };

  const handleAdd = () => {
    setDialogVisible(true);
    setEdit(false);
    setSelectedId(null);
  }

  const handleEdit = (id: string) => {
    setDialogVisible(true);
    setEdit(true);
    setSelectedId(id);
  }
  const handleDelete = (id: string) => {
    setDeleteDialogVisible(true);
    setEdit(false);
    setSelectedId(id);
  }

  function checkboxUI(rowData: boolean): React.ReactNode {
    return <div className="flex justify-content-center">
      <Checkbox checked={rowData} readOnly />
    </div>;
  }

  function actionButton(rowData: UpsertPelangganSchema): React.ReactNode {
    return <div className="flex gap-2 justify-content-center">
      <Button
        icon="pi pi-pencil"
        onClick={() => {
          handleEdit(rowData.id ?? '');
        } }
        outlined
        rounded
        severity="info" />
      <Button
        icon="pi pi-trash"
        onClick={() => {
          handleDelete(rowData.id ?? '');
        } }
        outlined
        rounded
        severity="danger" />
    </div>;
  }


  const renderHeader = (): ReactElement => {
    return (
      <div className="flex justify-content-between">
        <div className="flex gap-2">
          <Button
            icon="pi pi-plus"
            label="Tambah"
            onClick={() => {
              handleAdd();
            }}
            severity="success"
          />
        </div>
        <div>
          <span className="p-input-icon-left mr-2">
            <i className="pi pi-search" />
            <SearchInput />
          </span>
          <Button
            icon="pi pi-filter-slash"
            onClick={clearFilter}
            outlined
            type="button"
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  function buttonCarFunction(carId : string): React.ReactNode {
    return ( <div className="flex justify-content-center">
      <Button
        icon="pi pi-car"
        label="Model"
        onClick={() => {
          window.location.href = `/master/pelanggan/mobil/${carId}`;
        } }
        severity="success" />
    </div>);
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h4>Master Pelanggan</h4>
          <DataTable
            className="p-datatable"
            dataKey="id"
            emptyMessage="Tidak ada data ditemukan."
            filterDisplay="menu"
            filters={filters}
            first={tableState.first}
            header={header}
            lazy
            loading={isLoading}
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
            rowsPerPageOptions={[5, 10, 25, 50]}
            totalRecords={data?.total}
            value={data?.data}
          >
            <Column
              body={(rowData : UpsertPelangganSchema) => (
                actionButton(rowData)
              )}
              header="Actions"
              style={{"width" : "3rem"}}
            />
            <Column field="cus_code" header="Kode" />
            <Column field="cus_name" header="Nama" />
            <Column field="cus_address" header="Alamat" />
            <Column field="cus_phone" header="No HP" />

            <Column 
              body={(rowData) => (
                buttonCarFunction(rowData.id as string)
              )}
              style={{ minWidth: "2rem" }}
            />


          </DataTable>

          <PelangganDialogForm
              edit={edit}
              onHide={() => { setDialogVisible(false); }}
              selectedId={selectedId}
              visible={dialogVisible}
            />

          <PelangganDialogDeleteConfirmation
            onHide={() => { setDeleteDialogVisible(false); }}
            selectedId={selectedId}
            visible={deleteDialogVisible}
          />
        </div>
      </div>
    </div>
  );
}
