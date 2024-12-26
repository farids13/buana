"use client";

import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import type {DataTableSelectEvent} from "primereact/datatable";
import {DataTable} from "primereact/datatable";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {OverlayPanel} from "primereact/overlaypanel";
import {Sidebar} from "primereact/sidebar";
import {Toast} from "primereact/toast";
import type {ReactElement} from "react";
import React, {useEffect, useRef, useState} from "react";
import {ProductService} from "@/src/demo/service/product-service";
import type {Demo} from "@/types/types";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
function OverlayDemo(): ReactElement {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Demo.Product | null>(
    null
  );
  const op = useRef<OverlayPanel>(null);
  const op2 = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);

  const accept = (): void => {
    toast.current?.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = (): void => {
    toast.current?.show({
      severity: "error",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };

  useEffect(() => {
    ProductService.getProductsSmall()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => ({}));
  }, []);

  const toggle = (event: ButtonEvent): void => {
    op.current?.toggle(event);
  };

  const toggleDataTable = (event: ButtonEvent): void => {
    op2.current?.toggle(event);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const onProductSelect = (event: DataTableSelectEvent): void => {
    op2.current?.hide();
    toast.current?.show({
      severity: "info",
      summary: "Product Selected",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onSelectionChange = (e: any): void => {
    setSelectedProduct(e.value as Demo.Product);
  };

  const basicDialogFooter = (
    <Button
      icon="pi pi-check"
      label="OK"
      onClick={() => {
        setDisplayBasic(false);
      }}
      outlined
      type="button"
    />
  );
  const imageBodyTemplate = (data: Demo.Product): ReactElement => (
    <img
      alt={data.image}
      className="product-image"
      src={`/demo/images/product/${data.image}`}
      style={{
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
      }}
      width="60"
    />
  );
  const priceBodyTemplate = (data: Demo.Product): string =>
    formatCurrency((data.price as number) ?? 0);
  const confirmationDialogFooter = (
    <>
      <Button
        icon="pi pi-times"
        label="No"
        onClick={() => {
          setDisplayConfirmation(false);
        }}
        text
        type="button"
      />
      <Button
        icon="pi pi-check"
        label="Yes"
        onClick={() => {
          setDisplayConfirmation(false);
        }}
        text
        type="button"
      />
    </>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 lg:col-6">
          <div className="card">
            <h5>Dialog</h5>
            <Dialog
              footer={basicDialogFooter}
              header="Dialog"
              modal
              onHide={() => {
                setDisplayBasic(false);
              }}
              style={{width: "30vw"}}
              visible={displayBasic}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Dialog>
            <div className="grid">
              <div className="col-12">
                <Button
                  icon="pi pi-external-link"
                  label="Show"
                  onClick={() => {
                    setDisplayBasic(true);
                  }}
                  outlined
                  type="button"
                />
              </div>
            </div>
          </div>
          <div className="card">
            <h5>Overlay Panel</h5>
            <div className="flex flex-wrap gap-2">
              <div>
                <Button label="Image" onClick={toggle} outlined type="button" />
                <OverlayPanel
                  appendTo={
                    typeof window !== "undefined" ? document.body : null
                  }
                  ref={op}
                  showCloseIcon
                >
                  <img alt="nature1" src="/demo/images/nature/nature9.jpg" />
                </OverlayPanel>
              </div>
              <div>
                <Button
                  label="DataTable"
                  onClick={toggleDataTable}
                  outlined
                  type="button"
                />
                <OverlayPanel
                  appendTo={
                    typeof window !== "undefined" ? document.body : null
                  }
                  id="overlay_panel"
                  ref={op2}
                  showCloseIcon
                  style={{width: "450px"}}
                >
                  <DataTable
                    onRowSelect={onProductSelect}
                    onSelectionChange={onSelectionChange}
                    paginator
                    responsiveLayout="scroll"
                    rows={5}
                    selection={selectedProduct || undefined}
                    selectionMode="single"
                    value={products}
                  >
                    <Column
                      field="name"
                      header="Name"
                      headerStyle={{minWidth: "10rem"}}
                      sortable
                    />
                    <Column
                      body={imageBodyTemplate}
                      header="Image"
                      headerStyle={{minWidth: "10rem"}}
                    />
                    <Column
                      body={priceBodyTemplate}
                      field="price"
                      header="Price"
                      headerStyle={{minWidth: "8rem"}}
                      sortable
                    />
                  </DataTable>
                </OverlayPanel>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-6">
          <div className="card">
            <h5>Confirmation</h5>
            <Button
              icon="pi pi-trash"
              label="Delete"
              onClick={() => {
                setDisplayConfirmation(true);
              }}
              severity="danger"
            />
            <Dialog
              footer={confirmationDialogFooter}
              header="Confirmation"
              modal
              onHide={() => {
                setDisplayConfirmation(false);
              }}
              style={{width: "350px"}}
              visible={displayConfirmation}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{fontSize: "2rem"}}
                />
                <span>Are you sure you want to proceed?</span>
              </div>
            </Dialog>
          </div>
          <div className="card">
            <h5>Sidebar</h5>
            <Sidebar
              baseZIndex={1000}
              onHide={() => {
                setVisibleLeft(false);
              }}
              visible={visibleLeft}
            >
              <h1 style={{fontWeight: "normal"}}>Left Sidebar</h1>
            </Sidebar>

            <Sidebar
              baseZIndex={1000}
              onHide={() => {
                setVisibleRight(false);
              }}
              position="right"
              visible={visibleRight}
            >
              <h1 style={{fontWeight: "normal"}}>Right Sidebar</h1>
            </Sidebar>

            <Sidebar
              baseZIndex={1000}
              onHide={() => {
                setVisibleTop(false);
              }}
              position="top"
              visible={visibleTop}
            >
              <h1 style={{fontWeight: "normal"}}>Top Sidebar</h1>
            </Sidebar>

            <Sidebar
              baseZIndex={1000}
              onHide={() => {
                setVisibleBottom(false);
              }}
              position="bottom"
              visible={visibleBottom}
            >
              <h1 style={{fontWeight: "normal"}}>Bottom Sidebar</h1>
            </Sidebar>

            <Sidebar
              baseZIndex={1000}
              fullScreen
              onHide={() => {
                setVisibleFullScreen(false);
              }}
              visible={visibleFullScreen}
            >
              <h1 style={{fontWeight: "normal"}}>Full Screen</h1>
            </Sidebar>

            <Button
              icon="pi pi-arrow-right"
              onClick={() => {
                setVisibleLeft(true);
              }}
              severity="warning"
              style={{marginRight: ".25em"}}
              type="button"
            />
            <Button
              icon="pi pi-arrow-left"
              onClick={() => {
                setVisibleRight(true);
              }}
              severity="warning"
              style={{marginRight: ".25em"}}
              type="button"
            />
            <Button
              icon="pi pi-arrow-down"
              onClick={() => {
                setVisibleTop(true);
              }}
              severity="warning"
              style={{marginRight: ".25em"}}
              type="button"
            />
            <Button
              icon="pi pi-arrow-up"
              onClick={() => {
                setVisibleBottom(true);
              }}
              severity="warning"
              style={{marginRight: ".25em"}}
              type="button"
            />
            <Button
              icon="pi pi-external-link"
              onClick={() => {
                setVisibleFullScreen(true);
              }}
              severity="warning"
              type="button"
            />
          </div>
        </div>

        <div className="col-12 lg:col-6">
          <div className="card">
            <h5>Tooltip</h5>
            <div className="flex align-items-center gap-2">
              <span>
                <InputText
                  placeholder="Username"
                  tooltip="Your username"
                  type="text"
                />
              </span>

              <Button
                icon="pi pi-check"
                label="Save"
                tooltip="Click to proceed"
                type="button"
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6">
          <Toast ref={toast} />

          <div className="card">
            <h5>ConfirmPopup</h5>
            <ConfirmPopup />
            <Button icon="pi pi-check" label="Confirm" onClick={confirm} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OverlayDemo;
