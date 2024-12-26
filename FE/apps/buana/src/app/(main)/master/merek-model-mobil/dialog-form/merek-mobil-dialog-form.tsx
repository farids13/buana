'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ReactElement, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import Input from '@/src/components/ui/input-form';
import { Skeleton } from 'primereact/skeleton';
import Switch from "@/src/components/ui/switch";
import { useGetDetailMerekMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/merek-mobil/use-get-detail-merek-mobil-query";
import { upsertMerekMobilSchema, UpsertMerekMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/merek-mobil/upsert-merek-mobil-schema";
import { useUpdateMerekMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/merek-mobil/use-update-merek-mobil-query";
import { useInsertMerekMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/merek-mobil/use-insert-merek-mobil-query";


type MerekMobilDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function MerekMobilDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: MerekMobilDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailMerekMobilQuery(selectedId ?? '');
  
  const defaultValues: UpsertMerekMobilSchema = {
    cb_name: '',
    cb_is_active: true
  };
  let values: UpsertMerekMobilSchema = edit && selectedId && data ? data : defaultValues;
  
  
  const insertMerekMobil = useInsertMerekMobilQuery();
  const updateMerekMobil = useUpdateMerekMobilQuery();
  
  const methods = useForm<UpsertMerekMobilSchema>({
    resolver: zodResolver(upsertMerekMobilSchema),
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
  
  const isMutating = insertMerekMobil.isPending || updateMerekMobil.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateMerekMobil.mutateAsync(data);
      } else {
        await insertMerekMobil.mutateAsync(data);
      }
      toast.current?.show({
        severity: 'success',
        summary: 'Berhasil',
        detail: edit ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan',
      });
      methods.reset();
      handleHide();
    } catch (error) {
      console.error('Submit error:', error);
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
      <Button icon="pi pi-check" loading={isMutating} label="Save" type="submit" onClick={onSubmit} text />
    </>
  );  

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Merek Mobil" : "Tambah Merek Mobil"}
        modal
        onHide={handleHide}
        style={{ width: "350px" }}
        visible={visible}
      >
        {edit && isLoading ? (
          <>
            <div className="field">
              <Skeleton width="22rem" height="4rem" borderRadius="16px"></Skeleton>
            </div>
            <div className='flex gap-4 '>
              <div className="field">
                <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
              </div>
              <div className="field">
                <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
              </div>
            </div>
          </>
        ) : (
          <FormProvider {...methods} key={visible.toString()}>
            <form onSubmit={onSubmit} className='flex flex-column gap-4'>
              <div className="field">
                <Input id="cb_name" label="Nama Merek Mobil" required />
              </div>
              <div className="field">
                <Switch id="cb_is_active" label="Aktif" defaultValue={true} />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
