"use client";
import type {ReactElement} from "react";
import React, {useState, useContext} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import {LayoutContext} from "@/src/layout/context/layout-context";
import {nanoid} from "nanoid";

function Contact(): ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [content, setContent] = useState([
    {icon: "pi pi-fw pi-phone", title: "Phone", info: "1 (833) 597-7538"},
    {
      icon: "pi pi-fw pi-map-marker",
      title: "Our Head Office",
      info: "Churchill-laan 16 II, 1052 CD, Amsterdam",
    },
    {icon: "pi pi-fw pi-print", title: "Fax", info: "3 (833) 297-1548"},
  ]);
  const {layoutConfig} = useContext(LayoutContext);
  return (
    <div
      className="grid card grid-nogutter"
      style={{columnGap: "2rem", rowGap: "2rem"}}
    >
      <div className="col-12">
        <p className="text-900 font-bold">Contact Us</p>
      </div>
      <div
        className="col-12 mt-3 h-20rem border-1 surface-border p-0 w-full bg-cover border-round"
        style={{
          backgroundImage: `url('/demo/images/contact/map-${
            layoutConfig.colorScheme === "light" ? "light" : "dark"
          }.svg')`,
        }}
      />
      <div className="col-12 mt-5">
        <div
          className="grid grid-nogutter px-2 flex-column md:flex-row"
          style={{columnGap: "2rem", rowGap: "2rem"}}
        >
          {content.map((item) => {
            return (
              <div
                className="col flex flex-column justify-content-center text-center align-items-center border-1 surface-border py-5 px-4 border-round"
                key={nanoid()}
              >
                <i
                  className={classNames(
                    "pi pi-fw text-2xl text-primary",
                    item.icon
                  )}
                />
                <span className="text-900 font-bold mt-4 mb-1">
                  {item.title}
                </span>
                <span className="text-500">{item.info}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-12 mt-5">
        <p className="text-900 font-bold">Send Us Email</p>
        <div
          className="grid flex-column md:flex-row formgrid grid-nogutter mt-6"
          style={{rowGap: "2rem", columnGap: "2rem"}}
        >
          <div className="field col">
            <label className="block text-primary font-bold" htmlFor="name">
              Name
            </label>
            <span
              className="p-input-icon-left w-full"
              style={{height: "3.5rem"}}
            >
              <i className="pi pi-user" style={{left: "1.5rem"}} />
              <InputText
                className="w-full px-7 text-900 font-semibold"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
                style={{height: "3.5rem"}}
                type="text"
                value={name}
              />
            </span>
          </div>

          <div className="field col">
            <label className="block text-primary font-bold" htmlFor="email">
              Email Address
            </label>
            <span
              className="p-input-icon-left w-full"
              style={{height: "3.5rem"}}
            >
              <i className="pi pi-envelope" style={{left: "1.5rem"}} />
              <InputText
                className="w-full px-7 text-900 font-semibold"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                style={{height: "3.5rem"}}
                type="text"
                value={email}
              />
            </span>
          </div>

          <div className="field col-12 flex flex-column">
            <label className="block text-primary font-bold" htmlFor="message">
              Message
            </label>
            <InputTextarea
              cols={30}
              id="message"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              rows={5}
              value={message}
            />
            <Button
              className="ml-auto mt-3 border-round"
              label="Send Message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
