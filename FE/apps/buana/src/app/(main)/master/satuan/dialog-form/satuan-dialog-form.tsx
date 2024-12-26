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
import { useGetDetailSatuanQuery } from "@/src/services/master/satuan/tanstack/use-get-detail-satuan-query";
import { upsertSatuanSchema, UpsertSatuanSchema } from "@/src/lib/validation/master/satuan/upsert-satuan-schema";
import { useUpdateSatuanQuery } from "@/src/services/master/satuan/tanstack/use-update-satuan-query";
import { useInsertSatuanQuery } from "@/src/services/master/satuan/tanstack/use-insert-satuan-query";


type SatuanDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function SatuanDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: SatuanDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailSatuanQuery(selectedId ?? '');
  
  const defaultValues: UpsertSatuanSchema = {
    u_name: '',
    u_code: '',
    u_desc: '',
    u_is_active: true
  };
  let values: UpsertSatuanSchema = edit && selectedId && data ? data : defaultValues;
  
  
  const insertSatuan = useInsertSatuanQuery();
  const updateSatuan = useUpdateSatuanQuery();
  
  const methods = useForm<UpsertSatuanSchema>({
    resolver: zodResolver(upsertSatuanSchema),
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
  
  const isMutating = insertSatuan.isPending || updateSatuan.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateSatuan.mutateAsync(data);
      } else {
        await insertSatuan.mutateAsync(data);
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
        header={edit ? "Edit Satuan" : "Tambah Satuan"}
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
            <form onSubmit={onSubmit} className=''>
              <div className="field">
                <Input id="u_code" label="Kode" required />
              </div>
              <div className="field">
                <Input id="u_name" label="Nama" required />
              </div>
              <div className="field">
                <Input id="u_desc" label="Deskripsi" required />
              </div>
              <div className="field">
                <Switch id="u_is_active" label="Aktif" />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
