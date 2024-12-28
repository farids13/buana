"use client";
import React, { useState, useRef, useEffect } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGetDetailMember } from "@/lib/api/member/get-detail-member";
import { useInsertMember } from "@/lib/api/member/insert-member";
import { type MemberForm, memberFormSchema } from "@/lib/validations/member";
import { useUpdateMember } from "@/lib/api/member/update-member";
import { useGetMembers } from "@/lib/api/member/get-member";
import Image from "next/image";

type MemberFormProps = {
  edit?: boolean;
};

export default function MemberFormFunction({
  edit,
}: MemberFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const router = useRouter();
  const fileUploadRef = useRef<FileUpload>(null);
  const [image, setImage] = useState<string>();

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

  const { handleSubmit, setValue } = methods;

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

  useEffect(() => {
    if (values?.imgUrl) {
      setImage(values.imgUrl);
    }
  }, [values]);

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

        <div className="tw-space-y-2">
          <label className="tw-block tw-font-medium">{t("Image Profile")}</label>
          <div className="tw-flex tw-space-x-2">
            <FileUpload
              accept="image/*"
              chooseLabel={t("Upload Image")}
              chooseOptions={{
                icon: "pi pi-fw pi-upload",
              }}
              disabled={Boolean(image)}
              maxFileSize={2 * 1024 * 1024}
              mode="basic"
              name="file"
              onSelect={(e) => {
                const file = e.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result as string;
                  setImage(base64String);
                  setValue("imgUrl", base64String);
                };
                reader.readAsDataURL(file);
              }}
              ref={fileUploadRef}
            />
            {image ? (
              <Button
                icon="pi pi-trash"
                onClick={() => {
                  fileUploadRef.current?.clear();
                  setImage(undefined);
                  setValue("imgUrl", undefined);
                }}
                severity="danger"
                type="button"
              />
            ) : null}
          </div>
        </div>

        {image && (
          <div>
            <h3 className="tw-mb-2 tw-font-normal">{t('Preview')}</h3>
            <div className="tw-w-32 tw-h-32 tw-border tw-border-[#334798] tw-rounded-full tw-overflow-hidden">
              <img 
                alt="Member Image"
                className="tw-w-full tw-h-full tw-object-cover"
                src={image}
              />
            </div>
          </div>
        )}

        <div className="tw-flex tw-justify-end tw-space-x-4">
          <Link href="/members">
            <Button
              label={t("Cancel")}
              outlined
              type="button"
            />
          </Link>
          <Button
            label={edit ? t("Save Changes") : t("Add Member")}
            loading={edit ? updateMember.isPending : insertMember.isPending}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
