import type {ReactElement} from "react";
import React, {createContext, useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import type {
  ChildContainerProps,
  Demo,
  MailContextProps,
  MailKeys,
} from "@/types/types";

interface Json {
  data: Demo.Mail[];
}

export const MailContext = createContext({} as MailContextProps);

export function MailProvider(props: ChildContainerProps): ReactElement {
  const [mails, setMails] = useState<Demo.Mail[]>([]);
  const toastRef = useRef<Toast | null>(null);

  const getMails = (): Promise<Demo.Mail[]> => {
    return fetch("/demo/data/mail.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res: Response) => res.json())
      .then((d: Json) => d.data);
  };

  useEffect(() => {
    getMails()
      .then((data) => {
        setMails(data);
      })
      .catch(() => ({}));
  }, []);

  const updateMails = (data: Demo.Mail[]): void => {
    setMails(data);
  };

  const clearMailActions = (mail: Demo.Mail): void => {
    Object.keys(mail).forEach((key: string) => {
      if (mail[key as MailKeys]) {
        mail[key as MailKeys] = false;
      }
    });
  };

  const onStar = (id: number): void => {
    const _mails = mails.map((m) =>
      m.id === id ? {...m, starred: !m.starred} : m
    );
    setMails(_mails);
  };

  const onArchive = (id: number): void => {
    const _mails = mails.map((m) =>
      m.id === id ? {...m, archived: !m.archived} : m
    );
    setMails(_mails);
  };

  const onBookmark = (id: number): void => {
    const _mails = mails.map((m) =>
      m.id === id ? {...m, important: !m.important} : m
    );
    setMails(_mails);
  };

  const onDelete = (id: number): void => {
    const _mails = mails.splice(
      mails.findIndex((m) => m.id === id),
      1
    );
    setMails(_mails);
  };

  const onDeleteMultiple = (mailArray: Demo.Mail[]): void => {
    const idArray = mailArray.map((m) => Number(m.id));
    const updatedMails = mails.map((mail) => {
      if (!idArray.includes(mail.id)) {
        return mail;
      }
      return {...mail, trash: true};
    });
    setMails(updatedMails);
  };

  const onArchiveMultiple = (mailArray: Demo.Mail[]): void => {
    const idArray = mailArray.map((m) => m.id);

    const updatedMails = mails.map((mail) => {
      if (idArray.includes(mail.id)) {
        return {...mail, archived: true};
      }
      return mail;
    });
    setMails(updatedMails);
  };

  const onSpamMultiple = (mailArray: Demo.Mail[]): void => {
    const idArray = mailArray.map((m) => m.id);

    const updatedMails = mails.map((mail) => {
      if (idArray.includes(mail.id)) {
        return {
          ...mail,
          spam: true,
          important: false,
          starred: false,
          archived: false,
        };
      }
      return mail;
    });
    setMails(updatedMails);
  };

  const onTrash = (id: number): void => {
    const _mails = mails.map((m) =>
      m.id === id
        ? {
            ...m,
            trash: true,
            spam: false,
            important: false,
            starred: false,
            archived: false,
          }
        : m
    );
    setMails(_mails);
  };

  const onSend = (mail: Demo.Mail): void => {
    const _mails: Demo.Mail[] = mails;
    if (!mail.title) {
      mail.title = "Untitled";
    }

    _mails.push(mail);
    setMails(_mails);
  };

  const value = {
    mails,
    toastRef,
    updateMails,
    clearMailActions,
    onStar,
    onArchive,
    onBookmark,
    onDelete,
    onDeleteMultiple,
    onArchiveMultiple,
    onSpamMultiple,
    onTrash,
    onSend,
  };

  return (
    <>
      <Toast ref={toastRef} />
      <MailContext.Provider value={value}>
        {props.children}
      </MailContext.Provider>
    </>
  );
}
