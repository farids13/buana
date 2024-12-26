"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect, useContext} from "react";
import {MailContext} from "@/src/demo/components/apps/mail/context/mail-context";
import AppMailTable from "@/src/demo/components/apps/mail/app-mail-table";
import type {Demo} from "@/types/types";

export default function MailSent(): ReactElement {
  const [sentMails, setSentMails] = useState<Demo.Mail[]>([]);
  const {mails} = useContext(MailContext);
  useEffect(() => {
    const _mails = mails.filter((d) => d.sent && !d.trash && !d.archived);
    setSentMails(_mails);
  }, [mails]);

  return <AppMailTable mails={sentMails} />;
}
