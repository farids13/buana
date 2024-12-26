'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ReactElement } from 'react';
import { useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import Input from '@/src/components/ui/input-form';
import { useGetDetailPelangganQuery } from "@/src/services/master/pelanggan/tanstack/use-get-detail-pelanggan-query";
import { upsertPelangganSchema, UpsertPelangganSchema } from "@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema";
import { useInsertPelangganQuery } from "@/src/services/master/pelanggan/tanstack/use-insert-pelanggan-query";
import { useUpdatePelangganQuery } from "@/src/services/master/pelanggan/tanstack/use-update-pelanggan-query";

type PelangganDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function PelangganDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: PelangganDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailPelangganQuery(selectedId ?? '');

  const defaultValues: UpsertPelangganSchema = {
    cus_name: "",
    cus_phone: "",
    cus_address: "",
    cus_desc: "",
  };
  const values: UpsertPelangganSchema = edit && selectedId && data ? data : defaultValues;

  const insertPelanggan = useInsertPelangganQuery();
  const updatePelanggan = useUpdatePelangganQuery();

  const methods = useForm<UpsertPelangganSchema>({
    resolver: zodResolver(upsertPelangganSchema),
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

  const isMutating = insertPelanggan.isPending || updatePelanggan.isPending;
  const onSubmit = handleSubmit((data) => {
    if (edit) {
      updatePelanggan.mutateAsync(data)
        .then(() => {
          toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Data berhasil diperbarui',
          });
          methods.reset(defaultValues);
          handleHide();
        })
        .catch(() => {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Terjadi kesalahan saat menyimpan data',
          });
        });
    } else {
      insertPelanggan.mutateAsync(data)
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
  },
    (error) => {
      console.error('Submit error:', error);
    }
  );

  const handleHide = () => {
    methods.reset(defaultValues);
    onHide();
  };

  const footer = (
    <>
      <Button icon="pi pi-times" label="Cancel" onClick={handleHide} text />
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={onSubmit} text type="submit" />
    </>
  );

  console.log('Loading State:', { edit, isLoading, selectedId });

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Pelanggan" : "Tambah Pelanggan"}
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
          <FormProvider {...methods}>
            <form className='' onSubmit={(event) => {
              event.preventDefault();
              void onSubmit();
            }}>
              <div className="field">
                <label className="mb-2">Kode Pelanggan</label>
                <div className="p-2 border rounded bg-gray-50">
                  {values.cus_code ?? "Generated"}
                </div>
              </div>
              <div className="field">
                <Input id="cus_name" label="Nama Pelanggan" required />
              </div>
              <div className="field">
                <Input id="cus_id_card_number" label="No. KTP" required />
              </div>
              <div className="field">
                <Input id="cus_address" label="Alamat KTP" required />
              </div>
              <div className="field">
                <Input id="cus_phone" label="No. Handphone" required />
              </div>
              <div className="field">
                <Input id="cus_email" label="Email" required />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}