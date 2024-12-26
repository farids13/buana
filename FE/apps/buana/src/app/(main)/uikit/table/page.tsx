"use client";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import type {
  ColumnFilterApplyTemplateOptions,
  ColumnFilterClearTemplateOptions,
  ColumnFilterElementTemplateOptions,
} from "primereact/column";
import {Column} from "primereact/column";
import type {
  DataTableExpandedRows,
  DataTableFilterMeta,
} from "primereact/datatable";
import {DataTable} from "primereact/datatable";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {ProgressBar} from "primereact/progressbar";
import {Rating} from "primereact/rating";
import {Slider} from "primereact/slider";
import {ToggleButton} from "primereact/togglebutton";
import {TriStateCheckbox} from "primereact/tristatecheckbox";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";
import {ProductService} from "@/src/demo/service/product-service";
import {CustomerService} from "@/src/demo/service/customer-service";
import type {Demo} from "@/types/types";

function TableDemo(): ReactElement {
  const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
  const [customers2, setCustomers2] = useState<Demo.Customer[]>([]);
  const [customers3, setCustomers3] = useState<Demo.Customer[]>([]);
  const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [idFrozen, setIdFrozen] = useState(false);
  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [expandedRows, setExpandedRows] = useState<
    any[] | DataTableExpandedRows
  >([]);
  const [allExpanded, setAllExpanded] = useState(false);

  const representatives = [
    {name: "Amy Elsner", image: "amyelsner.png"},
    {name: "Anna Fali", image: "annafali.png"},
    {name: "Asiya Javayant", image: "asiyajavayant.png"},
    {name: "Bernardo Dominic", image: "bernardodominic.png"},
    {name: "Elwin Sharvill", image: "elwinsharvill.png"},
    {name: "Ioni Bowcher", image: "ionibowcher.png"},
    {name: "Ivan Magalhaes", image: "ivanmagalhaes.png"},
    {name: "Onyama Limba", image: "onyamalimba.png"},
    {name: "Stephen Shaw", image: "stephenshaw.png"},
    {name: "XuXue Feng", image: "xuxuefeng.png"},
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  const clearFilter1 = (): void => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const _filters1 = {...filters1};
    (_filters1.global as any).value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = (): ReactElement => {
    return (
      <div className="flex justify-content-between">
        <Button
          icon="pi pi-filter-slash"
          label="Clear"
          onClick={clearFilter1}
          outlined
          type="button"
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
            value={globalFilterValue1}
          />
        </span>
      </div>
    );
  };

  useEffect(() => {
    setLoading2(true);

    CustomerService.getCustomersLarge()
      .then((data) => {
        setCustomers1(getCustomers(data));
        setLoading1(false);
      })
      .catch(() => ({}));
    CustomerService.getCustomersLarge()
      .then((data) => {
        setCustomers2(getCustomers(data));
        setLoading2(false);
      })
      .catch(() => ({}));
    CustomerService.getCustomersMedium()
      .then((data) => {
        setCustomers3(data);
      })
      .catch(() => ({}));
    ProductService.getProductsWithOrdersSmall()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => ({}));

    initFilters1();
  }, []);

  const balanceTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <div>
        <span className="text-bold">
          {formatCurrency(rowData.balance as number)}
        </span>
      </div>
    );
  };

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

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const initFilters1 = (): void => {
    setFilters1({
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
      balance: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
      },
      activity: {value: null, matchMode: FilterMatchMode.BETWEEN},
      verified: {value: null, matchMode: FilterMatchMode.EQUALS},
    });
    setGlobalFilterValue1("");
  };

  const countryBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <>
        <img
          alt="flag"
          className={`flag flag-${rowData?.country?.code}`}
          src="/demo/images/flag/flag_placeholder.png"
          width={30}
        />
        <span style={{marginLeft: ".5em", verticalAlign: "middle"}}>
          {rowData?.country?.name}
        </span>
      </>
    );
  };

  const filterClearTemplate = (
    options: ColumnFilterClearTemplateOptions
  ): ReactElement => {
    return (
      <Button
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
        type="button"
      />
    );
  };

  const filterApplyTemplate = (
    options: ColumnFilterApplyTemplateOptions
  ): ReactElement => {
    return (
      <Button
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
        type="button"
      />
    );
  };

  const representativeBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    const representative = rowData.representative;
    return (
      <>
        <img
          alt={representative.name}
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          src={`/demo/images/avatar/${representative.image}`}
          style={{verticalAlign: "middle"}}
          width={32}
        />
        <span style={{marginLeft: ".5em", verticalAlign: "middle"}}>
          {representative.name}
        </span>
      </>
    );
  };

  const representativeFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <>
        <div className="mb-3 text-bold">Agent Picker</div>
        <MultiSelect
          className="p-column-filter"
          itemTemplate={representativesItemTemplate}
          onChange={(e) => {
            options.filterCallback(e.value);
          }}
          optionLabel="name"
          options={representatives}
          placeholder="Any"
          value={options.value}
        />
      </>
    );
  };

  const representativesItemTemplate = (option: any): ReactElement => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`/demo/images/avatar/${option.image}`}
          style={{verticalAlign: "middle"}}
          width={32}
        />
        <span style={{marginLeft: ".5em", verticalAlign: "middle"}}>
          {option.name}
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: Demo.Customer): string => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <Calendar
        dateFormat="mm/dd/yy"
        mask="99/99/9999"
        onChange={(e) => {
          options.filterCallback(e.value, options.index);
        }}
        placeholder="mm/dd/yyyy"
        value={options.value}
      />
    );
  };

  const balanceBodyTemplate = (rowData: Demo.Customer): string => {
    return formatCurrency(rowData.balance as number);
  };

  const balanceFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <InputNumber
        currency="USD"
        locale="en-US"
        mode="currency"
        onChange={(e) => {
          options.filterCallback(e.value, options.index);
        }}
        value={options.value}
      />
    );
  };

  const statusBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const statusFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <Dropdown
        className="p-column-filter"
        itemTemplate={statusItemTemplate}
        onChange={(e) => {
          options.filterCallback(e.value, options.index);
        }}
        options={statuses}
        placeholder="Select a Status"
        showClear
        value={options.value}
      />
    );
  };

  const statusItemTemplate = (option: any): ReactElement => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const activityBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <ProgressBar
        showValue={false}
        style={{height: ".5rem"}}
        value={rowData.activity}
      />
    );
  };

  const activityFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <>
        <Slider
          className="m-3"
          onChange={(e) => {
            options.filterCallback(e.value);
          }}
          range
          value={options.value}
        />
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </>
    );
  };

  const verifiedBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check-circle": rowData.verified,
          "text-pink-500 pi-times-circle": !rowData.verified,
        })}
      />
    );
  };

  const verifiedFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ): ReactElement => {
    return (
      <TriStateCheckbox
        onChange={(e) => {
          options.filterCallback(e.value);
        }}
        value={options.value}
      />
    );
  };

  const toggleAll = (): void => {
    if (allExpanded) collapseAll();
    else expandAll();
  };

  const expandAll = (): void => {
    const _expandedRows = {} as Record<string, boolean>;
    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
    setAllExpanded(true);
  };

  const collapseAll = (): void => {
    setExpandedRows([]);
    setAllExpanded(false);
  };

  const amountBodyTemplate = (rowData: Demo.Customer): string => {
    return formatCurrency(rowData.amount!);
  };

  const statusOrderBodyTemplate = (rowData: Demo.Customer): ReactElement => {
    return (
      <span className={`order-badge order-${rowData.status?.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  };

  const searchBodyTemplate = (): ReactElement => {
    return <Button icon="pi pi-search" />;
  };

  const imageBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <img
        alt={rowData.image}
        className="shadow-2"
        onError={(e) =>
          ((e.target as HTMLImageElement).src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        src={`/demo/images/product/${rowData.image}`}
        width={100}
      />
    );
  };

  const priceBodyTemplate = (rowData: Demo.Product): string => {
    return formatCurrency(rowData.price as number);
  };

  const ratingBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return <Rating cancel={false} readOnly value={rowData.rating} />;
  };

  const statusBodyTemplate2 = (rowData: Demo.Product): ReactElement => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const rowExpansionTemplate = (data: Demo.Product): ReactElement => {
    return (
      <div className="orders-subtable">
        <h5>Orders for {data.name}</h5>
        <DataTable responsiveLayout="scroll" value={data.orders}>
          <Column field="id" header="Id" sortable />
          <Column field="customer" header="Customer" sortable />
          <Column field="date" header="Date" sortable />
          <Column
            body={amountBodyTemplate}
            field="amount"
            header="Amount"
            sortable
          />
          <Column
            body={statusOrderBodyTemplate}
            field="status"
            header="Status"
            sortable
          />
          <Column body={searchBodyTemplate} headerStyle={{width: "4rem"}} />
        </DataTable>
      </div>
    );
  };

  const header = (
    <Button
      className="w-11rem"
      icon={allExpanded ? "pi pi-minus" : "pi pi-plus"}
      label={allExpanded ? "Collapse All" : "Expand All"}
      onClick={toggleAll}
    />
  );

  const headerTemplate = (data: Demo.Customer): ReactElement => {
    return (
      <>
        <img
          alt={data.representative.name}
          src={`/demo/images/avatar/${data.representative.image}`}
          style={{verticalAlign: "middle"}}
          width="32"
        />
        <span className="font-bold ml-2">{data.representative.name}</span>
      </>
    );
  };

  const footerTemplate = (data: Demo.Customer): ReactElement => {
    return (
      <>
        <td className="text-bold pr-6" colSpan={4} style={{textAlign: "right"}}>
          Total Customers
        </td>
        <td>{calculateCustomerTotal(data.representative.name)}</td>
      </>
    );
  };

  const calculateCustomerTotal = (name: string): number => {
    let total = 0;

    if (customers3) {
      for (const customer of customers3) {
        if (customer.representative.name === name) {
          total++;
        }
      }
    }

    return total;
  };

  const header1 = renderHeader1();

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Filter Menu</h5>
          <DataTable
            className="p-datatable-gridlines"
            dataKey="id"
            emptyMessage="No customers found."
            filterDisplay="menu"
            filters={filters1}
            header={header1}
            loading={loading1}
            paginator
            responsiveLayout="scroll"
            rows={10}
            showGridlines
            value={customers1}
          >
            <Column
              field="name"
              filter
              filterPlaceholder="Search by name"
              header="Name"
              style={{minWidth: "12rem"}}
            />
            <Column
              body={countryBodyTemplate}
              filter
              filterApply={filterApplyTemplate}
              filterClear={filterClearTemplate}
              filterField="country.name"
              filterPlaceholder="Search by country"
              header="Country"
              style={{minWidth: "12rem"}}
            />
            <Column
              body={representativeBodyTemplate}
              filter
              filterElement={representativeFilterTemplate}
              filterField="representative"
              filterMenuStyle={{width: "14rem"}}
              header="Agent"
              showFilterMatchModes={false}
              style={{minWidth: "14rem"}}
            />
            <Column
              body={dateBodyTemplate}
              dataType="date"
              filter
              filterElement={dateFilterTemplate}
              filterField="date"
              header="Date"
              style={{minWidth: "10rem"}}
            />
            <Column
              body={balanceBodyTemplate}
              dataType="numeric"
              filter
              filterElement={balanceFilterTemplate}
              filterField="balance"
              header="Balance"
              style={{minWidth: "10rem"}}
            />
            <Column
              body={statusBodyTemplate}
              field="status"
              filter
              filterElement={statusFilterTemplate}
              filterMenuStyle={{width: "14rem"}}
              header="Status"
              style={{minWidth: "12rem"}}
            />
            <Column
              body={activityBodyTemplate}
              field="activity"
              filter
              filterElement={activityFilterTemplate}
              header="Activity"
              showFilterMatchModes={false}
              style={{minWidth: "12rem"}}
            />
            <Column
              body={verifiedBodyTemplate}
              bodyClassName="text-center"
              dataType="boolean"
              field="verified"
              filter
              filterElement={verifiedFilterTemplate}
              header="Verified"
              style={{minWidth: "8rem"}}
            />
          </DataTable>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Frozen Columns</h5>
          <ToggleButton
            checked={idFrozen}
            offIcon="pi pi-lock-open"
            offLabel="Freeze Id"
            onChange={(e) => {
              setIdFrozen(e.value);
            }}
            onIcon="pi pi-lock"
            onLabel="Unfreeze Id"
            style={{width: "10rem"}}
          />

          <DataTable
            className="mt-3"
            loading={loading2}
            scrollHeight="400px"
            scrollable
            value={customers2}
          >
            <Column
              className="font-bold"
              field="name"
              frozen
              header="Name"
              style={{flexGrow: 1, flexBasis: "160px"}}
            />
            <Column
              alignFrozen="left"
              bodyClassName={classNames({"font-bold": idFrozen})}
              field="id"
              frozen={idFrozen}
              header="Id"
              style={{flexGrow: 1, flexBasis: "100px"}}
            />
            <Column
              body={countryBodyTemplate}
              field="country.name"
              header="Country"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              body={dateBodyTemplate}
              field="date"
              header="Date"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              field="company"
              header="Company"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              body={statusBodyTemplate}
              field="status"
              header="Status"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              field="activity"
              header="Activity"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              body={representativeBodyTemplate}
              field="representative.name"
              header="Representative"
              style={{flexGrow: 1, flexBasis: "200px"}}
            />
            <Column
              alignFrozen="right"
              body={balanceTemplate}
              className="font-bold"
              field="balance"
              frozen
              header="Balance"
              style={{flexGrow: 1, flexBasis: "120px"}}
            />
          </DataTable>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Row Expand</h5>
          <DataTable
            dataKey="id"
            expandedRows={expandedRows}
            header={header}
            onRowToggle={(e) => {
              setExpandedRows(e.data);
            }}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            value={products}
          >
            <Column expander style={{width: "3em"}} />
            <Column field="name" header="Name" sortable />
            <Column body={imageBodyTemplate} header="Image" />
            <Column
              body={priceBodyTemplate}
              field="price"
              header="Price"
              sortable
            />
            <Column field="category" header="Category" sortable />
            <Column
              body={ratingBodyTemplate}
              field="rating"
              header="Reviews"
              sortable
            />
            <Column
              body={statusBodyTemplate2}
              field="inventoryStatus"
              header="Status"
              sortable
            />
          </DataTable>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Subheader Grouping</h5>
          <DataTable
            groupRowsBy="representative.name"
            responsiveLayout="scroll"
            rowGroupFooterTemplate={footerTemplate}
            rowGroupHeaderTemplate={headerTemplate}
            rowGroupMode="subheader"
            scrollHeight="400px"
            scrollable
            sortField="representative.name"
            sortMode="single"
            sortOrder={1}
            value={customers3}
          >
            <Column field="name" header="Name" style={{minWidth: "200px"}} />
            <Column
              body={countryBodyTemplate}
              field="country"
              header="Country"
              style={{minWidth: "200px"}}
            />
            <Column
              field="company"
              header="Company"
              style={{minWidth: "200px"}}
            />
            <Column
              body={statusBodyTemplate}
              field="status"
              header="Status"
              style={{minWidth: "200px"}}
            />
            <Column field="date" header="Date" style={{minWidth: "200px"}} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default TableDemo;
