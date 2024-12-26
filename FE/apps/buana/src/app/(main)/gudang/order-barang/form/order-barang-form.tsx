
"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import type { DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { useState, type ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetBarangMelekatQuery } from "@/src/services/master/barang-melekat/tanstack/use-get-barang-melekat-query";
import type { UpsertBarangMelekatSchema } from "@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema";
import { ActionButtonHelper } from "@/src/components/helper/action-button-helper";
import { TableHeaderHelper } from "@/src/components/helper/table-header-helper";
import Input from "@/src/components/ui/input-form";
import CalendarInput from "@/src/components/ui/calendar-input";
import TextArea from "@/src/components/ui/text-area";
import Dropdown from "@/src/components/ui/dropdown";
import { useGetSupplierQuery } from "@/src/services/master/supplier/tanstack/use-get-supplier-query";
import MultiSelect from "@/src/components/ui/multi-select";
import type { UpsertOrderBarangSchema } from "@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema";
import { upsertOrderBarangSchema } from "@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema";

function OrderBarangForm(): ReactElement {

    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const searchParams = useSearchParams();
    const search = searchParams?.get("search");
    const [tableState, setTableState] = useState<DataTablePageEvent>({
        first: 0,
        page: 0,
        rows: 10,
    });

    const defaultValues: UpsertOrderBarangSchema = {
        supplier_id: null,
        order_date: new Date().toISOString(),
        products: null,
        note: null,
    };

    const {data, isLoading} = useGetBarangMelekatQuery({
        pageIndex: (tableState.page ?? 0) + 1,
        limit: tableState.rows,
        search: search ?? "",
        orderBy: 'updated_at',
        sortDir: 'desc',
    });


    const methods = useForm<UpsertOrderBarangSchema>({
        resolver: zodResolver(upsertOrderBarangSchema),
        values: defaultValues,
        resetOptions: {
          keepDirtyValues: true,
        },
      });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit((data) => {
        console.log('Submit data:', data);
    });


    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<string[]>([]);

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

    const actionBodyTemplate = (rowData: UpsertOrderBarangSchema) => {
        return (
            <ActionButtonHelper
                id={rowData.id ?? ''}
                onDelete={() => { handleDelete(rowData.id ?? ''); }}
                onEdit={() => { handleEdit(rowData.id ?? ''); }}
            />
        );
    };

    const header = <TableHeaderHelper onAdd={handleAdd} onClearFilter={clearFilter} />;

    const { data: supplier, isLoading: isLoadingSupplier } = useGetSupplierQuery({
        pageIndex: (tableState.page ?? 0) + 1,
        limit: tableState.rows,
        search: search ?? "",
        orderBy: 'updated_at',
        sortDir: 'desc',
    });

    const supplierOptions = supplier?.data?.map((item) => ({
        label: item.s_name,
        value: item.id,
    }));

    return (
        <FormProvider {...methods}>
            <form 
            key="order-barang-form"
            onSubmit={(e) => {
                e.preventDefault();
                void onSubmit();
            }}>
                <div>
                    <div className="field">
                        <Input
                            disabled
                            id="generated_code"
                            label="Kode"
                            placeholder="Generated"
                            value="Generated"
                        />
                    </div>
                    <div className="field">
                        <CalendarInput
                            icon
                            id="generated_code"
                            label="Tanngal PO."
                            placeholder="Pilih Tanggal"
                            showIcon
                            value="Generated"
                        />
                    </div>
                    <div className="field">
                        <Dropdown
                            filter
                            filterBy="label"
                            filterPlaceholder="Cari supplier..."
                            id="supplier_id" 
                            label="Supplier"
                            loading={isLoadingSupplier}
                            options={supplierOptions ?? []}
                            placeholder="Pilih Supplier"
                            showClear
                            value="Generated"
                        />
                    </div>

                    <div className="field">
                        <DataTable
                            className="p-datatable p-datatable-gridlines"
                            dataKey="id"
                            emptyMessage="Tidak ada data ditemukan."
                            filterDisplay="menu"
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
                            rows={tableState.rows}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            totalRecords={data?.total}
                            value={data?.data}
                        >
                            <Column
                                body={actionBodyTemplate}
                                header="Actions"
                                style={{ "width": "3rem" }}
                            />
                            <Column field="code" header="Kode"  />
                            <Column field="ati_name" header="Nama"  />
                            <Column field="" header="Part Number"  />
                            <Column field="" header="Merek"  />
                            <Column field="" header="Qty Order"  />
                            <Column field="" header="Satuan"  />
                        </DataTable>
                    </div>
                    <div className="field">
                        <TextArea
                            className="field"
                            id="note"
                            label="Catatan"
                            placeholder="Catatan"
                            value="Catatan"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="submit">Submit</Button>
                        <Button type="button">Print Order</Button>
                        <Button type="button">Print Kode Baru</Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

export default OrderBarangForm;
