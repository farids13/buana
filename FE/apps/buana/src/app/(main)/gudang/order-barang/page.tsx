"use client";
import type { ReactElement } from "react";
import React from "react";
import OrderBarangForm from "./form/order-barang-form";

function OrderBarang(): ReactElement {
 
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h2>Order Barang</h2>
          <OrderBarangForm />
        </div>
      </div>
    </div>
  );

}

export default OrderBarang;
