"use client";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import type { DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import { ModelMobilDialogForm } from "./dialog-form/model-mobil-dialog-form";
import { ModelMobilDialogDeleteConfirmation } from "./dialog-form/model-mobil-dialog-delete-confirmation";
import { useGetModelByMerekMobilIdQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-get-model-by-merek-mobil-query";
import SearchInput from "@/src/components/ui/search-input-form";

function ModelMobil(): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

    const { data, isLoading } = useGetModelByMerekMobilIdQuery(id, {
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
            <Column field="cm_name" header="Nama Model Mobil" style={{ minWidth: "20rem" }} />
            <Column
              field="cm_is_active"
              header="Aktif ?"
              body={(rowData) => (
                <div className="flex justify-content-center">
                  <Checkbox checked={rowData.cm_is_active} readOnly />
                </div>
              )}
              style={{ minWidth: "2rem" }}
            />
          </DataTable>

          <ModelMobilDialogForm
              edit={edit}
              merekMobilId={id}
              onHide={() => { setDialogVisible(false); }}
              selectedId={selectedId}
              visible={dialogVisible}
            />

          <ModelMobilDialogDeleteConfirmation
            onHide={() => { setDeleteDialogVisible(false); }}
            selectedId={selectedId}
            visible={deleteDialogVisible}
          />
        </div>
      </div>
    </div>
  );
}

export default ModelMobil;