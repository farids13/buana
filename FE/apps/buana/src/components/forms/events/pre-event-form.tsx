"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import type { EventFormValues } from "@/lib/validations/event";
import {
  createLinkGmeetSchema,
  eventFormSchema,
} from "@/lib/validations/event";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import CalendarInput from "@/components/ui/calendar-input";
import type { EventStatus } from "@/lib/api/event/insert-event";
import { useInsertEvent } from "@/lib/api/event/insert-event";
import Dropdown from "../../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import { DataTable } from "primereact/datatable";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import { Dialog } from "primereact/dialog";
import AddScheduleProgramForm from "../add-schedule-program-form";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useUpdateEvent } from "@/lib/api/event/update-event";
import { useParams } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import AudienceListCard from "../../cards/events/audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useGetEventAddressDropdown } from "@/lib/api/event-address/get-event-address-dropdown";
import { useInsertEventAddress } from "@/lib/api/event-address/insert-event-address";
import AttachmentFilesCard from "@/components/cards/events/attachment-files-card";
import { useCreateLinkMeet } from "@/lib/api/event/create-link-meet";
import { getLocalISODateTime } from "@/utils/date-utils";
import { v4 } from "uuid";
import iconMeet from "~/svg/google-meet.svg";
import { toast } from "react-toastify";
import Switch from "../../ui/switch";
import SendNotifButton from "../../cards/send-notif-button";
import { useTranslation } from "react-i18next";
import DropdownEventCategoryCard from "@/components/cards/events/dropdown-event-category-card";
import { baseUrl } from "@/utils/oauth-utils";

type EventFormProps = {
  edit?: boolean;
};
export default function PreEventForm({ edit }: Readonly<EventFormProps>): ReactElement {

  const { id } = useParams();

  const { data: values } = useGetEventDetail(id as string);
  const { t } = useTranslation();

  const [showDialog, setShowDialog] = useState(false);
  const [eventState, setEventState] = useState<EventStatus>("ACTIVE");
  const insertEvent = useInsertEvent();
  const updateEvent = useUpdateEvent();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, watch, resetField, setValue, getValues, control } =
    methods;
  const { replace } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = handleSubmit((data) => {
    if (data.isOnline) {
      resetField("province");
      resetField("district");
      resetField("address");
    } else {
      resetField("linkUrl");
    }
    edit
      ? updateEvent.mutate({
        ...data,
        id: id as string,
        schedules: scheduleProgram,
        status: eventState,
        audienceUsers: useAudienceStore.getState().audience,
      })
      : insertEvent.mutate({
        ...data,
        schedules: scheduleProgram,
        status: eventState,
        audienceUsers: useAudienceStore.getState().audience,
      });
  });

  const province = useGetProvince();
  const district = useGetDistrict(watch("provinceId"));

  const eventAddress = useGetEventAddressDropdown();
  const watchLocationValue = watch("locationValue");
  useEffect(() => {
    setValue(
      "provinceId",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.provinceId,
    );
    setValue(
      "districtId",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.districtId,
    );
    setValue(
      "address",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.address,
    );
  }, [watchLocationValue, eventAddress.data]);

  const insertEventAddressPreset = useInsertEventAddress();

  const setAudience = useAudienceStore((state) => state.set);

  const scheduleProgram = useScheduleProgramStore(
    (state) => state.scheduleProgram,
  );
  const reset = useScheduleProgramStore((state) => state.reset);
  const setScheduleProgram = useScheduleProgramStore((state) => state.set);
  const removeScheduleProgram = useScheduleProgramStore(
    (state) => state.remove,
  );

  const onCellEditComplete = (e: ColumnEvent) => {
    const { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    event.preventDefault();
  };
  const dateEditor = (options: ColumnEditorOptions) => {
    return (
      <Calendar
        dateFormat="dd-mm-yy"
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        value={options.value}
      />
    );
  };
  const timeEditor = (options: ColumnEditorOptions) => {
    return (
      <Calendar
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        timeOnly
        value={options.value}
      />
    );
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

  useEffect(() => {
    reset();
    if (values?.schedules) {
      setScheduleProgram(values.schedules);
    }
    if (values?.files) {
      replace(values.files);
    }
    if (values?.audienceUsers) {
      setAudience(values.audienceUsers);
    }
  }, [values]);

  const dateBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.date).format("DD-MM-YYYY");
  const actionBodyTemplate = (rowData: ScheduleProgram) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => {
          removeScheduleProgram(rowData.position);
        }}
        severity="danger"
        type="button"
      />
    );
  };
  const startTimeBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.startTime).format("HH:mm");
  const endTimeBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.endTime).format("HH:mm");

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("googleAccessToken"),
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("googleAccessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const createLinkMeet = () => {
    const validateData = (data) => {
      try {
        createLinkGmeetSchema.parse(data);
        return true;
      } catch (error) {
        return false;
      }
    };

    const data = {
      startAt: getValues("startAt")
        ? `${getLocalISODateTime(getValues("startAt"))}.000Z`
        : "",
      endAt: getValues("endAt")
        ? `${getLocalISODateTime(getValues("endAt"))}.000Z`
        : "",
      eventName: getValues("name"),
      description: getValues("topic"),
      reqId: v4(),
      users: getValues("audienceUsers")?.map((p) => p.email) ?? [],
    };

    if (!validateData(data)) {
      toast.warn("Please Fill In All Required Fields");
    } else {
      const auth = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount";
      const queryParams = {
        client_id:
          "898862951743-ort2u42i3kgdfuhsf9jn1ffi9a39embv.apps.googleusercontent.com",
        redirect_uri: `${baseUrl}/events/callback`,
        scope:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        prompt: "select_account",
        response_type: "token",
        include_granted_scopes: true,
        enable_granular_consent: true,
      };
      const queryString = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              queryParams[key],
            )}`,
        )
        .join("&");

      const url = `${auth}?${queryString}`;
      const newWindow = window.open(url, "_blank");

      if (newWindow) {
        newWindow.focus();
      }
    }
  };

  const createLink = useCreateLinkMeet();

  useEffect(() => {
    if (accessToken) {
      createLink.mutate({
        startAt: getValues("startAt")
          ? `${getLocalISODateTime(getValues("startAt"))}.000Z`
          : "",
        endAt: getValues("endAt")
          ? `${getLocalISODateTime(getValues("endAt"))}.000Z`
          : "",
        eventName: getValues("name"),
        description: getValues("topic"),
        reqId: v4(),
        token: accessToken,
        users: getValues("audienceUsers")?.map((p) => p.email) ?? [],
      });
      localStorage.removeItem("googleAccessToken");
    }
  }, [accessToken]);

  if (createLink.data?.link) {
    setValue("linkUrl", createLink.data?.link);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8 tw-pt-4"
        id="preEventForm"
        // onKeyDown={handleKeyPress}
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <DropdownEventCategoryCard />
        <Input float id="name" label={t('Event Name')} required />
        <Input float id="topic" label={t("Topic")} required />
        <Input float id="purpose" label={t("Purpose")} required />
        <TextArea float id="preparationNotes" label={t("Preparation Notes")} />
        <div className="tw-flex tw-gap-8">
          <CalendarInput
            float
            icon
            id="startAt"
            label={t("Start Date")}
            required
            showTime
            stepMinute={5}
          />
          <CalendarInput
            float
            icon
            id="endAt"
            label={t("End Date")}
            minDate={watch("startAt")}
            required
            showTime
            stepMinute={5}
          />
        </div>

        <div className="card tw-space-y-3">
          <Dialog
            className="tw-min-w-fit"
            draggable={false}
            header={t("Add Schedule Program")}
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
            <AddScheduleProgramForm setShowDialog={setShowDialog} />
          </Dialog>

          <div className="tw-flex tw-justify-between tw-items-center">
            <h4>{t('Schedule Program')}</h4>
            <Button
              icon="pi pi-plus"
              iconPos="right"
              label={t("Add")}
              onClick={() => {
                if (!getValues("startAt") || !getValues("endAt")) {
                  toast.warn(t("Please Fill In Start Date and End Date"));
                  return;
                }
                setShowDialog(true);
              }}
              type="button"
            />
          </div>
          <DataTable
            editMode="cell"
            emptyMessage={t("Please add schedule program")}
            value={scheduleProgram}
          >
            <Column
              body={dateBodyTemplate}
              editor={(options) => dateEditor(options)}
              field="date"
              header={t("Date")}
              onCellEditComplete={onCellEditComplete}
              style={{ width: "15%" }}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="activity"
              header={t("Activity")}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={startTimeBodyTemplate}
              editor={(options) => timeEditor(options)}
              field="startTime"
              header={t("Start Time")}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={endTimeBodyTemplate}
              editor={(options) => timeEditor(options)}
              field="endTime"
              header={t("End Time")}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="picName"
              header={t("PIC Name")}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="note"
              header={t("Note")}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={actionBodyTemplate}
              header={t("Action")}
              headerStyle={{ width: "2rem" }}
            />
          </DataTable>
        </div>

        {/* <MultiSelectComponent /> */}
        <AudienceListCard withExport={edit} />
        <AttachmentFilesCard />
        <Switch id="isOnline" label={t("Via Online")} />

        {watch("isOnline") ? (
          <div className="p-inputgroup">
            <Input float id="linkUrl" label={t("Online Link")} />
            <Button
              className="tw-h-auto"
              icon={iconMeet}
              loading={createLink.isPending}
              onClick={() => {
                createLinkMeet();
              }}
              outlined
              size="small"
              type="button"
            />
          </div>
        ) : (
          <>
            <div className="tw-relative">
              <Button
                className="tw-absolute tw-bottom-12 tw-right-0"
                label={t("Save Address")}
                loading={insertEventAddressPreset.isPending}
                onClick={() => {
                  insertEventAddressPreset.mutate({
                    address: getValues("address"),
                    districtId: watch("districtId"),
                    location: getValues("locationValue"),
                    provinceId: watch("provinceId"),
                  });
                }}
                outlined
                type="button"
              />
              <Dropdown
                editable
                float
                id="locationValue"
                label={t("Location")}
                loading={eventAddress.isLoading}
                optionLabel="location"
                optionValue="location"
                options={eventAddress.data}
              />
            </div>
            <Dropdown
              filter
              float
              id="provinceId"
              label={t("Province")}
              loading={province.isLoading}
              optionLabel="province"
              optionValue="id"
              options={province.data}
            />
            <Dropdown
              filter
              float
              id="districtId"
              label={t("District")}
              loading={district.isLoading}
              optionLabel="district"
              optionValue="id"
              options={district.data}
            />
            <TextArea float id="address" label={t("Address")} />
          </>
        )}

        <div className="tw-sticky tw-bottom-10 tw-bg-[#f8f6fb] tw-p-2">
          <div className="tw-flex tw-justify-between">
            <div className="tw-flex tw-gap-4">
              {values?.status !== "ACTIVE" && (
                <Button
                  label={t("Draft")}
                  loading={insertEvent.isPending || updateEvent.isPending}
                  onClick={() => {
                    setEventState("DRAFT");
                  }}
                  type="submit"
                />
              )}
              {edit && values && values.status !== "DRAFT" ? (
                <div>
                  <SendNotifButton linkValue={`${baseUrl}/summary/${id.toString()}`} />
                  <Button
                    className="tw-ml-4"
                    icon="pi pi-file-pdf"
                    label={t("Summary")}
                    onClick={() => { const url = `${baseUrl}/summary/pre/${id.toString()}`; window.open(url, "_blank") }}
                    outlined
                    type="button" />
                </div>
              ) : null}
            </div>
            <div className="tw-flex tw-gap-4">
              <Button
                label={t("Save")}
                loading={insertEvent.isPending || updateEvent.isPending}
                outlined
                type="submit"
              />
              <Link href="/events">
                <Button label={t("Cancel")} type="button" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
