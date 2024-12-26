"use client";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Dialog} from "primereact/dialog";
import {FileUpload} from "primereact/fileupload";
import type {InputNumberValueChangeEvent} from "primereact/inputnumber";
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import type {RadioButtonChangeEvent} from "primereact/radiobutton";
import {RadioButton} from "primereact/radiobutton";
import {Rating} from "primereact/rating";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useEffect, useRef, useState} from "react";
import {ProductService} from "@/src/demo/service/product-service";
import type {Demo} from "@/types/types";

function Crud(): ReactElement {
  const emptyProduct: Demo.Product = {
    id: "",
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast | null>(null);
  const dt = useRef<DataTable<any>>(null);

  useEffect(() => {
    ProductService.getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => ({}));
  }, []);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = (): void => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = (): void => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = (): void => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = (): void => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = (): void => {
    setSubmitted(true);

    if (product.name.trim()) {
      const _products = [...products];
      const _product = {...product};
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.code = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: Demo.Product): void => {
    setProduct({...product});
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Demo.Product): void => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = (): void => {
    const _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: string): number => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = (): string => {
    let id = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = (): void => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = (): void => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = (): void => {
    const _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: RadioButtonChangeEvent): void => {
    const _product = {...product};
    _product.category = e.value;
    setProduct(_product);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ): void => {
    const val = (e.target && e.target.value) || "";
    const _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ): void => {
    const val = e.value || 0;
    const _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = (): ReactElement => {
    return (
      <div className="my-2">
        <Button
          className="mr-2"
          icon="pi pi-plus"
          label="New"
          onClick={openNew}
          severity="success"
        />
        <Button
          disabled={!selectedProducts.length}
          icon="pi pi-trash"
          label="Delete"
          onClick={confirmDeleteSelected}
          severity="danger"
        />
      </div>
    );
  };

  const rightToolbarTemplate = (): ReactElement => {
    return (
      <>
        <FileUpload
          accept="image/*"
          chooseLabel="Import"
          className="mr-2 inline-block"
          maxFileSize={1000000}
          mode="basic"
        />
        <Button
          icon="pi pi-upload"
          label="Export"
          onClick={exportCSV}
          severity="help"
        />
      </>
    );
  };

  const codeBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.code}
      </>
    );
  };

  const nameBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };

  const imageBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img
          alt={rowData.image}
          className="shadow-2"
          src={`/demo/images/product/${rowData.image}`}
          width="100"
        />
      </>
    );
  };

  const priceBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatCurrency(rowData.price as number)}
      </>
    );
  };

  const categoryBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData.category}
      </>
    );
  };

  const ratingBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        <Rating cancel={false} readOnly value={rowData.rating} />
      </>
    );
  };

  const statusBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span
          className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}
        >
          {rowData.inventoryStatus}
        </span>
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.Product): ReactElement => {
    return (
      <>
        <Button
          className="mr-2"
          icon="pi pi-pencil"
          onClick={() => {
            editProduct(rowData);
          }}
          rounded
          severity="success"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => {
            confirmDeleteProduct(rowData);
          }}
          rounded
          severity="warning"
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Products</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          onInput={(e) => {
            setGlobalFilter((e.target as HTMLInputElement).value);
          }}
          placeholder="Search..."
          type="search"
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <>
      <Button icon="pi pi-times" label="Cancel" onClick={hideDialog} text />
      <Button icon="pi pi-check" label="Save" onClick={saveProduct} text />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button
        icon="pi pi-times"
        label="No"
        onClick={hideDeleteProductDialog}
        text
      />
      <Button icon="pi pi-check" label="Yes" onClick={deleteProduct} text />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        icon="pi pi-times"
        label="No"
        onClick={hideDeleteProductsDialog}
        text
      />
      <Button
        icon="pi pi-check"
        label="Yes"
        onClick={deleteSelectedProducts}
        text
      />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          <DataTable
            className="datatable-responsive"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            dataKey="id"
            emptyMessage="No products found."
            globalFilter={globalFilter}
            header={header}
            onSelectionChange={(e) => {
              setSelectedProducts(e.value as Demo.Product[]);
            }}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            ref={dt}
            responsiveLayout="scroll"
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            selection={selectedProducts}
            value={products}
          >
            <Column headerStyle={{width: "4rem"}} selectionMode="multiple" />
            <Column
              body={codeBodyTemplate}
              field="code"
              header="Code"
              headerStyle={{minWidth: "15rem"}}
              sortable
            />
            <Column
              body={nameBodyTemplate}
              field="name"
              header="Name"
              headerStyle={{minWidth: "15rem"}}
              sortable
            />
            <Column body={imageBodyTemplate} header="Image" />
            <Column
              body={priceBodyTemplate}
              field="price"
              header="Price"
              sortable
            />
            <Column
              body={categoryBodyTemplate}
              field="category"
              header="Category"
              headerStyle={{minWidth: "10rem"}}
              sortable
            />
            <Column
              body={ratingBodyTemplate}
              field="rating"
              header="Reviews"
              sortable
            />
            <Column
              body={statusBodyTemplate}
              field="inventoryStatus"
              header="Status"
              headerStyle={{minWidth: "10rem"}}
              sortable
            />
            <Column
              body={actionBodyTemplate}
              headerStyle={{minWidth: "10rem"}}
            />
          </DataTable>

          <Dialog
            className="p-fluid"
            footer={productDialogFooter}
            header="Product Details"
            modal
            onHide={hideDialog}
            style={{width: "450px"}}
            visible={productDialog}
          >
            {product.image ? (
              <img
                alt={product.image}
                className="mt-0 mx-auto mb-5 block shadow-2"
                src={`/demo/images/product/${product.image}`}
                width="150"
              />
            ) : null}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                className={classNames({
                  "p-invalid": submitted && !product.name,
                })}
                id="name"
                onChange={(e) => {
                  onInputChange(e, "name");
                }}
                required
                value={product.name}
              />
              {submitted && !product.name ? (
                <small className="p-invalid">Name is required.</small>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                cols={20}
                id="description"
                onChange={(e) => {
                  onInputChange(e, "description");
                }}
                required
                rows={3}
                value={product.description}
              />
            </div>

            <div className="field">
              <label className="mb-3">Category</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    checked={product.category === "Accessories"}
                    inputId="category1"
                    name="category"
                    onChange={onCategoryChange}
                    value="Accessories"
                  />
                  <label htmlFor="category1">Accessories</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    checked={product.category === "Clothing"}
                    inputId="category2"
                    name="category"
                    onChange={onCategoryChange}
                    value="Clothing"
                  />
                  <label htmlFor="category2">Clothing</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    checked={product.category === "Electronics"}
                    inputId="category3"
                    name="category"
                    onChange={onCategoryChange}
                    value="Electronics"
                  />
                  <label htmlFor="category3">Electronics</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    checked={product.category === "Fitness"}
                    inputId="category4"
                    name="category"
                    onChange={onCategoryChange}
                    value="Fitness"
                  />
                  <label htmlFor="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber
                  currency="USD"
                  id="price"
                  locale="en-US"
                  mode="currency"
                  onValueChange={(e) => {
                    onInputNumberChange(e, "price");
                  }}
                  value={product.price as number}
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber
                  id="quantity"
                  onValueChange={(e) => {
                    onInputNumberChange(e, "quantity");
                  }}
                  value={product.quantity}
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            footer={deleteProductDialogFooter}
            header="Confirm"
            modal
            onHide={hideDeleteProductDialog}
            style={{width: "450px"}}
            visible={deleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{fontSize: "2rem"}}
              />
              {product ? (
                <span>
                  Are you sure you want to delete <b>{product.name}</b>?
                </span>
              ) : null}
            </div>
          </Dialog>

          <Dialog
            footer={deleteProductsDialogFooter}
            header="Confirm"
            modal
            onHide={hideDeleteProductsDialog}
            style={{width: "450px"}}
            visible={deleteProductsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{fontSize: "2rem"}}
              />
              {product ? (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              ) : null}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Crud;
