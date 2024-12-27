import type { ReactElement } from "react";
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import CalendarInput from "@/components/ui/calendar-input";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { scheduleProgramSchema } from "@/lib/validations/schedule-program";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import type { EventFormValues } from "@/lib/validations/event";
import moment from "moment";
import { useTranslation } from "react-i18next";

type AddScheduleProgramFormProps = {
  setShowDialog: (value: boolean) => void;
};

export default function AddScheduleProgramForm({
  setShowDialog,
}: AddScheduleProgramFormProps): ReactElement {
  const addScheduleProgram = useScheduleProgramStore((state) => state.add);
  const {t} = useTranslation();

  const eventForm = useFormContext<EventFormValues>();
  const startAt = eventForm.watch("startAt");
  const endAt = eventForm.watch("endAt");

  const methods = useForm<ScheduleProgram>({
    resolver: zodResolver(scheduleProgramSchema),
  });
  const { handleSubmit, watch, resetField } = methods;
  const onSubmit = handleSubmit((data) => {
    addScheduleProgram(data);
    setShowDialog(false);
  });

  const watchDate = watch("date");
  const minDate = moment(startAt).isSame(moment(watchDate), "day")
    ? moment(startAt).date(moment().date()).toDate()
    : undefined;
  const maxDate = moment(endAt).isSame(moment(watchDate), "day")
    ? moment(endAt).date(moment().date()).toDate()
    : undefined;

  useEffect(() => {
    resetField("startTime");
    resetField("endTime");
  }, [watchDate]);

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 "
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          void onSubmit();
        }}
      >
        <CalendarInput
          float
          icon
          id="date"
          label={t("Date")}
          maxDate={new Date(endAt)}
          minDate={new Date(startAt)}
          required
        />
        <Input float id="activity" label="Activity" required />
        <div className="tw-flex tw-gap-8">
          <CalendarInput
            float
            icon
            id="startTime"
            label={t("Start Time")}
            maxDate={maxDate}
            minDate={minDate}
            required
            stepMinute={5}
            timeOnly
            viewDate={moment(watchDate).hour(moment(startAt).hour()).toDate()}
          />
          <CalendarInput
            float
            icon
            id="endTime"
            label={t("End Time")}
            maxDate={maxDate}
            minDate={minDate}
            required
            stepMinute={5}
            timeOnly
            viewDate={moment(watchDate).hour(moment(endAt).hour()).toDate()}
          />
        </div>
        <Input float id="picName" label={t("PIC Name")} required />
        <Input float id="note" label={t("Note")} />
        <div className="tw-flex tw-justify-center tw-gap-4">
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label={t("Add")}
            type="submit"
          />
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label={t("Cancel")}
            onClick={() => {
              setShowDialog(false);
            }}
            severity="danger"
            type="button"
          />
        </div>
      </form>
    </FormProvider>
  );
}
