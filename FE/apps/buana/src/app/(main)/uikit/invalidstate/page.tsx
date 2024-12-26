"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {InputMask} from "primereact/inputmask";
import {InputNumber} from "primereact/inputnumber";
import type {AutoCompleteCompleteEvent} from "primereact/autocomplete";
import {AutoComplete} from "primereact/autocomplete";
import type {CalendarChangeEvent} from "primereact/calendar";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {Password} from "primereact/password";
import {CountryService} from "@/src/demo/service/country-service";
import type {Demo} from "@/types/types";

function InvalidStateDemo(): ReactElement {
  const [countries, setCountries] = useState<Demo.Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Demo.Country[]>(
    []
  );
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState<Date | Date[] | string | null>(null);
  const [value4, setValue4] = useState<any[]>([]);
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(null);
  const [value9, setValue9] = useState(null);
  const [value10, setValue10] = useState("");

  const cities = [
    {name: "New York", code: "NY"},
    {name: "Rome", code: "RM"},
    {name: "London", code: "LDN"},
    {name: "Istanbul", code: "IST"},
    {name: "Paris", code: "PRS"},
  ];

  useEffect(() => {
    CountryService.getCountries()
      .then((_countries) => {
        setCountries(_countries);
      })
      .catch(() => ({}));
  }, []);

  const searchCountry = (event: AutoCompleteCompleteEvent): void => {
    // in a real application, make a request to a remote url with the query and
    // return filtered results, for demo we filter at client side
    const filtered: Demo.Country[] = [];
    const query = event.query;
    for (const country of countries) {
      if (country.name.toLowerCase().startsWith(query.toLowerCase())) {
        filtered.push(country);
      }
    }
    setFilteredCountries(filtered);
  };

  const onCalendarChange = (e: CalendarChangeEvent): void => {
    setValue3(e.value!);
  };

  return (
    <div className="card">
      <h5>Invalid State</h5>
      <div className="grid p-fluid">
        <div className="col-12 md:col-6">
          <div className="field mt-3">
            <label htmlFor="inputtext">InputText</label>
            <InputText
              className="p-invalid"
              id="inputtext"
              onChange={(e) => {
                setValue1(e.target.value);
              }}
              type="text"
              value={value1}
            />
          </div>
          <div className="field">
            <label htmlFor="autocomplete">AutoComplete</label>
            <AutoComplete
              className="p-invalid"
              completeMethod={searchCountry}
              field="name"
              id="autocomplete"
              onChange={(e) => {
                setValue2(e.value);
              }}
              suggestions={filteredCountries}
              value={value2}
            />
          </div>
          <div className="field">
            <label htmlFor="calendar">Calendar</label>
            <Calendar
              className="p-invalid"
              inputId="calendar"
              onChange={onCalendarChange}
              showIcon
              value={value3}
            />
          </div>
          <div className="field">
            <label htmlFor="chips">Chips</label>
            <Chips
              className="p-invalid"
              inputId="chips"
              onChange={(e) => {
                setValue4(e.value ?? []);
              }}
              value={value4}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              className="p-invalid"
              inputId="password"
              onChange={(e) => {
                setValue5(e.target.value);
              }}
              value={value5}
            />
          </div>
        </div>

        <div className="col-12 md:col-6">
          <div className="field mt-3">
            <label htmlFor="inputmask">InputMask</label>
            <InputMask
              className="p-invalid"
              id="inputmask"
              mask="99/99/9999"
              onChange={(e) => {
                setValue6(e.value ?? "");
              }}
              value={value6}
            />
          </div>
          <div className="field">
            <label htmlFor="inputnumber">InputNumber</label>
            <InputNumber
              className="p-invalid"
              id="inputnumber"
              onValueChange={(e) => {
                setValue7(e.target.value ?? 0);
              }}
              value={value7}
            />
          </div>
          <div className="field">
            <label htmlFor="dropdown">Dropdown</label>
            <Dropdown
              className="p-invalid"
              id="dropdown"
              onChange={(e) => {
                setValue8(e.value);
              }}
              optionLabel="name"
              options={cities}
              value={value8}
            />
          </div>
          <div className="field">
            <label htmlFor="multiselect">MultiSelect</label>
            <MultiSelect
              className="p-invalid"
              id="multiselect"
              onChange={(e) => {
                setValue9(e.value);
              }}
              optionLabel="name"
              options={cities}
              value={value9}
            />
          </div>
          <div className="field">
            <label htmlFor="textarea">Textarea</label>
            <InputTextarea
              className="p-invalid"
              cols={30}
              id="textarea"
              onChange={(e) => {
                setValue10(e.target.value);
              }}
              rows={3}
              value={value10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvalidStateDemo;
