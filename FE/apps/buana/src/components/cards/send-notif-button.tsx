"use client";
import { useSendEmailNotification } from "@/lib/api/event/send-email-notification";
import { useSendNotification } from "@/lib/api/event/send-notification";
import { useAudienceStore } from "@/stores/use-audience-store";
import { getAccessToken } from "@/utils/oauth-utils";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SendNotifButton({linkValue}: {linkValue:string}) {
  const { id } = useParams();
  const { mutate, isPending } = useSendNotification(id as string, linkValue);
  const sendEmail = useSendEmailNotification();
  const {t} = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const audience = useAudienceStore((state) => state.audience);
  const keyStorageCallback = 'accessTokenNotification';
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(keyStorageCallback),
  );

  const sendEmailMutation = () => {
    const scope = `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.send https://mail.google.com/`;
    const redirectUri = "/events/callback/notification";
    getAccessToken({redirectUri, scope });
  };


  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem(keyStorageCallback));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (accessToken) { 
      sendEmail.mutate({eventId: id as string, accessToken, eventLink: linkValue});
      localStorage.removeItem(keyStorageCallback);
    }
  }, [accessToken]);


  const footer = (
    <div className="tw-flex tw-gap-3 tw-justify-end">
      <Button className="p-" label="Cancel" outlined type="button" />
      <Button label="Yes" onClick={sendEmailMutation} type="button" />
    </div>
  );  

  return (
    <>
    <Button
      icon="pi pi-share-alt"
      label={t("Send Notif")}
      loading={isPending}
      onClick={() => {
        setShowDialog(true);

      }}
      type="button"
    />

    <Dialog 
      className="tw-min-w-fit"
      draggable={false}
      footer={footer}
      header={t("Notification Confirmation")}
      onHide={() => {
        setShowDialog(false);
      }}
      pt={{
        content: {
          className: "border-noround-top pt-5 tw-space-y-8 tw-min-w-[400px]",
        },
      }}
      visible={showDialog}
      >
        <div className="tw-flex tw-gap-5 tw-items-center">
          <i className="pi pi-info-circle" style={{ fontSize: '2rem' }} />
          <p>Please check the table below before sending the notification.</p>
        </div>
      <DataTable
        className="-tw-mt-10"
        editMode="cell"
        emptyMessage={t("List Number Whatsapp")}
        value={audience}
      >
        <Column body={(row, column) => column.rowIndex + 1} header={t("No.")} style={{ width: "10%" }}  />
        <Column field="name" header={t("Name")}/>
        <Column field="email" header={t("Email")}/>
        <Column field="phoneNumber" header={t("Phone Number")}/>
      </DataTable>

    </Dialog>
    
    </>
    
  );
}
