"use client";

import type {ReactElement} from "react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {Toast} from "primereact/toast";
import {MailContext} from "@/src/demo/components/apps/mail/context/mail-context";
import type {Demo} from "@/types/types";

export default function AppMailDetail({
  params,
}: {
  params: {mailId: string};
}): ReactElement {
  const searchParams = useSearchParams();

  const toast = useRef<Toast | null>(null);
  const [mail, setMail] = useState<Demo.Mail | null>(null);
  const [newMail, setNewMail] = useState<Demo.Mail>({
    id: 0,
    from: "",
    to: "",
    email: "",
    image: "",
    title: "",
    message: "",
    date: "",
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true,
  });

  const router = useRouter();
  const {mailId} = params;
  const {mails, onSend} = useContext(MailContext);

  const sendMail = (): void => {
    if (!mail) return;
    if (newMail.message) {
      setNewMail((prevState) => ({
        ...prevState,
        from: mail.from,
        to: mail.from ? mail.from : mail.to,
        image: mail.image,
        title: mail.title,
      }));

      onSend({
        ...newMail,
        from: mail.from,
        to: mail.from ? mail.from : mail.to,
        image: mail.image,
        title: mail.title,
      });
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Mail sent",
      });
      router.push("/apps/mail/inbox");
    }
  };

  const goBack = (): void => {
    router.back();
  };

  useEffect(() => {
    const _mail = mails.filter((m) => m.id === parseInt(mailId))[0];
    setMail(_mail);
  }, [searchParams, mails, mailId]);

  return (
    <div>
      {mail ? (
        <>
          <Toast ref={toast} />
          <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-5 pt-5 md:pt-0 gap-4 md:border-top-none border-top-1 surface-border">
            <div className="flex align-items-center md:justify-content-start">
              <Button
                className="p-button-plain md:mr-3"
                icon="pi pi-chevron-left"
                onClick={goBack}
                text
                type="button"
              />
              {mail.image ? (
                <Avatar
                  className="border-2 surface-border"
                  image={`/demo/images/avatar/${mail.image}`}
                  shape="circle"
                  size="large"
                />
              ) : null}
              <div className="flex flex-column mx-3">
                <span className="block text-900 font-bold text-lg">
                  {mail.from}
                </span>
                <span className="block text-900 font-semibold">
                  To: {mail.email || mail.to}
                </span>
              </div>
            </div>
            <div className="flex align-items-center justify-content-end column-gap-3 px-4 md:px-0">
              <span className="text-900 font-semibold white-space-nowrap mr-auto">
                {mail.date}
              </span>
              <Button
                className=" p-button-plain flex-shrink-0"
                icon="pi pi-reply"
                text
                type="button"
              />
              <Button
                className=" p-button-plain flex-shrink-0"
                icon="pi pi-ellipsis-v"
                text
                type="button"
              />
            </div>
          </div>
          <div className="surface-border border-1 border-round p-4">
            <div className="text-900 font-semibold text-lg mb-3">
              {mail.title}
            </div>
            <p className="line-height-3 mt-0 mb-3">{mail.message}</p>
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
            <div className="flex column-gap-3 justify-content-end p-5 border-top-1 surface-border">
              <Button icon="pi pi-image" outlined type="button" />
              <Button icon="pi pi-paperclip" outlined type="button" />
              <Button
                icon="pi pi-send"
                label="Send"
                onClick={sendMail}
                type="button"
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
