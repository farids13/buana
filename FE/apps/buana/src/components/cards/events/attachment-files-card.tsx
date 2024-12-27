import { useDeleteFile } from "@/lib/api/storage/delete-file";
import { useDownloadFile } from "@/lib/api/storage/download-file";
import { API_URL } from "@/lib/http";
import { useAuthStore } from "@/stores/use-auth-store";
import { Button } from "primereact/button";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Storage } from "@/lib/validations/storage";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type AttachmentFilesCardProps = {
  post?: boolean;
};

export default function AttachmentFilesCard({
  post = false,
}: AttachmentFilesCardProps) {
  const fileUploadRef = useRef<FileUpload>(null);
  

  const { control, watch, getValues } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onCellEditComplete = (e: ColumnEvent) => {
    const { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    event.preventDefault();
  };
  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        type="text"
        value={options.value}
      />
    );
  };

  const downloadFile = useDownloadFile();
  const deleteFile = useDeleteFile();
  const actionBodyFileTemplate = (rowData: Storage) => {
    return (
      <div className="tw-flex tw-gap-2">
        <Button
          icon="pi pi-download"
          onClick={(e) => {
            e.preventDefault();
            downloadFile.mutate(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          onClick={(e) => {
            e.preventDefault();
            deleteFile.mutate(rowData.storageId);

            const index = getValues("files")?.findIndex(
              (item: Storage) => item.storageId === rowData.storageId,
            );
            remove(index);
          }}
          severity="danger"
        />
      </div>
    );
  };

  const files = watch("files");
  let filteredFiles = [];

  if (files) {
    if (post) {
      filteredFiles = files.filter((item: Storage) => item.type === "RESULT");
    } else {
      filteredFiles = files.filter(
        (item: Storage) => item.type === "ATTACHMENT",
      );
    }
  }

  const [onSelect, setOnSelect] = useState(false);
  const {t} = useTranslation();

  return (
    <div className="card tw-space-y-3">
      <div className="tw-flex tw-justify-between tw-items-center">
        <h4>{post ? t("Result files") : t("Attachment files")}</h4>
        <div className="tw-flex tw-space-x-2">
          <FileUpload
            accept="image/*"
            chooseLabel={t('Choose')}
            maxFileSize={2 * 1024 * 1024}
            mode="basic"
            name="file"
            onBeforeSend={(e) => {
              e.xhr.setRequestHeader(
                "Authorization",
                `Bearer ${useAuthStore.getState().access_token}`,
              );
            }}
            onSelect={() => {
              setOnSelect(true);
            }}
            onUpload={(e) => {
              e.files.forEach((item) => {
                append({
                  name: item.name.split(".").shift() ?? "",
                  format: item.name.split(".").pop()?.toLowerCase() ?? "",
                  storageId: JSON.parse(e.xhr.response).id,
                  type: post ? "RESULT" : "ATTACHMENT",
                });
              });
            }}
            ref={fileUploadRef}
            url={`${API_URL}/storage/agenda`}
          />
          {onSelect ? (
            <Button
              icon="pi pi-trash"
              onClick={() => {
                setOnSelect(false);
                fileUploadRef.current?.clear();
              }}
              severity="danger"
              type="button"
            />
          ) : null}
        </div>
      </div>
      <DataTable
        editMode="cell"
        emptyMessage={t("Please add attachment files")}
        value={filteredFiles}
      >
        <Column
          editor={(options) => textEditor(options)}
          field="name"
          header={t("Name")}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          editor={(options) => textEditor(options)}
          field="format"
          header={t("Format")}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          body={actionBodyFileTemplate}
          header={t("Action")}
          headerStyle={{ width: "2rem" }}
        />
      </DataTable>
    </div>
  );
}
