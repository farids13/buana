"use client";
import type {AutoCompleteCompleteEvent} from "primereact/autocomplete";
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import type {CheckboxChangeEvent} from "primereact/checkbox";
import {Checkbox} from "primereact/checkbox";
import {Chips} from "primereact/chips";
import type {
  ColorPickerHSBType,
  ColorPickerRGBType,
} from "primereact/colorpicker";
import {ColorPicker} from "primereact/colorpicker";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Knob} from "primereact/knob";
import {ListBox} from "primereact/listbox";
import {MultiSelect} from "primereact/multiselect";
import {RadioButton} from "primereact/radiobutton";
import {Rating} from "primereact/rating";
import {SelectButton} from "primereact/selectbutton";
import {Slider} from "primereact/slider";
import {ToggleButton} from "primereact/togglebutton";
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";
import {CountryService} from "@/src/demo/service/country-service";
import type {Demo} from "@/types/types";

interface InputValue {
  name: string;
  code: string;
}

function InputDemo(): ReactElement {
  const [floatValue, setFloatValue] = useState("");
  const [autoValue, setAutoValue] = useState<Demo.Country[]>([]);
  const [selectedAutoValue, setSelectedAutoValue] = useState(null);
  const [autoFilteredValue, setAutoFilteredValue] = useState<Demo.Country[]>(
    []
  );
  const [calendarValue, setCalendarValue] = useState<
    string | Date | Date[] | null
  >(null);
  const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
  const [chipsValue, setChipsValue] = useState<any[]>([]);
  const [sliderValue, setSliderValue] = useState<number | string>("");
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [colorValue, setColorValue] = useState<
    string | ColorPickerRGBType | ColorPickerHSBType
  >("1976D2");
  const [knobValue, setKnobValue] = useState(20);
  const [radioValue, setRadioValue] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  const [switchValue, setSwitchValue] = useState(false);
  const [listboxValue, setListboxValue] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [multiselectValue, setMultiselectValue] = useState(null);
  const [toggleValue, setToggleValue] = useState(false);
  const [selectButtonValue1, setSelectButtonValue1] = useState(null);
  const [selectButtonValue2, setSelectButtonValue2] = useState(null);
  const [inputGroupValue, setInputGroupValue] = useState(false);

  const listboxValues: InputValue[] = [
    {name: "New York", code: "NY"},
    {name: "Rome", code: "RM"},
    {name: "London", code: "LDN"},
    {name: "Istanbul", code: "IST"},
    {name: "Paris", code: "PRS"},
  ];

  const dropdownValues: InputValue[] = [
    {name: "New York", code: "NY"},
    {name: "Rome", code: "RM"},
    {name: "London", code: "LDN"},
    {name: "Istanbul", code: "IST"},
    {name: "Paris", code: "PRS"},
  ];

  const multiselectValues: InputValue[] = [
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
  ];

  const selectButtonValues1: InputValue[] = [
    {name: "Option 1", code: "O1"},
    {name: "Option 2", code: "O2"},
    {name: "Option 3", code: "O3"},
  ];

  const selectButtonValues2: InputValue[] = [
    {name: "Option 1", code: "O1"},
    {name: "Option 2", code: "O2"},
    {name: "Option 3", code: "O3"},
  ];

  useEffect(() => {
    CountryService.getCountries()
      .then((data) => {
        setAutoValue(data);
      })
      .catch(() => ({}));
  }, []);

  const searchCountry = (event: AutoCompleteCompleteEvent): void => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...autoValue]);
      } else {
        setAutoFilteredValue(
          autoValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent): void => {
    const selectedValue = [...checkboxValue];
    if (e.checked) selectedValue.push(e.value);
    else selectedValue.splice(selectedValue.indexOf(e.value), 1);

    setCheckboxValue(selectedValue);
  };

  const itemTemplate = (option: InputValue): ReactElement => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          className={`flag flag-${option.code.toLowerCase()}`}
          onError={(e) =>
            (e.currentTarget.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          src="/demo/images/flag/flag_placeholder.png"
          style={{width: "21px"}}
        />
        <span className="ml-2">{option.name}</span>
      </div>
    );
  };

  return (
    <div className="grid p-fluid input-demo">
      <div className="col-12 md:col-6">
        <div className="card">
          <h5>InputText</h5>
          <div className="grid formgrid">
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <InputText placeholder="Default" type="text" />
            </div>
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <InputText disabled placeholder="Disabled" type="text" />
            </div>
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <InputText
                className="p-invalid"
                placeholder="Invalid"
                type="text"
              />
            </div>
          </div>

          <h5>Icons</h5>
          <div className="grid formgrid">
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText placeholder="Username" type="text" />
              </span>
            </div>
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <span className="p-input-icon-right">
                <InputText placeholder="Search" type="text" />
                <i className="pi pi-search" />
              </span>
            </div>
            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
              <span className="p-input-icon-left p-input-icon-right">
                <i className="pi pi-user" />
                <InputText placeholder="Search" type="text" />
                <i className="pi pi-search" />
              </span>
            </div>
          </div>

          <h5>Float Label</h5>
          <span className="p-float-label">
            <InputText
              id="username"
              onChange={(e) => {
                setFloatValue(e.target.value);
              }}
              type="text"
              value={floatValue}
            />
            <label htmlFor="username">Username</label>
          </span>

          <h5>Textarea</h5>
          <InputTextarea cols={30} placeholder="Your Message" rows={5} />

          <h5>AutoComplete</h5>
          <AutoComplete
            completeMethod={searchCountry}
            dropdown
            field="name"
            id="dd"
            multiple
            onChange={(e) => {
              setSelectedAutoValue(e.value);
            }}
            placeholder="Search"
            suggestions={autoFilteredValue}
            value={selectedAutoValue}
          />

          <h5>Calendar</h5>
          <Calendar
            onChange={(e) => {
              setCalendarValue(e.value ?? null);
            }}
            showButtonBar
            showIcon
            value={calendarValue}
          />

          <h5>InputNumber</h5>
          <InputNumber
            mode="decimal"
            onValueChange={(e) => {
              setInputNumberValue(e.value ?? null);
            }}
            showButtons
            value={inputNumberValue}
          />

          <h5>Chips</h5>
          <Chips
            onChange={(e) => {
              setChipsValue(e.value ?? []);
            }}
            value={chipsValue}
          />
        </div>

        <div className="card">
          <div className="grid">
            <div className="col-12">
              <h5>Slider</h5>
              <InputText
                onChange={(e) => {
                  setSliderValue(parseInt(e.target.value, 10));
                }}
                value={sliderValue as string}
              />
              <Slider
                onChange={(e) => {
                  setSliderValue(e.value as number);
                }}
                value={sliderValue as number}
              />
            </div>
            <div className="col-12 md:col-6">
              <h5>Rating</h5>
              <Rating
                onChange={(e) => {
                  setRatingValue(e.value ?? 0);
                }}
                value={ratingValue!}
              />
            </div>
            <div className="col-12 md:col-6">
              <h5>ColorPicker</h5>
              <ColorPicker
                onChange={(e) => {
                  setColorValue(e.value ?? "");
                }}
                style={{width: "2rem"}}
                value={colorValue}
              />
            </div>
            <div className="col-12">
              <h5>Knob</h5>
              <Knob
                max={50}
                min={-50}
                onChange={(e) => {
                  setKnobValue(e.value);
                }}
                step={10}
                value={knobValue}
                valueTemplate="{value}%"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card">
          <h5>RadioButton</h5>
          <div className="grid">
            <div className="col-12 md:col-4">
              <div className="field-radiobutton">
                <RadioButton
                  checked={radioValue === "Chicago"}
                  inputId="option1"
                  name="option"
                  onChange={(e) => {
                    setRadioValue(e.value);
                  }}
                  value="Chicago"
                />
                <label htmlFor="option1">Chicago</label>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="field-radiobutton">
                <RadioButton
                  checked={radioValue === "Los Angeles"}
                  inputId="option2"
                  name="option"
                  onChange={(e) => {
                    setRadioValue(e.value);
                  }}
                  value="Los Angeles"
                />
                <label htmlFor="option2">Los Angeles</label>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="field-radiobutton">
                <RadioButton
                  checked={radioValue === "New York"}
                  inputId="option3"
                  name="option"
                  onChange={(e) => {
                    setRadioValue(e.value);
                  }}
                  value="New York"
                />
                <label htmlFor="option3">New York</label>
              </div>
            </div>
          </div>

          <h5>Checkbox</h5>
          <div className="grid">
            <div className="col-12 md:col-4">
              <div className="field-checkbox">
                <Checkbox
                  checked={checkboxValue.includes("Chicago")}
                  inputId="checkOption1"
                  name="option"
                  onChange={onCheckboxChange}
                  value="Chicago"
                />
                <label htmlFor="checkOption1">Chicago</label>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="field-checkbox">
                <Checkbox
                  checked={checkboxValue.includes("Los Angeles")}
                  inputId="checkOption2"
                  name="option"
                  onChange={onCheckboxChange}
                  value="Los Angeles"
                />
                <label htmlFor="checkOption2">Los Angeles</label>
              </div>
            </div>
            <div className="col-12 md:col-4">
              <div className="field-checkbox">
                <Checkbox
                  checked={checkboxValue.includes("New York")}
                  inputId="checkOption3"
                  name="option"
                  onChange={onCheckboxChange}
                  value="New York"
                />
                <label htmlFor="checkOption3">New York</label>
              </div>
            </div>
          </div>

          <h5>Input Switch</h5>
          <InputSwitch
            checked={switchValue}
            onChange={(e) => {
              setSwitchValue(e.value ?? false);
            }}
          />
        </div>

        <div className="card">
          <h5>Listbox</h5>
          <ListBox
            filter
            onChange={(e) => {
              setListboxValue(e.value);
            }}
            optionLabel="name"
            options={listboxValues}
            value={listboxValue}
          />

          <h5>Dropdown</h5>
          <Dropdown
            onChange={(e) => {
              setDropdownValue(e.value);
            }}
            optionLabel="name"
            options={dropdownValues}
            placeholder="Select"
            value={dropdownValue}
          />

          <h5>MultiSelect</h5>
          <MultiSelect
            className="multiselect-custom"
            display="chip"
            filter
            itemTemplate={itemTemplate}
            onChange={(e) => {
              setMultiselectValue(e.value);
            }}
            optionLabel="name"
            options={multiselectValues}
            placeholder="Select Countries"
            value={multiselectValue}
          />
        </div>

        <div className="card">
          <h5>ToggleButton</h5>
          <ToggleButton
            checked={toggleValue}
            offLabel="No"
            onChange={(e) => {
              setToggleValue(e.value);
            }}
            onLabel="Yes"
          />

          <h5>SelectButton</h5>
          <SelectButton
            onChange={(e) => {
              setSelectButtonValue1(e.value);
            }}
            optionLabel="name"
            options={selectButtonValues1}
            value={selectButtonValue1}
          />

          <h5>SelectButton - Multiple</h5>
          <SelectButton
            multiple
            onChange={(e) => {
              setSelectButtonValue2(e.value);
            }}
            optionLabel="name"
            options={selectButtonValues2}
            value={selectButtonValue2}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Input Groups</h5>
          <div className="grid p-fluid">
            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user" />
                </span>
                <InputText placeholder="Username" />
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-shopping-cart" />
                </span>
                <span className="p-inputgroup-addon">
                  <i className="pi pi-globe" />
                </span>
                <InputText placeholder="Price" />
                <span className="p-inputgroup-addon">$</span>
                <span className="p-inputgroup-addon">.00</span>
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <Button label="Search" />
                <InputText placeholder="Keyword" />
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                  <Checkbox
                    checked={inputGroupValue}
                    onChange={(e) => {
                      setInputGroupValue(e.checked ?? false);
                    }}
                  />
                </span>
                <InputText placeholder="Confirm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputDemo;
