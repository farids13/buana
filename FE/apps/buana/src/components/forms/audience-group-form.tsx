"use client";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { AudienceFormValues } from "@/lib/validations/audience";
import { audienceGroupFormSchema } from "@/lib/validations/audience";
import TextArea from "../ui/textarea";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useGetAudienceDetail } from "@/lib/api/audience/get-audience-detail";
import { useInsertAudience } from "@/lib/api/audience/insert-audience";
import { useUpdateAudience } from "@/lib/api/audience/update-audience";
import AudienceListCard from "../cards/events/audience-list-card";

type AudienceGroupFormProps = {
  edit?: boolean;
};

export default function AudienceGroupForm({
  edit,
}: Readonly<AudienceGroupFormProps>): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const audienceDetail = useGetAudienceDetail(id);
  const values = audienceDetail[0]?.data;

  const insertAudience = useInsertAudience();
  const updateAudience = useUpdateAudience();
  const methods = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceGroupFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateAudience.mutate({
        ...data,
        id,
        audiences: audience,
      })
      : insertAudience.mutate({
        ...data,
        audiences: audience,
      });
  });

  const audience = useAudienceStore((state) => state.audience);
  const reset = useAudienceStore((state) => state.reset);
  const setAudience = useAudienceStore((state) => state.set);

  useEffect(() => {
    reset();
    if (values?.audiences) {
      setAudience(values.audiences);
    }
  }, [values]);

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input float id="name" label="Name" required />
        <TextArea float id="description" label="Description" />
        <AudienceListCard />
        <div className="tw-flex tw-gap-4 tw-justify-end">
          <Button
            label="Save"
            loading={insertAudience.isPending}
            outlined
            type="submit"
          />
          <Link href="/audience-group">
            <Button label="Cancel" type="button" />
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
