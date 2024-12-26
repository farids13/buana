'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ReactElement} from 'react';
import { useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import Input, { InputTypeEnum } from '@/src/components/ui/input-form';
import Switch from "@/src/components/ui/switch";
import { useInsertModelMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-insert-model-mobil-query";
import { useGetDetailModelMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-get-detail-model-mobil-query";
import type { UpsertModelMobilSchema} from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";
import { upsertModelMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";
import { useUpdateModelMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-update-model-mobil-query";


type ModelMobilDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  merekMobilId: string;
  onHide: () => void;
};

export function ModelMobilDialogForm({
  visible,
  edit,
  selectedId,
  merekMobilId,
  onHide
}: ModelMobilDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailModelMobilQuery(selectedId ?? '');
  
  const defaultValues: UpsertModelMobilSchema = {
    cm_name: '',
    cm_is_active: true,
    cm_brand_id: merekMobilId ?? '',
  };
  const values: UpsertModelMobilSchema = edit && selectedId && data ? data : defaultValues;
  
  
  const insertModelMobil = useInsertModelMobilQuery();
  const updateModelMobil = useUpdateModelMobilQuery();
  
  const methods = useForm<UpsertModelMobilSchema>({
    resolver: zodResolver(upsertModelMobilSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  
  const toast = useRef<Toast>(null);

  if (edit && selectedId == null) {
    toast.current?.show({
      severity: 'error', 
      summary: 'Error',
      detail: 'ID Tidak Ditemukan',
    });
  }
  
  const { handleSubmit } = methods;
  
  const isMutating = insertModelMobil.isPending || updateModelMobil.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateModelMobil.mutateAsync(data);
      } else {
        await insertModelMobil.mutateAsync(data);
      }
      toast.current?.show({
        severity: 'success',
        summary: 'Berhasil',
        detail: edit ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan',
      });
      methods.reset();
      handleHide();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Terjadi kesalahan saat menyimpan data',
      });
    }
  });

  const handleHide = () => {
    methods.reset(defaultValues);
    onHide();
  };

  useEffect(() => {
    if (visible && !edit) {
      methods.reset(defaultValues);
    }
  }, [visible, edit]);

  const footer = (
    <>
      <Button icon="pi pi-times" label="Cancel" onClick={handleHide} text />
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={onSubmit} text type="submit" />
    </>
  );  

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Model Mobil" : "Tambah Model Mobil"}
        modal
        onHide={handleHide}
        style={{ width: "350px" }}
        visible={visible}
      >
        {edit && isLoading ? (
          <>
            <div className="field">
              <Skeleton borderRadius="16px" height="4rem" width="22rem" />
            </div>
            <div className='flex gap-4 '>
              <div className="field">
                <Skeleton borderRadius="16px" height="2rem" width="5rem" />
              </div>
              <div className="field">
                <Skeleton borderRadius="16px" height="2rem" width="5rem" />
              </div>
            </div>
          </>
        ) : (
          <FormProvider {...methods} key={visible.toString()}>
            <form className='' onSubmit={onSubmit}>
              <Input id="cm_brand_id" label="" type={InputTypeEnum.HIDDEN} value={merekMobilId} />
              <div className="field">
                <Input id="cm_name" label="Nama" required />
              </div>
              <div className="field">
                <Switch defaultValue id="cm_is_active" label="Aktif" />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
