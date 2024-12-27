"use client";
import type { Audience, ListAudience } from "@/lib/validations/audience";
import { Button } from "primereact/button";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useAudienceStore } from "@/stores/use-audience-store";
import React, { useEffect, useState } from "react";
import AddAudienceForm from "../../forms/add-audience-form";
import { useExportAudience } from "@/lib/api/export/export-audience";
import { useParams } from "next/navigation";
import ExportButton from "../export-button";
import { useTranslation } from "react-i18next";
import { useGetAudienceDropdown } from "@/lib/api/audience/get-audience-dropdown";
import MultiSelect from "@/components/ui/multi-select";
import { useFormContext } from "react-hook-form";
import { useGetListAudience } from "@/lib/api/audience/get-list-audience";
import { toast } from "react-toastify";
import { Skeleton } from "primereact/skeleton";

export default function AudienceListCard({ readOnly = false, attend = false, withExport, isLoading }: Readonly<{ readOnly?: boolean, attend?: boolean, withExport?: boolean, isLoading?: boolean }>) {

  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "";

  const [showDialog, setShowDialog] = useState(false);
  const [showDialogGroup, setShowDialogGroup] = useState(false);

  const audience = useAudienceStore((state) => state.audience);
  const removeAudience = useAudienceStore((state) => state.remove);
  const reset = useAudienceStore((state) => state.reset);

  const exportAudience = useExportAudience(eventId);
  const { t } = useTranslation();

  useEffect(() => {
    reset();
  }, []);

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
  const checkboxEditor = (options: ColumnEditorOptions) => {
    return (
      <Checkbox
        checked={options.value}
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.checked);
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData: Audience) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => {
          removeAudience(rowData.email);
        }}
        severity="danger"
        type="button"
      />
    );
  };

  const dropdownAudiences = useGetAudienceDropdown();
  const audienceGroupOptions = dropdownAudiences?.data?.map((audience) => ({
    label: audience.audienceName ?? '',
    value: audience.id,
  })) || [];


  const { watch } = useFormContext();
  const watchAudienceGroupIds = watch("audienceGroupIds");
  const addAudiences = useAudienceStore((state) => state.add);
  const [audiences, setAudiences] = useState<ListAudience>([]);

  const FetchAudiences = async () => {
    const result = await useGetListAudience(watchAudienceGroupIds);
    return result;
  };

  useEffect(() => {
    FetchAudiences()
      .then((p) => { setAudiences(p) })
      .catch((err) => { toast.error(err) });
  }, [watchAudienceGroupIds]);

  const addGroupAudince = () => {
    addAudiences(audiences);
    setShowDialogGroup(false);
  };

  const footerGroup = () => {
    return (
      <div className="tw-flex tw-justify-center tw-gap-4">
        <Button
          className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
          label={t("Ok")}
          onClick={addGroupAudince}
          type="button"
        />
        <Button
          className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
          label={t("Cancel")}
          onClick={() => {
            setShowDialogGroup(false);
          }}
          severity="danger"
          type="button"
        />
      </div>
    )
  }

  const [selectedAudiences, setSelectedAudiences] = useState<Audience[]>();

  useEffect(() => {
    setSelectedAudiences(audience.map((q) => q).filter((a) => a.isAttend));
  }, [audience])

  useEffect(() => {
    audience.map((prev) => {
      prev.isAttend = selectedAudiences?.includes(prev)
      return { ...prev, isAttend: prev.isAttend }
    })
  }, [selectedAudiences])

  if (isLoading) {
    return (
      <Skeleton className='tw-mb-3' height='25vh' width='100%' />
    );
  }

  return (
    <>
      <Dialog
        className="tw-min-w-96 tw-w-[70%] tw-max-w-[1000px] tw-max-h-[1000px] tw-overflow-auto"
        draggable={false}
        footer={footerGroup}
        header={t("Add Audience By Group")}
        onHide={() => {
          setShowDialogGroup(false);
        }}
        pt={{
          content: {
            className: "border-noround-top pt-5 tw-space-y-8",
          },
        }}
        visible={showDialogGroup}
      >
        <div>
          <MultiSelect
            float
            id="audienceGroupIds"
            label={t("Select Audience Group")}
            options={audienceGroupOptions}
            style={{ width: '15em' }}
          />
          <DataTable
            className="tw-mt-5"
            editMode="cell"
            emptyMessage={t("Please add audience by audience group")}
            value={audiences}
          >
            <Column
              body={(rowData, rowIndex) => `${rowIndex.rowIndex + 1}`}
              header={t("No.")}
              headerStyle={{ width: "10%" }}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="name"
              header={t("Name")}
              headerStyle={{ width: "20%" }}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="email"
              header={t("Email")}
              headerStyle={{ width: "20%" }}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="phoneNumber"
              header={t("Phone Number")}
              headerStyle={{ width: "20%" }}
              onCellEditComplete={onCellEditComplete}
            />
          </DataTable>
        </div>
      </Dialog>
      <div className="card tw-space-y-3">
        <Dialog
          className="tw-w-96"
          draggable={false}
          header={t("Add Audience")}
          onHide={() => {
            setShowDialog(false);
          }}
          pt={{
            content: {
              className: "border-noround-top pt-5 tw-space-y-8",
            },
          }}
          visible={showDialog}
        >
          <AddAudienceForm setShowDialog={setShowDialog} />
        </Dialog>


        <div className="tw-flex tw-justify-between tw-items-center">
          <h4>{attend ? t('Audience Attend List') : t('Audience List')}</h4>
          {
            readOnly !== null && readOnly !== undefined && !readOnly && (
              <div className="tw-space-x-4">
                <Button
                  icon="pi pi-users"
                  iconPos="right"
                  label={t("Add By Group")}
                  onClick={() => {
                    setShowDialogGroup(true);
                  }}
                  type="button"
                />
                <Button
                  icon="pi pi-user-plus"
                  iconPos="right"
                  label={t("Add")}
                  onClick={() => {
                    setShowDialog(true);
                  }}
                  type="button"
                />
                {withExport &&
                  <ExportButton action={exportAudience.mutate} outlined />
                }
              </div>
            )}

        </div>

        <DataTable
          editMode="cell"
          emptyMessage={t("Please add audience")}
          onSelectionChange={(e) => { setSelectedAudiences(e.value) }}
          selection={selectedAudiences!}
          selectionMode="checkbox"
          value={audience}
        >
          {
            Boolean(attend) && (
              <Column selectionMode="multiple" style={{ width: "4rem" }} />
            )
          }
          {
            Boolean(attend) && (
              <Column
                body={(rowData: Audience) => {
                  return rowData.isAttend ? t("Yes") : t("No");
                }}
                field="isAttend"
                header={t("Attend")}
                headerStyle={{ width: "20%" }}
                onCellEditComplete={onCellEditComplete}
              />
            )
          }
          <Column
            editor={(options) => textEditor(options)}
            field="name"
            header={t("Name")}
            headerStyle={{ width: "20%" }}
            onCellEditComplete={onCellEditComplete}
          />
          <Column
            editor={(options) => textEditor(options)}
            field="job"
            header={t("Job")}
            headerStyle={{ width: "20%" }}
            onCellEditComplete={onCellEditComplete}
          />
          <Column
            editor={(options) => textEditor(options)}
            field="description"
            header={t("Description")}
            headerStyle={{ width: "20%" }}
            onCellEditComplete={onCellEditComplete}
          />
          <Column
            editor={(options) => textEditor(options)}
            field="phoneNumber"
            header={t("Phone Number")}
            headerStyle={{ width: "20%" }}
            onCellEditComplete={onCellEditComplete}
          />
          <Column
            editor={(options) => textEditor(options)}
            field="email"
            header={t("Email")}
            headerStyle={{ width: "20%" }}
            onCellEditComplete={onCellEditComplete}
          />
          {
            readOnly !== null && readOnly !== undefined && !readOnly && (
              <Column
                body={actionBodyTemplate}
                header={t("Action")}
                headerStyle={{ width: "2rem" }}
              />
            )
          }

        </DataTable>
      </div>
    </>
  );
}
