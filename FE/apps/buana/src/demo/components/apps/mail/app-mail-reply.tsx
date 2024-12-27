import type {ReactElement} from "react";
import React, {useContext, useState} from "react";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import {Tooltip} from "primereact/tooltip";
import type {AppMailReplyProps, Demo} from "@/types/types";
import {MailContext} from "./context/mail-context";

export default function AppMailReply(props: AppMailReplyProps): ReactElement {
  const content = props.content;
  const [newMail, setNewMail] = useState<Demo.Mail>({
    id: 0,
    from: content?.from ?? "",
    to: content?.to ?? "",
    email: "",
    image: "",
    title: content?.title ?? "",
    message: "",
    date: "",
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true,
  });
  const [displayMessage, setDisplayMessage] = useState(false);
  const {onSend, toastRef} = useContext(MailContext);

  const sendMail = (): void => {
    const {image, from, title} = content ?? {
      image: "",
      from: "",
      title: "",
    };
    setNewMail(
      (prevState): Demo.Mail => ({
        ...prevState,
        to: from,
        title,
        image,
      })
    );
    onSend(newMail);

    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Mail sent",
    });
    props.hide();
  };

  const toggleMessage = (): void => {
    setDisplayMessage((prevState) => !prevState);
  };

  return (
    <>
      {content ? (
        <div className="p-0 m-0">
          <div className="surface-section grid grid-nogutter formgrid flex-column md:flex-row gap-6 p-5 border-round">
            <div className="col">
              <label className="block text-900 font-semibold mb-3" htmlFor="to">
                To
              </label>
              <span
                className="p-input-icon-left w-full"
                style={{height: "3.5rem"}}
              >
                <i className="pi pi-user" style={{left: "1.5rem"}} />
                <InputText
                  className="w-full pl-7 text-900 font-semibold"
                  id="to"
                  onChange={(e) => {
                    setNewMail((prevState) => ({
                      ...prevState,
                      from: e.target.value,
                    }));
                  }}
                  style={{height: "3.5rem"}}
                  type="text"
                  value={newMail.from}
                />
              </span>
            </div>
            <div className="col">
              <label
                className="block text-900 font-semibold mb-3"
                htmlFor="Subject"
              >
                Subject
              </label>
              <span
                className="p-input-icon-left w-full"
                style={{height: "3.5rem"}}
              >
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
                  type="text"
                  value={newMail.title}
                />
              </span>
            </div>
            {displayMessage ? (
              <div className="border-1 surface-border border-round p-4">
                {content.message}
              </div>
            ) : null}
            <div className="col-12 field">
              <Tooltip
                content={displayMessage ? "Hide Content" : "Show Content"}
                target=".toggle-content"
              />
              <span
                className="toggle-content surface-ground cursor-pointer border-round px-2"
                onClick={toggleMessage}
              >
                <i className="pi pi-ellipsis-h" />
              </span>
              <Editor
                className="mt-3"
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
          </div>
          <div className="flex column-gap-3 justify-content-end p-5 border-top-1 surface-border">
            <Button icon="pi pi-image" outlined type="button" />
            <Button icon="pi pi-paperclip" outlined type="button" />
            <Button
              className="h-3rem"
              icon="pi pi-send"
              label="Send"
              onClick={sendMail}
              type="button"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
