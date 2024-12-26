"use client";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";
import type {Demo} from "@/types/types";

function ProfileCreate(): ReactElement {
  const [countries, setCountries] = useState<Demo.Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Demo.Country | object>(
    {}
  );
  useEffect(() => {
    setCountries([
      {name: "Australia", code: "AU"},
      {name: "Brazil", code: "BR"},
      {name: "China", code: "CN"},
      {name: "Egypt", code: "EG"},
      {name: "France", code: "FR"},
      {name: "Germany", code: "DE"},
      {name: "India", code: "IN"},
      {name: "Japan", code: "JP"},
      {name: "Spain", code: "ES"},
      {name: "United States", code: "US"},
    ]);
  }, []);

  const itemTemplate = (option: Demo.Country): ReactElement => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          src="/demo/images/flag/flag_placeholder.png"
          style={{width: "18px"}}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="card">
      <span className="text-900 text-xl font-bold mb-4 block">Create User</span>
      <div className="grid">
        <div className="col-12 lg:col-2">
          <div className="text-900 font-medium text-xl mb-3">Profile</div>
          <p className="m-0 p-0 text-600 line-height-3 mr-3">
            Odio euismod lacinia at quis risus sed vulputate odio.
          </p>
        </div>
        <div className="col-12 lg:col-10">
          <div className="grid formgrid p-fluid">
            <div className="field mb-4 col-12">
              <label className="font-medium text-900" htmlFor="nickname">
                Nickname
              </label>
              <InputText id="nickname" type="text" />
            </div>
            <div className="field mb-4 col-12">
              <label className="font-medium text-900" htmlFor="avatar">
                Avatar
              </label>
              <FileUpload
                accept="image/*"
                chooseOptions={{
                  label: "Upload Image",
                  className: "p-button-outlined p-button-plain",
                }}
                maxFileSize={1000000}
                mode="basic"
                name="avatar"
                url="./upload.php"
              />
            </div>
            <div className="field mb-4 col-12">
              <label className="font-medium text-900" htmlFor="bio">
                Bio
              </label>
              <InputTextarea autoResize id="bio" rows={5} />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label className="font-medium text-900" htmlFor="email">
                Email
              </label>
              <InputText id="email" type="text" />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label className="font-medium text-900" htmlFor="country">
                Country
              </label>
              <Dropdown
                filter
                filterBy="name"
                inputId="country"
                itemTemplate={itemTemplate}
                onChange={(e) => {
                  setSelectedCountry(e.value);
                }}
                optionLabel="name"
                options={countries}
                placeholder="Select a Country"
                showClear
                value={selectedCountry}
              />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label className="font-medium text-900" htmlFor="city">
                City
              </label>
              <InputText id="city" type="text" />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label className="font-medium text-900" htmlFor="state">
                State
              </label>
              <InputText id="state" type="text" />
            </div>
            <div className="field mb-4 col-12">
              <label className="font-medium text-900" htmlFor="website">
                Website
              </label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">www</span>
                <InputText id="website" type="text" />
              </div>
            </div>
            <div className="col-12">
              <Button className="w-auto mt-3" label="Create User" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCreate;
