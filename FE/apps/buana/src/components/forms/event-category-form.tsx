"use client";
import React from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useInsertEventCategory } from "@/lib/api/event-category/insert-event-category";
import type { EventCategorySchemaForm } from "@/lib/validations/event-category";
import { eventCategorySchemaForm } from "@/lib/validations/event-category";
import { useGetDetailEventCategory } from "@/lib/api/event-category/get-detail-event-category";
import { useUpdateEventCategory } from "@/lib/api/event-category/update-event-category";

type EventCategoryFormProps = {
  edit?: boolean;
  dialog?: boolean;
};

export default function EventCategoryForm({
  edit,
  dialog,
}: EventCategoryFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data: values } = useGetDetailEventCategory(id);

  const insertEventCategory = useInsertEventCategory();
  const updateEventCategory = useUpdateEventCategory();

  const methods = useForm<EventCategorySchemaForm>({
    resolver: zodResolver(eventCategorySchemaForm),
    values,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    edit
      ? updateEventCategory.mutate({
        ...data,
        id,
      })
      : insertEventCategory.mutate(data);
  });

  return (
    dialog ? (
      <div><h1>1</h1></div>
    ) :
      (
        <FormProvider {...methods}>
          <form
            className="tw-space-y-8 !tw-my-8"
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit();
            }}
          >
            <Input float id="eventCategoryName" label="Event Category Name" />

            <div className="tw-flex tw-justify-between">
              <div className="tw-flex tw-gap-4">
                <Button
                  id="save-event-category"
                  label="Save"
                  loading={
                    edit
                      ? updateEventCategory.isPending
                      : insertEventCategory.isPending
                  }
                  outlined
                  type="submit"
                />
                <Link href="/data-master/event-category">
                  <Button id="cancel-event-category" label="Cancel" type="button" />
                </Link>
              </div>
            </div>
          </form>
        </FormProvider >
      )
  );
}
