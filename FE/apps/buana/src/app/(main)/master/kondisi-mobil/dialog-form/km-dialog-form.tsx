'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ReactElement, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import Input from '@/src/components/ui/input-form';
import { Skeleton } from 'primereact/skeleton';
import { UpsertKondisiMobilSchema, upsertKondisiMobilSchema } from '@/src/lib/validation/master/kondisi-mobil/upsert-kondisi-mobil-schema';
import { useUpdateKondisiMobilQuery } from '@/src/services/master/kondisi-mobil/tanstack/use-update-kondisi-mobil-query';
import { useInsertKondisiMobilQuery } from '@/src/services/master/kondisi-mobil/tanstack/use-insert-kondisi-mobil-query';
import Switch from "@/src/components/ui/switch";
import { useGetDetailKondisiMobilQuery } from "@/src/services/master/kondisi-mobil/tanstack/use-get-detail-kondisi-mobil-query";


type KMDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function KMDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: KMDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailKondisiMobilQuery(selectedId ?? '');
  
  const defaultValues: UpsertKondisiMobilSchema = {
    cac_name: '',
    cac_is_default: false,
    cac_is_active: true
  };
  
  let values: UpsertKondisiMobilSchema = edit && selectedId && data ? data : defaultValues;
  
  const insertKondisiMobil = useInsertKondisiMobilQuery();
  const updateKondisiMobil = useUpdateKondisiMobilQuery();
  
  const methods = useForm<UpsertKondisiMobilSchema>({
    resolver: zodResolver(upsertKondisiMobilSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  
  useEffect(() => {
    if (visible && !edit) {
      methods.reset(defaultValues);
    }
  }, [visible, edit]);
  
  const toast = useRef<Toast>(null);

  if (edit && selectedId == null) {
    toast.current?.show({
      severity: 'error', 
      summary: 'Error',
      detail: 'ID Tidak Ditemukan',
    });
  }
  
  const { handleSubmit } = methods;
  
  const isMutating = insertKondisiMobil.isPending || updateKondisiMobil.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateKondisiMobil.mutateAsync(data);
      } else {
        await insertKondisiMobil.mutateAsync(data);
      }
      toast.current?.show({
        severity: 'success',
        summary: 'Berhasil',
        detail: edit ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan',
      });
      methods.reset(defaultValues);
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
        header={edit ? "Edit Kondisi Mobil" : "Tambah Kondisi Mobil"}
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
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className=''>
              <div className="field">
                <Input id="cac_name" label="Nama" required />
              </div>
              <div className="field">
                <Switch id="cac_is_default" label="Default" />
              </div>
              <div className="field">
                <Switch id="cac_is_active" label="Aktif" />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
