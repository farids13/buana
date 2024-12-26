"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect, useContext} from "react";
import {Toast} from "primereact/toast";
import {MailContext} from "@/src/demo/components/apps/mail/context/mail-context";
import AppMailTable from "@/src/demo/components/apps/mail/app-mail-table";
import type {Demo} from "@/types/types";

export default function MailImportant(): ReactElement {
  const [importantMails, setImportantMails] = useState<Demo.Mail[]>([]);
  const {mails} = useContext(MailContext);
  useEffect(() => {
    const _mails = mails.filter(
      (d) => d.important && !d.spam && !d.trash && !d.archived
    );
    setImportantMails(_mails);
  }, [mails]);

  return (
    <>
      <Toast />
      <AppMailTable mails={importantMails} />
    </>
  );
}
