"use client";
import React from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import Dropdown from "../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetDetailEventAddress } from "@/lib/api/event-address/get-detail-event-address";
import type { EventAddressFormSchema } from "@/lib/validations/event-address";
import { eventAddressFormSchema } from "@/lib/validations/event-address";
import { useInsertEventAddress } from "@/lib/api/event-address/insert-event-address";
import { useUpdateEventAddress } from "@/lib/api/event-address/update-event-address";
import { useTranslation } from "react-i18next";

type EventAddressFormProps = {
  edit?: boolean;
};

export default function EventAddressForm({
  edit,
}: EventAddressFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const router = useRouter();

  const { data: values } = useGetDetailEventAddress(id);

  const insertEventAddress = useInsertEventAddress();
  const updateEventAddress = useUpdateEventAddress();

  const methods = useForm<EventAddressFormSchema>({
    resolver: zodResolver(eventAddressFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = handleSubmit((data) => {
    edit
      ? updateEventAddress.mutate({
        ...data,
        id,
      })
      : insertEventAddress.mutate(data, {
        onSuccess: () => {
          router.push("/data-master/address");
        },
      });
  });

  const province = useGetProvince();
  const district = useGetDistrict(watch("provinceId"));
  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit();
        }}
      >
        <Input float id="location" label={t("Location")} />
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

        <div className="tw-flex tw-justify-between">
          <div className="tw-flex tw-gap-4">
            <Button
              id="save-button-address-master"
              label={t("Save")}
              loading={
                edit
                  ? updateEventAddress.isPending
                  : insertEventAddress.isPending
              }
              outlined
              type="submit"
            />
            <Link href="/data-master/address">
              <Button id="cancel-button-address-master" label={t("Cancel")} type="button" />
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
