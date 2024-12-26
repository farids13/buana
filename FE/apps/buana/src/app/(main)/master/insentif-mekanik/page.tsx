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
import { useGetInsentifMekanikQuery } from "@/src/services/master/insentif-mekanik/tanstack/use-get-insentif-mekanik-query";
import { IMDialogForm } from "./dialog-form/im-dialog-form";
import { IMDialogDeleteConfirmation } from "./dialog-form/im-dialog-delete-confirmation";
import { InsentifMekanikEnum } from "@/src/lib/enum/master/insentif-mekanik-enum";

function InsentifMekanik(): ReactElement {
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading } = useGetInsentifMekanikQuery({
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

  const formatCurrency = (value: number) => {
    if (!value || isNaN(value)) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    if (!value || isNaN(value)) return '0%';
    return new Intl.NumberFormat('id-ID', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value / 100);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h4>Master Insentif Mekanik</h4>
          <DataTable
            className="p-datatable"
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
                <div className="flex gap-2 justify-content-center">
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
            <Column field="ins_code" header="Kode Barang" style={{ minWidth: "20rem" }} />

            <Column
              field="ins_type"
              header="Type"
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="ins_value"
              header="Nilai"
              body={(rowData) => {
                if (rowData.ins_type === InsentifMekanikEnum.PERSEN) {
                  return formatPercentage(Number(rowData.ins_value));
                } else {
                  return formatCurrency(Number(rowData.ins_value));
                }
              }}
              style={{ minWidth: "2rem" }}
            />
          </DataTable>

          <IMDialogForm
              visible={dialogVisible}
              edit={edit}
              selectedId={selectedId}
              onHide={() => setDialogVisible(false)}
            />

          <IMDialogDeleteConfirmation
            visible={deleteDialogVisible}
            onHide={() => setDeleteDialogVisible(false)}
            selectedId={selectedId}
          />
        </div>
      </div>
    </div>
  );
}

export default InsentifMekanik;
