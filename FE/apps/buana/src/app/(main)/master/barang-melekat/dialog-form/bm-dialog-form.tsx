'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ReactElement} from 'react';
import { useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { useUpdateBarangMelekatQuery } from '@/src/services/master/barang-melekat/tanstack/use-update-barang-melekat-query';
import { useInsertBarangMelekatQuery } from '@/src/services/master/barang-melekat/tanstack/use-insert-barang-melekat-query';
import Input from '@/src/components/ui/input-form';
import Switch from '@/src/components/ui/switch';
import { upsertBarangMelekatSchema } from '@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema';
import type { UpsertBarangMelekatSchema} from '@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema';
import { useGetDetailBarangMelekatQuery } from '@/src/services/master/barang-melekat/tanstack/use-get-detail-barang-melekat-query';

type BMDialoFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function BMDialoForm({
  visible,
  edit,
  selectedId,
  onHide
}: BMDialoFormProps): ReactElement {

  const { data, isLoading } = useGetDetailBarangMelekatQuery(selectedId ?? '');

  const defaultValues: UpsertBarangMelekatSchema = {
    ati_name: '',
    ati_is_default: false,
    ati_is_active: true
  };

  const values: UpsertBarangMelekatSchema = edit && selectedId && data ? data : defaultValues;

  const insertBarangMelekat = useInsertBarangMelekatQuery();
  const updateBarangMelekat = useUpdateBarangMelekatQuery();

  const methods = useForm<UpsertBarangMelekatSchema>({
    resolver: zodResolver(upsertBarangMelekatSchema),
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

  const { handleSubmit } = methods;

  const isMutating = insertBarangMelekat.isPending || updateBarangMelekat.isPending;
  const onSubmit = handleSubmit((data) => {
    console.log('Submit data:', data);
    
    if (edit) {
        updateBarangMelekat.mutateAsync(data)
            .then(() => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Data berhasil diperbarui',
                });
                methods.reset(defaultValues);
                handleHide();
            })
            .catch((error) => {
                console.error('Submit error:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Terjadi kesalahan saat menyimpan data',
                });
            });
    } else {
        insertBarangMelekat.mutateAsync(data)
            .then(() => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Data berhasil ditambahkan',
                });
                methods.reset(defaultValues);
                handleHide();
            })
            .catch((error) => {
                console.error('Submit error:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Terjadi kesalahan saat menyimpan data',
                });
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
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={() => void onSubmit()} text type="submit" />
    </>
  );

  console.log('Loading State:', { edit, isLoading, selectedId });

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Barang Melekat" : "Tambah Barang Melekat"}
        modal
        onHide={handleHide}
        style={{ width: "350px" }}
        visible={visible}
      >
        {edit && isLoading  ? (
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
            <FormProvider {...methods}>
              <form className='' onSubmit={(event) => {
                event.preventDefault();
                void onSubmit();
              }}>
                <div className="field">
                  <Input id="ati_name" label="Nama" required />
                </div>
                <div className='flex gap-4 '>
                  <div className="field">
                    <Switch id="ati_is_default" label="Default" />
                  </div>
                  <div className="field">
                    <Switch defaultValue id="ati_is_active" label="Aktif" />
                  </div>
                </div>
              </form>
            </FormProvider>
        )}
          </Dialog>
      </>
      );
}
