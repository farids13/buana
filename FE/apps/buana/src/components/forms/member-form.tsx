"use client";
import React from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGetDetailMember } from "@/lib/api/member/get-detail-member";
import { useInsertMember } from "@/lib/api/member/insert-member";
import { type MemberForm, memberFormSchema } from "@/lib/validations/member";
import { useUpdateMember } from "@/lib/api/member/update-member";
import { useGetMembers } from "@/lib/api/member/get-member";

type MemberFormProps = {
  edit?: boolean;
};

export default function MemberFormFunction({
  edit,
}: MemberFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const router = useRouter();

  const { data: values } = useGetDetailMember(id);

  const insertMember = useInsertMember();
  const updateMember = useUpdateMember();

  const defaultValues: MemberForm = {
    name: "",
    email: "",
    phone: "",
    position: "",
    departement: "",
    superior: "",
    imgUrl: ""
  };

  const methods = useForm<MemberForm>({
    resolver: zodResolver(memberFormSchema),
    values: values ? {
      name: values.name ?? "",
      email: values.email,
      phone: values.phone,
      position: values.position,
      departement: values.departement,
      superior: values.superior ?? "",
      imgUrl: values.imgUrl ?? ""
    } : defaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    edit
      ? updateMember.mutate({
        body: data,
        memberId: id,
      })
      : insertMember.mutate(data, {
        onSuccess: () => {
          router.push("/members");
        },
      });
  });

  const { t } = useTranslation();

  const { data: memberList } = useGetMembers({
    pageIndex: 0,
    limit: 100
  });

  const superiorOptions = memberList?.data?.map((member) => ({
    label: member.name,
    value: member.id
  })) || [];

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit();
        }}
      >
        <Input float id="name" label={t("Name")} />
        <Input float id="email" label={t("Email")} type="email" />
        <Input float id="phone" label={t("Phone")} />
        <Input float id="position" label={t("Position")} />
        <Input float id="departement" label={t("Department")} />
        
        <Dropdown
          float
          id="superior"
          label={t("Superior")}
          options={superiorOptions}
          placeholder={t("Select Superior")}
        />
        
        <Input float id="imgUrl" label={t("Profile Image")} type="file" />

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
            <Link href="/members">
              <Button id="cancel-button-address-master" label={t("Cancel")} type="button" />
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
