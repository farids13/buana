"use client";
import { useUpdateUserOption } from "@/lib/api/user/update-user-option";
import type { OptionFormValues } from "@/lib/validations/user";
import { optionFormSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RadioButton from "../ui/radio-button";
import { httpClient } from "@/lib/http";
import type { Area } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { Dialog } from "primereact/dialog";
import { Slider } from "primereact/slider";
import getCroppedImg from "@/utils/crop-image-utils";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import { useGetFile } from "@/lib/api/storage/get-file";
import Input from "../ui/input";
import { useTranslation } from "react-i18next";

export default function SettingForm(): ReactElement {
  const { data } = useGetUserDetail();
  const { mutate, isPending } = useUpdateUserOption();
  const uploadLogo = useMutation({
    mutationFn: async (file?: File) => {
      const response = await httpClient.postForm<{ id: string }>(
        "/storage/asset",
        { file },
      );
      return response.data.id;
    },
  });

  const methods = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    values: {
      notification:
        data?.userOption.find((option) => option.name === "notification")
          ?.value ?? "",
      dashboard:
        data?.userOption.find((option) => option.name === "dashboard")?.value ??
        "",
      logoUrl: data?.logoUrl ?? "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const {t} = useTranslation();

  const { handleSubmit, setValue } = methods;
  const onSubmit = handleSubmit(async (data) => {
    let storageId: string | undefined;
    if (image && fileUploadRef?.current?.getFiles().at(0))
      storageId = await uploadLogo.mutateAsync(
        fileUploadRef?.current?.getFiles().at(0),
    );
    else storageId = data.logoUrl;
    mutate(
      {
        ...data,
        logoUrl: storageId,
      },
      {
        onSuccess: () => {
          fileUploadRef.current?.clear();
          toast.success("Setting updated");
        },
      },
    );
  });

  const notificationOptions = [
    {
      value: "email",
      label: t("Email"),
    },
    {
      value: "whatsapp",
      label: t("Whatsapp"),
    },
  ];
  const themeOptions = [
    {
      value: "theme1",
      label: t("Theme 1"),
    },
    {
      value: "theme2",
      label: t("Theme 2"),
    },
  ];

  const fileUploadRef = useRef<FileUpload>(null);
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const fileImage  = useGetFile("asset", data?.logoUrl);
  useEffect(() => {
    setImage(fileImage.data ? URL.createObjectURL(fileImage.data) : undefined);
  }, [fileImage.data])

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSave = () => {
    if (!croppedAreaPixels) {
      return;
    }

    void (async () => {
      try {
        const croppedImage = await getCroppedImg(
          image ?? "",
          croppedAreaPixels,
          0,
        );

        if (!croppedImage) {
          return;
        }
        fileUploadRef.current?.setFiles([
          new File([croppedImage], "logo.png", {
            type: croppedImage.type,
          }),
        ]);
        setImage(URL.createObjectURL(croppedImage));
        setOpenDialog(false);
      } catch (err) {
        toast.error(t("Error cropping image"));
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="tw-flex tw-flex-col tw-w-2/3 tw-space-y-8 tw-mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <div>
          <h2 className="tw-font-normal">{t('Notification Type')}</h2>
          <p>{t("Select you're notifications type")}</p>
          <div className="tw-flex tw-space-x-8">
            <RadioButton id="notification" options={notificationOptions} />
          </div>
        </div>
        <div>
          <h2 className="tw-font-normal">{t('Dashboard Priority')}</h2>
          <p>{t("Select you're dashboard type")}</p>
          <div className="tw-flex tw-space-x-8">
            <RadioButton id="dashboard" options={themeOptions} />
          </div>
        </div>
        <div className="tw-flex tw-space-x-2">
          <FileUpload
            accept="image/*"
            chooseLabel={t("Upload Logo")}
            chooseOptions={{
              icon: "pi pi-fw pi-upload",
            }}
            disabled={Boolean(image && image !== "/svg/logo.svg")}
            maxFileSize={2 * 1024 * 1024}
            mode="basic"
            name="file"
            onSelect={(e) => {
              setOpenDialog(true);
              setImage(URL.createObjectURL(e.files[0]));
            }}
            ref={fileUploadRef}
          />
          {image && image !== "/svg/logo.svg" ? (
            <Button
              icon="pi pi-trash"
              onClick={() => {
                fileUploadRef.current?.clear();
                setImage(undefined);
                setValue("logoUrl", undefined);
              }}
              severity="danger"
              type="button"
            />
          ) : null}
        </div>
        {image ? (
          <div>
            <h3 className="tw-mb-2 tw-font-normal">{t('Preview')}</h3>
            <Image alt="Company Logo"
              height={6}  
              src={image} 
              style={{ width: '380px', height: '60px', border: '1px solid #334798', borderRadius: '5px', objectFit: 'contain' }} 
              width={38} 
            />
          </div>
        ) : null}

        {/* <Dialog
          draggable={false}
          onHide={() => {
            fileUploadRef.current?.clear();
            setOpenDialog(false);
          }}
          pt={{
            root: {
              className: "border-none",
            },
            content: {
              className:
                "px-4 border-round-3xl py-2 tw-border-4 !tw-bg-[#E0D7FD] tw-border-[#334798] tw-space-y-6",
            },
          }}
          showHeader={false}
          visible={openDialog}
        >
          <h2 className="tw-text-center tw-pt-[5%]">Crop Image</h2>
          <div className="tw-border-2 tw-border-[#334798] tw-relative tw-h-[15vh]">
            <Cropper
              aspect={16/9}
              crop={crop}
              image={image ?? ""}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
            />
          </div>
          <p>*Use HD image for better quality</p>
          <div className="tw-flex tw-justify-between">
            <Slider
              className="w-14rem"
              max={3}
              min={1}
              onChange={(e) => {
                if (typeof e.value === "number") {
                  setZoom(e.value);
                }
              }}
              step={0.1}
              value={zoom}
            />
            <Button label="SAVE CHANGES" onClick={onSave} rounded />
          </div>
        </Dialog> */}
        <div className="tw-self-end tw-h-full tw-flex">
          <Button
            className="tw-self-end"
            label={t("SAVE CHANGES")}
            loading={isPending || uploadLogo.isPending}
            rounded
          />
        </div>
      </form>
    </FormProvider>
  );
}
