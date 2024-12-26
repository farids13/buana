"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect, useContext} from "react";
import {MailContext} from "@/src/demo/components/apps/mail/context/mail-context";
import AppMailTable from "@/src/demo/components/apps/mail/app-mail-table";
import type {Demo} from "@/types/types";

export default function MailSpam(): ReactElement {
  const [spamMails, setSpamMails] = useState<Demo.Mail[]>([]);
  const {mails} = useContext(MailContext);
  useEffect(() => {
    const _mails = mails.filter(
      (d) =>
        d.spam &&
        !d.archived &&
        !d.trash &&
        !Object.prototype.hasOwnProperty.call(d, "sent")
    );
    setSpamMails(_mails);
  }, [mails]);

  return <AppMailTable mails={spamMails} />;
}
