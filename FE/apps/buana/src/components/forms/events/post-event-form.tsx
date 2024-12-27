"use client";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudienceListCard from "../../cards/events/audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import AttendanceHistoryCard from "../../cards/events/attendance-history-card";
import AttachmentFilesCard from "../../cards/events/attachment-files-card";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useUpdatePostEvent } from "@/lib/api/event/update-post-event";
import { baseUrl } from "@/utils/oauth-utils";
import { useTranslation } from "react-i18next";

export default function PostEventForm(): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { t } = useTranslation();

  const { data: values } = useGetEventDetail(id);
  const { mutate, isPending } = useUpdatePostEvent();

  const methods = useForm({
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, control } = methods;
  const { replace } = useFieldArray({
    control,
    name: "files",
  });

  const setAudience = useAudienceStore((state) => state.set);
  useEffect(() => {
    setAudience(values?.audienceUsers ?? []);
    replace(values?.files ?? []);
  }, [values]);

  const onSubmit = handleSubmit((data) => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id,
      files: data.files,
    });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8 tw-pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <AudienceListCard readOnly />
        <AttendanceHistoryCard />
        <AttachmentFilesCard post />

        <div className="tw-sticky tw-bottom-10 tw-bg-[#f8f6fb] tw-p-2">
          <div className="tw-flex tw-justify-between">
            {values && values.status !== "DRAFT" ? (
              <div>
                <Button
                  className="tw-ml-4"
                  icon="pi pi-file-pdf"
                  label={t("Summary")}
                  onClick={() => { const url = `${baseUrl}/summary/post/${id.toString()}`; window.open(url, "_blank") }}
                  type="button" />
              </div>
            ) : null}
            <div className="tw-flex tw-gap-4">
              <Button label="Save" loading={isPending} outlined type="submit" />
              <Link href="/events">
                <Button label="Cancel" type="button" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
