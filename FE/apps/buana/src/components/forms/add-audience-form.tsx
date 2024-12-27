import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import type { Audience } from "@/lib/validations/audience";
import { audienceFormSchema } from "@/lib/validations/audience";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useTranslation } from "react-i18next";

type AddAudienceFormProps = {
  setShowDialog: (value: boolean) => void;
};

export default function AddAudienceForm({
  setShowDialog,
}: AddAudienceFormProps): ReactElement {
  const addAudience = useAudienceStore((state) => state.add);

  const methods = useForm<Audience>({
    resolver: zodResolver(audienceFormSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    addAudience(data);
    setShowDialog(false);
  });
  const {t} = useTranslation();

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
        <Input float id="name" label={t("Name")} />
        <Input float id="job" label={t("Job")} />
        <Input float id="description" label={t("Description")} />
        <Input float id="phoneNumber" label={t("Phone Number")} />
        <Input float id="email" label={t("Email")} required />
        <div className="tw-flex tw-justify-center tw-gap-4">
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label={t("Submit")}
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
