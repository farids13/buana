"use client";

import {useRouter} from "next/navigation";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import type {ReactElement} from "react";
import React, {useContext, useState} from "react";
import {MailContext} from "@/src/demo/components/apps/mail/context/mail-context";
import type {Demo} from "@/types/types";

export default function AppMailCompose(): ReactElement {
  const {onSend, toastRef} = useContext(MailContext);
  const router = useRouter();
  const generateId = (): string => {
    let text = "";
    const possible = "0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  const generateDate = (): string => {
    return new Date().toDateString().split(" ").slice(1, 4).join(" ");
  };
  const [newMail, setNewMail] = useState<Demo.Mail>({
    id: parseInt(generateId()),
    from: "",
    to: "",
    email: "",
    image: "",
    title: "",
    message: "",
    date: generateDate(),
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true,
  });

  const sendMail = (): void => {
    if (newMail.message) {
      onSend(newMail);
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Mail sent",
      });
      router.push("/apps/mail/inbox");
    } else
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter a message",
      });
  };

  const goBack = (): void => {
    router.back();
  };

  return (
    <>
      <div className="flex align-items-center px-4 md:px-0 border-top-1 surface-border md:border-none pt-4 md:pt-0">
        <Button
          className="surface-border text-900 w-3rem h-3rem mr-3"
          icon="pi pi-chevron-left"
          onClick={goBack}
          outlined
          severity="secondary"
          type="button"
        />
        <span className="block text-900 font-bold text-xl">
          Compose Message
        </span>
      </div>
      <div className="surface-section grid mt-4 grid-nogutter formgrid p-4 gap-3 md:surface-border md:border-1 border-round">
        <div className="col-12 field">
          <label className="text-900 font-semibold" htmlFor="to">
            To
          </label>
          <span className="p-input-icon-left w-full" style={{height: "3.5rem"}}>
            <i className="pi pi-user" style={{left: "1.5rem"}} />
            <InputText
              className="w-full pl-7 text-900 font-semibold"
              id="to"
              onChange={(e) => {
                setNewMail((prevState) => ({
                  ...prevState,
                  to: e.target.value,
                }));
              }}
              placeholder="To"
              style={{height: "3.5rem"}}
              value={newMail.to}
            />
          </span>
        </div>
        <div className="col-12 field">
          <label className="text-900 font-semibold" htmlFor="Subject">
            Subject
          </label>
          <span className="p-input-icon-left w-full" style={{height: "3.5rem"}}>
            <i className="pi pi-pencil" style={{left: "1.5rem"}} />
            <InputText
              className="w-full pl-7 text-900 font-semibold"
              id="subject"
              onChange={(e) => {
                setNewMail((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              placeholder="Subject"
              style={{height: "3.5rem"}}
              value={newMail.title}
            />
          </span>
        </div>
        <div className="col-12 field">
          <Editor
            onTextChange={(e) => {
              setNewMail((prevState) => ({
                ...prevState,
                message: e.textValue,
              }));
            }}
            style={{height: "250px"}}
            value={newMail.message}
          />
        </div>
        <div className="col-12 flex column-gap-3 justify-content-end">
          <Button
            className="h-3rem w-full sm:w-auto"
            icon="pi pi-send"
            label="Send Message"
            onClick={sendMail}
            type="button"
          />
        </div>
      </div>
    </>
  );
}
