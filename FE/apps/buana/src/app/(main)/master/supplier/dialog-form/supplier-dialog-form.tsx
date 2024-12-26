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
import { useGetDetailSupplierQuery } from "@/src/services/master/supplier/tanstack/use-get-detail-supplier-query";
import type { UpsertSupplierSchema } from "@/src/lib/validation/master/supplier/upsert-supplier-schema";
import { upsertSupplierSchema } from "@/src/lib/validation/master/supplier/upsert-supplier-schema";
import { useUpdateSupplierQuery } from "@/src/services/master/supplier/tanstack/use-update-supplier-query";
import { useInsertSupplierQuery } from "@/src/services/master/supplier/tanstack/use-insert-supplier-query";
import Dropdown from "@/src/components/ui/dropdown";
import { JenisPembayaranEnum } from "@/src/lib/enum/master/jenis-pembayaran-enum";


type SupplierDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function SupplierDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: SupplierDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailSupplierQuery(selectedId ?? '');
  
    const defaultValues: UpsertSupplierSchema = {
      s_code: '',
      s_name: '',
      s_address: '',
      s_contact_person: '',
      s_desc: '',
      s_email: '',
      s_city: '',
      s_phone_number: '',
      s_payment_method: '',
      s_cc_payment_term: 0,
    };
  const values: UpsertSupplierSchema = edit && selectedId && data ? data : defaultValues;
  
  
  const insertSupplier = useInsertSupplierQuery();
  const updateSupplier = useUpdateSupplierQuery();
  
  const methods = useForm<UpsertSupplierSchema>({
    resolver: zodResolver(upsertSupplierSchema),
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
  
  const { handleSubmit, watch } = methods;
  const paymentMethod = watch('s_payment_method');
  
  const isMutating = insertSupplier.isPending || updateSupplier.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateSupplier.mutateAsync(data);
      } else {
        await insertSupplier.mutateAsync(data);
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
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={onSubmit} text type="submit" />
    </>
  );  

  const paymentMethodOptionsDropdown = Object.entries(JenisPembayaranEnum).map(([key, value]) => ({
    label: value,
    value: key
  }));

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Supplier" : "Tambah Supplier"}
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
              <Input
                id="s_code"
                label="Kode Supplier"
                name="s_code"
                placeholder="Masukkan kode supplier"
                required
              />
              <Input
                id="s_name" 
                label="Nama Supplier"
                name="s_name"
                placeholder="Masukkan nama supplier"
              />
              <Input
                id="s_address"
                label="Alamat"
                name="s_address"
                placeholder="Masukkan alamat" 
              />
              <Input
                id="s_contact_person"
                label="Contact Person"
                name="s_contact_person"
                placeholder="Masukkan contact person"
              />
              <Input
                id="s_desc"
                label="Deskripsi"
                name="s_desc"
                placeholder="Masukkan deskripsi"
              />
              <Input
                id="s_email"
                label="Email"
                name="s_email"
                placeholder="Masukkan email"
              />
              <Input
                id="s_city"
                label="Kota"
                name="s_city"
                placeholder="Masukkan kota"
              />
              <Input
                id="s_phone_number"
                label="No. Telepon"
                name="s_phone_number"
                placeholder="Masukkan no telepon"
              />
              <Dropdown
                id="s_payment_method"
                label="Metode Pembayaran"
                name="s_payment_method"
                options={paymentMethodOptionsDropdown}
                placeholder="Masukkan metode pembayaran"
              />
              <Input
                id="s_cc_payment_term"
                label="Term Pembayaran (Hari)"
                name="s_cc_payment_term"
                placeholder="Masukkan term pembayaran"
                type={InputTypeEnum.NUMBER}
              />
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
