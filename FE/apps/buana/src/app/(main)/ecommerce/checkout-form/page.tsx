"use client";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import type {ReactElement} from "react";
import React, {useState} from "react";

function CheckoutForm(): ReactElement {
  const [value, setValue] = useState("");
  const [quantities, setQuantities] = useState([1, 1, 1]);
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([
    {name: "New York", code: "NY"},
    {name: "Rome", code: "RM"},
    {name: "London", code: "LDN"},
    {name: "Istanbul", code: "IST"},
    {name: "Paris", code: "PRS"},
  ]);

  return (
    <div className="card">
      <div className="grid grid-nogutter">
        <div className="col-12 px-4 mt-4 md:mt-6 md:px-6">
          <span className="text-900 block font-bold text-xl">Checkout</span>
        </div>
        <div className="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
          <ul className="flex list-none flex-wrap p-0 mb-6">
            <li className="flex align-items-center text-primary mr-2">
              Cart <i className="pi pi-chevron-right text-500 text-xs ml-2" />
            </li>
            <li className="flex align-items-center text-500 mr-2">
              Information
              <i className="pi pi-chevron-right text-500 text-xs ml-2" />
            </li>
            <li className="flex align-items-center text-500 mr-2">
              Shipping
              <i className="pi pi-chevron-right text-500 text-xs ml-2" />
            </li>
            <li className="flex align-items-center text-500 mr-2">Payment</li>
          </ul>
          <div className="grid formgrid">
            <div className="col-12 field mb-6">
              <span className="text-900 text-2xl block font-medium mb-5">
                Contact Information
              </span>
              <input
                className="p-inputtext w-full mb-4"
                id="email"
                placeholder="Email"
                type="text"
              />
              <div className="field-checkbox">
                <Checkbox
                  checked={checked}
                  inputId="checkbox-1"
                  name="checkbox-1"
                  onChange={(e) => {
                    setChecked(e.checked ?? false);
                  }}
                />
                <label htmlFor="checkbox-1">
                  Email me with news and offers
                </label>
              </div>
            </div>
            <div className="col-12 field mb-4">
              <span className="text-900 text-2xl block font-medium mb-5">
                Shipping
              </span>
              <Dropdown
                className="w-full"
                onChange={(e) => {
                  setSelectedCity(e.value);
                }}
                optionLabel="name"
                options={cities}
                placeholder="Country / Region"
                showClear
                value={selectedCity}
              />
            </div>
            <div className="col-12 lg:col-6 field mb-4">
              <input
                className="p-inputtext w-full"
                id="name"
                placeholder="Name"
                type="text"
              />
            </div>
            <div className="col-12 lg:col-6 field mb-4">
              <input
                className="p-inputtext w-full"
                id="lastname"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className="col-12 field mb-4">
              <input
                className="p-inputtext w-full"
                id="address"
                placeholder="Address"
                type="text"
              />
            </div>
            <div className="col-12 field mb-4">
              <input
                className="p-inputtext w-full"
                id="address2"
                placeholder="Apartment, suite, etc"
                type="text"
              />
            </div>
            <div className="col-12 lg:col-6 field mb-4">
              <input
                className="p-inputtext w-full"
                id="pc"
                placeholder="Postal Code"
                type="text"
              />
            </div>
            <div className="col-12 lg:col-6 field mb-4">
              <input
                className="p-inputtext w-full"
                id="city"
                placeholder="City"
                type="text"
              />
            </div>
            <div className="col-12 lg:col-6 field mb-4">
              <div className="field-checkbox">
                <Checkbox
                  checked={checked2}
                  inputId="checkbox-2"
                  name="checkbox-2"
                  onChange={(e) => {
                    setChecked2(e.checked ?? false);
                  }}
                />
                <label htmlFor="checkbox-2">Save for next purchase</label>
              </div>
            </div>
            <div className="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
              <Button
                className="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4"
                icon="pi pi-fw pi-arrow-left"
                label="Return to Cart"
                outlined
                severity="secondary"
              />
              <Button
                className="w-full lg:w-auto flex-order-1 lg:flex-order-2"
                icon="pi pi-fw pi-check"
                label="Continue to Shipping"
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 px-4 py-4 md:px-6">
          <div className="pb-3 surface-border">
            <span className="text-900 font-medium text-xl">Your Cart</span>
          </div>
          <div className="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border">
            <img
              alt="product"
              className="w-8rem h-8rem flex-shrink-0 mb-3"
              src="/demo/images/ecommerce/shop/shop-1.png"
            />
            <div className="flex-auto lg:ml-3">
              <div className="flex align-items-center justify-content-between mb-3">
                <span className="text-900 font-bold">Product Name</span>
                <span className="text-900 font-bold">$123.00</span>
              </div>
              <div className="text-600 text-sm mb-3">Black | Large</div>
              <div className="flex flex-auto justify-content-between align-items-center">
                <InputNumber
                  buttonLayout="horizontal"
                  className="border-1 surface-border border-round"
                  decrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                  decrementButtonIcon="pi pi-minus"
                  incrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                  incrementButtonIcon="pi pi-plus"
                  inputClassName="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                  min={0}
                  showButtons
                  value={quantities[0]}
                />
                <Button icon="pi pi-trash" rounded text />
              </div>
            </div>
          </div>
          <div className="py-2 mt-3 surface-border">
            <div className="p-inputgroup mb-3">
              <InputText
                className="w-full"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder="Promo code"
                type="text"
                value={value}
              />
              <Button disabled={!value} label="Apply" type="button" />
            </div>
          </div>
          <div className="py-2 mt-3">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-medium">Subtotal</span>
              <span className="text-900">$123.00</span>
            </div>
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-medium">Shipping</span>
              <span className="text-primary font-bold">Free</span>
            </div>
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-bold">Total</span>
              <span className="text-900 font-medium text-xl">$123.00</span>
            </div>
          </div>
          <div className="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
            <img
              alt="Country Flag"
              className="mr-2"
              src="/demo/images/ecommerce/shop/flag.png"
            />
            <span className="text-black-alpha-90 font-medium">
              No additional duties or taxes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
