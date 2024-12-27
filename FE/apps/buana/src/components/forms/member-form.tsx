"use client";
import React from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGetDetailMember } from "@/lib/api/member/get-detail-member";
import { useInsertMember } from "@/lib/api/member/insert-member";
import { type MemberForm, memberFormSchema } from "@/lib/validations/member";
import { useUpdateMember } from "@/lib/api/member/update-member";

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

  const methods = useForm<MemberForm>({
    resolver: zodResolver(memberFormSchema),
    values,
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
          router.push("/member");
        },
      });
  });

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
        <Input float id="name" label={t("Name")} />
        <Input float id="email" label={t("Email")} type="email" />
        <Input float id="phone" label={t("Phone")} />
        <Input float id="position" label={t("Position")} />
        <Input float id="departement" label={t("Department")} />
        
        <Input float id="superior" label={t("Superior")} />
        
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
            <Link href="/member">
              <Button id="cancel-button-address-master" label={t("Cancel")} type="button" />
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
