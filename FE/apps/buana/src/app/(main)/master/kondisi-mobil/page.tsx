"use client";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import type { DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import type { ReactElement } from "react";
import React, { useState } from "react";
import SearchInput from "@/src/components/ui/search-input-form";
import { useSearchParams } from "next/navigation";
import { useGetKondisiMobilQuery } from "@/src/services/master/kondisi-mobil/tanstack/use-get-kondisi-mobil-query";
import { Checkbox } from "primereact/checkbox";
import { KMDialogForm } from "./dialog-form/km-dialog-form";
import { KMDialogDeleteConfirmation } from "./dialog-form/km-dialog-delete-confirmation";

function KondisiMobil(): ReactElement {
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading } = useGetKondisiMobilQuery({
    pageIndex: (tableState.page ?? 0) + 1,
    limit: tableState.rows,
    search: search ?? "",
    orderBy: 'created_at',
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


  const renderHeader = (): ReactElement => {
    return (
      <div className="flex justify-content-between">
        <div className="flex gap-2">
          <Button
            icon="pi pi-plus"
            label="Tambah"
            severity="success"
            onClick={() => {
              handleAdd();
            }}
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

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h4>Master Kondisi Mobil</h4>
          <DataTable
            className="datatable-responsive"
            dataKey="id"
            emptyMessage="Tidak ada data ditemukan."
            filterDisplay="menu"
            filters={filters}
            header={header}
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
            lazy
            paginator
            first={tableState.first}
            rows={tableState.rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            totalRecords={data?.total}
            value={data?.data}
          >
            <Column
              header="Actions"
              body={(rowData) => (
                <div className="flex gap-2 justify-content-center" style={{maxWidth: '7rem'}}>
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="info"
                    onClick={() => {
                      handleEdit(rowData.id);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => {
                      handleDelete(rowData.id);
                    }}
                  />
                </div>
              )}
            />
            <Column field="cac_name" header="Nama Kondisi" style={{ minWidth: "20rem" }} />

            <Column
              field="cac_is_default"
              header="Default ? "
              style={{ minWidth: "2rem" }}
              body={(rowData) => (
                <div className="flex justify-content-center">
                  <Checkbox checked={rowData.cac_is_default} readOnly />
                </div>
              )}
            />
            <Column
              field="cac_is_active"
              header="Aktif ?"
              body={(rowData) => (
                <div className="flex justify-content-center">
                  <Checkbox checked={rowData.cac_is_active} readOnly />
                </div>
              )}
              style={{ minWidth: "2rem" }}
            />
          </DataTable>

          <KMDialogForm
              visible={dialogVisible}
              edit={edit}
              selectedId={selectedId}
              onHide={() => setDialogVisible(false)}
            />

          <KMDialogDeleteConfirmation
            visible={deleteDialogVisible}
            onHide={() => setDeleteDialogVisible(false)}
            selectedId={selectedId}
          />
        </div>
      </div>
    </div>
  );
}

export default KondisiMobil;
