"use client";

import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import type {DataTableFilterMeta} from "primereact/datatable";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import type {ReactElement} from "react";

export default function ServiceAdvisorPage(): ReactElement {

    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(false); // Changed to false initially
    const [globalFilterValue, setGlobalFilterValue] = useState("");


    const customers = [
        {
            id: 1,
            customer_name: "John Doe",
            vehicle: "Toyota Camry",
            arrival: "2023-10-23", // Changed to string
            status: "Pending"
        },
        {
            id: 2,
            customer_name: "Jane Smith",
            vehicle: "Honda Accord",
            arrival: "2023-10-20", // Changed to string
            status: "Completed"
        },
        {
            id: 3,
            customer_name: "Alice Brown",
            vehicle: "Ford F-150",
            arrival: "2023-10-21", // Changed to string
            status: "In Progress"
        },
        {
            id: 4,
            customer_name: "Robert Johnson",
            vehicle: "Chevrolet Tahoe",
            arrival: "2023-10-19",
            status: "Pending"
        },
        {
            id: 5,
            customer_name: "Emily Davis",
            vehicle: "Nissan Altima",
            arrival: "2023-10-18",
            status: "Completed"
        },
        {
            id: 6,
            customer_name: "Michael Wilson",
            vehicle: "BMW 3 Series",
            arrival: "2023-10-17",
            status: "In Progress"
        },
        {
            id: 7,
            customer_name: "Jessica Taylor",
            vehicle: "Subaru Outback",
            arrival: "2023-10-16",
            status: "Pending"
        },
        {
            id: 8,
            customer_name: "David Martinez",
            vehicle: "Mazda CX-5",
            arrival: "2023-10-15",
            status: "Completed"
        },
        {
            id: 9,
            customer_name: "Sarah Thomas",
            vehicle: "Kia Sorento",
            arrival: "2023-10-14",
            status: "In Progress"
        },
        {
            id: 10,
            customer_name: "Daniel Garcia",
            vehicle: "Audi A4",
            arrival: "2023-10-13",
            status: "Pending"
        },
        {
            id: 11,
            customer_name: "Laura Hernandez",
            vehicle: "Volkswagen Jetta",
            arrival: "2023-10-12",
            status: "Completed"
        },
        {
            id: 12,
            customer_name: "Matthew Rodriguez",
            vehicle: "Hyundai Elantra",
            arrival: "2023-10-11",
            status: "In Progress"
        },
        {
            id: 13,
            customer_name: "Sophia Lee",
            vehicle: "Toyota RAV4",
            arrival: "2023-10-10",
            status: "Pending"
        },
        {
            id: 14,
            customer_name: "James Anderson",
            vehicle: "Honda Civic",
            arrival: "2023-10-09",
            status: "Completed"
        },
        {
            id: 15,
            customer_name: "Olivia Scott",
            vehicle: "Ford Explorer",
            arrival: "2023-10-08",
            status: "In Progress"
        }
    ];


    const clearFilter = (): void => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const _filters = {...filters};
        (_filters.global as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = (): ReactElement => {
        return (
            <div className="flex justify-content-between">
                <div className="flex gap-2">
                    <Button
                        icon="pi pi-plus"
                        label="Tambah"
                        onClick={() => {
                            window.location.href = "/service-advisor/customer-visit";
                        }}
                        severity="success"
                    />
                </div>
                <div>
                    <span className="p-input-icon-left mr-2">
                        <i className="pi pi-search"/>
                        <InputText
                            onChange={onGlobalFilterChange}
                            placeholder="Keyword Search"
                            value={globalFilterValue}
                        />
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

    const initFilters = (): void => {
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS},
            customer_name: {
                operator: FilterOperator.AND,
                constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
            },
            vehicle: {
                operator: FilterOperator.AND,
                constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
            },
            arrival: {
                operator: FilterOperator.AND,
                constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}],
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
            }
        });
        setGlobalFilterValue("");
    };

    const header = renderHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Penerimaan Pelanggan</h4>
                    <DataTable
                        className="p-datatable-gridlines"
                        dataKey="id"
                        emptyMessage="No customers found."
                        filterDisplay="menu"
                        filters={filters}
                        header={header}
                        loading={loading}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        value={customers}
                    >
                        <Column
                            body={ActionButton}
                            header="Actions"
                        />
                        <Column
                            field="customer_name"
                            filter
                            filterPlaceholder="Search by name"
                            header="Nama Pelanggan"
                            style={{minWidth: "12rem"}}
                        />
                        <Column
                            field="vehicle"
                            filter
                            filterPlaceholder="Search by vehicle"
                            header="Kendaraan"
                            style={{minWidth: "12rem"}}
                        />
                        <Column
                            field="arrival"
                            filter
                            filterPlaceholder="Search by arrival"
                            header="Kedatangan"
                            style={{minWidth: "10rem"}}
                        />
                        <Column
                            field="status"
                            filter
                            filterPlaceholder="Search by status"
                            header="Status Pengerjaan"
                            style={{minWidth: "10rem"}}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}


function ActionButton(): ReactElement {
    return <div className="flex gap-2 justify-content-center">
        <Button
            icon="pi pi-pencil"
            onClick={() => {
                // Handle edit action
            }}
            outlined
            rounded
            severity="info"
        />
        <Button
            icon="pi pi-trash"
            onClick={() => {
                // Handle delete action
            }}
            outlined
            rounded
            severity="danger"
        />
    </div>;
}