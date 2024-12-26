"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect} from "react";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import type {DropdownChangeEvent} from "primereact/dropdown";
import {Dropdown} from "primereact/dropdown";
import {Rating} from "primereact/rating";
import {PickList} from "primereact/picklist";
import {OrderList} from "primereact/orderlist";
import {InputText} from "primereact/inputtext";
import {ProductService} from "@/src/demo/service/product-service";
import type {Demo} from "@/types/types";

function ListDemo(): ReactElement {
  const listValue = [
    {name: "San Francisco", code: "SF"},
    {name: "London", code: "LDN"},
    {name: "Paris", code: "PRS"},
    {name: "Istanbul", code: "IST"},
    {name: "Berlin", code: "BRL"},
    {name: "Barcelona", code: "BRC"},
    {name: "Rome", code: "RM"},
  ];

  const [picklistSourceValue, setPicklistSourceValue] = useState(listValue);
  const [picklistTargetValue, setPicklistTargetValue] = useState([]);
  const [orderlistValue, setOrderlistValue] = useState(listValue);
  const [dataViewValue, setDataViewValue] = useState<Demo.Product[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredValue, setFilteredValue] = useState<Demo.Product[] | null>(
    null
  );
  const [layout, setLayout] = useState<
    "grid" | "list" | (string & Record<string, unknown>)
  >("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
  const [sortField, setSortField] = useState("");

  const sortOptions = [
    {label: "Price High to Low", value: "!price"},
    {label: "Price Low to High", value: "price"},
  ];

  useEffect(() => {
    ProductService.getProducts()
      .then((data) => {
        setDataViewValue(data);
      })
      .catch(() => ({}));
    setGlobalFilterValue("");
  }, []);

  useEffect(() => {
    ProductService.getProducts()
      .then((data) => {
        setDataViewValue(data);
      })
      .catch(() => ({}));
    setGlobalFilterValue("");
  }, []);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    if (value.length === 0) {
      setFilteredValue(null);
    } else {
      const filtered = dataViewValue.filter((product) => {
        const productNameLowercase = product.name.toLowerCase();
        const searchValueLowercase = value.toLowerCase();
        return productNameLowercase.includes(searchValueLowercase);
      });

      setFilteredValue(filtered);
    }
  };

  const onSortChange = (event: DropdownChangeEvent): void => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const dataViewHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
      <Dropdown
        onChange={onSortChange}
        optionLabel="label"
        options={sortOptions}
        placeholder="Sort By Price"
        value={sortKey}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          onChange={onFilter}
          placeholder="Search by Name"
          value={globalFilterValue}
        />
      </span>
      <DataViewLayoutOptions
        layout={layout}
        onChange={(e) => {
          setLayout(e.value);
        }}
      />
    </div>
  );

  const dataviewListItem = (data: Demo.Product): ReactElement => {
    return (
      <div className="col-12">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
          <img
            alt={data.name}
            className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
            src={`/demo/images/product/${data.image}`}
          />
          <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
            <div className="font-bold text-2xl">{data.name}</div>
            <div className="mb-2">{data.description}</div>
            <Rating
              cancel={false}
              className="mb-2"
              readOnly
              value={data.rating}
            />
            <div className="flex align-items-center">
              <i className="pi pi-tag mr-2" />
              <span className="font-semibold">{data.category}</span>
            </div>
          </div>
          <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
            <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">
              ${data.price}
            </span>
            <Button
              className="mb-2"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              size="small"
            />
            <span
              className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const dataviewGridItem = (data: Demo.Product): ReactElement => {
    return (
      <div className="col-12 lg:col-4">
        <div className="card m-3 border-1 surface-border">
          <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
            <div className="flex align-items-center">
              <i className="pi pi-tag mr-2" />
              <span className="font-semibold">{data.category}</span>
            </div>
            <span
              className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
          <div className="flex flex-column align-items-center text-center mb-3">
            <img
              alt={data.name}
              className="w-9 shadow-2 my-3 mx-0"
              src={`/demo/images/product/${data.image}`}
            />
            <div className="text-2xl font-bold">{data.name}</div>
            <div className="mb-3">{data.description}</div>
            <Rating cancel={false} readOnly value={data.rating} />
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${data.price}</span>
            <Button
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
              icon="pi pi-shopping-cart"
            />
          </div>
        </div>
      </div>
    );
  };

  const dataViewItemTemplate = (
    data: Demo.Product,
    layout: "grid" | "list" | (string & Record<string, unknown>)
  ): ReactElement | undefined => {
    if (!data) {
      return;
    }

    if (layout === "list") {
      return dataviewListItem(data);
    } else if (layout === "grid") {
      return dataviewGridItem(data);
    }
  };

  const pickListItemTemplate = (item): ReactElement => <div>{item.name}</div>;

  const orderListItemTemplate = (item): ReactElement => <div>{item.name}</div>;

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>DataView</h5>
          <DataView
            header={dataViewHeader}
            itemTemplate={dataViewItemTemplate}
            layout={layout}
            paginator
            rows={9}
            sortField={sortField}
            sortOrder={sortOrder}
            value={filteredValue || dataViewValue}
          />
        </div>
      </div>

      <div className="col-12 xl:col-8">
        <div className="card">
          <h5>PickList</h5>
          <PickList
            itemTemplate={pickListItemTemplate}
            onChange={(e) => {
              setPicklistSourceValue(e.source);
              setPicklistTargetValue(e.target);
            }}
            source={picklistSourceValue}
            sourceHeader="From"
            sourceStyle={{height: "200px"}}
            target={picklistTargetValue}
            targetHeader="To"
            targetStyle={{height: "200px"}}
          />
        </div>
      </div>

      <div className="col-12 xl:col-4">
        <div className="card">
          <h5>OrderList</h5>
          <OrderList
            className="p-orderlist-responsive"
            header="Cities"
            itemTemplate={orderListItemTemplate}
            listStyle={{height: "200px"}}
            onChange={(e) => {
              setOrderlistValue(e.value);
            }}
            value={orderlistValue}
          />
        </div>
      </div>
    </div>
  );
}

export default ListDemo;
