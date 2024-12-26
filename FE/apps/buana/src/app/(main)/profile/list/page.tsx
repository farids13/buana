"use client";
import {useRouter} from "next/navigation";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import type {DataTableFilterMeta} from "primereact/datatable";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {ProgressBar} from "primereact/progressbar";
import type {ReactElement} from "react";
import React, {useEffect, useRef, useState} from "react";
import {CustomerService} from "@/src/demo/service/customer-service";
import type {Demo} from "@/types/types";

function List(): ReactElement {
  const [customers, setCustomers] = useState<Demo.Customer[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const router = useRouter();
  const dt = useRef(null);

  const getCustomers = (data: Demo.Customer[]): Demo.Customer[] => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const formatDate = (value: Date): string => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const clearFilter = (): void => {
    initFilters();
  };

  const initFilters = (): void => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      name: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
      },
      representative: {value: null, matchMode: FilterMatchMode.IN},
      date: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}],
      },
      activity: {value: null, matchMode: FilterMatchMode.BETWEEN},
    });
    setGlobalFilterValue("");
  };

  useEffect(() => {
    CustomerService.getCustomersLarge()
      .then((data) => {
        setCustomers(getCustomers(data));
        setLoading(false);
      })
      .catch(() => ({}));
    initFilters();
  }, []);

  const onGlobalFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {value} = e.target;
    const _filters = {...filters};
    (_filters.global as any).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = (): ReactElement => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
          <i className="pi pi-search" />
          <InputText
            className="w-full"
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
            value={globalFilterValue}
          />
        </span>
        <Button
          className="w-full sm:w-auto flex-order-0 sm:flex-order-1"
          icon="pi pi-user-plus"
          label="Add New"
          onClick={() => {
            router.push("/profile/create");
          }}
          outlined
          type="button"
        />
      </div>
    );
  };

  const nameBodyTemplate = (customer: Demo.Customer): ReactElement => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {customer.name}
      </>
    );
  };

  const countryBodyTemplate = (customer: Demo.Customer): ReactElement => {
    return (
      <>
        <img
          alt={customer.country?.name}
          className={`w-2rem mr-2 flag flag-${customer.country?.code}`}
          src="/demo/images/flag/flag_placeholder.png"
        />
        <span className="image-text">{customer.country?.name}</span>
      </>
    );
  };

  const createdByBodyTemplate = (customer: Demo.Customer): ReactElement => {
    return (
      <div className="inline-flex align-items-center">
        <img
          alt={customer.representative.name}
          className="w-2rem mr-2"
          src={`/demo/images/avatar/${customer.representative.image}`}
        />
        <span>{customer.representative.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = (customer: Demo.Customer): string => {
    return formatDate(customer.date);
  };

  const activityBodyTemplate = (customer: Demo.Customer): ReactElement => {
    return (
      <ProgressBar
        showValue={false}
        style={{height: ".5rem"}}
        value={customer.activity}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        filters={filters}
        header={header}
        loading={loading}
        paginator
        ref={dt}
        responsiveLayout="scroll"
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        value={customers}
      >
        <Column
          body={nameBodyTemplate}
          field="name"
          header="Name"
          headerClassName="white-space-nowrap"
          sortable
          style={{width: "25%"}}
        />
        <Column
          body={countryBodyTemplate}
          field="country.name"
          header="Country"
          headerClassName="white-space-nowrap"
          sortable
          style={{width: "25%"}}
        />
        <Column
          body={dateBodyTemplate}
          field="date"
          header="Join Date"
          headerClassName="white-space-nowrap"
          sortable
          style={{width: "25%"}}
        />
        <Column
          body={createdByBodyTemplate}
          field="representative.name"
          header="Created By"
          headerClassName="white-space-nowrap"
          sortable
          style={{width: "25%"}}
        />
        <Column
          body={activityBodyTemplate}
          field="activity"
          header="Activity"
          headerClassName="white-space-nowrap"
          sortable
          style={{width: "25%"}}
        />
      </DataTable>
    </div>
  );
}

export default List;
