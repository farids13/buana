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
import { useGetDetailMember } from "@/lib/api/member/get-detail-member";
import type { MemberFormSchema } from "@/lib/validations/member";
import { memberFormSchema } from "@/lib/validations/member";
import { useInsertMember } from "@/lib/api/member/insert-member";
import { useUpdateMember } from "@/lib/api/member/update-member";
import { useTranslation } from "react-i18next";

type MemberFormProps = {
  edit?: boolean;
};

export default function MemberForm({
  edit,
}: MemberFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const router = useRouter();

  const { data: values } = useGetDetailMember(id);

  const insertMember = useInsertMember();
  const updateMember = useUpdateMember();

  const methods = useForm<MemberFormSchema>({
    resolver: zodResolver(memberFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = handleSubmit((data) => {
    edit
      ? updateMember.mutate({
        ...data,
        id,
      })
      : insertMember.mutate(data, {
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
                  ? updateMember.isPending
                  : insertMember.isPending
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
