'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ReactElement} from 'react';
import { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import Input, { InputTypeEnum } from '@/src/components/ui/input-form';
import Dropdown from "@/src/components/ui/dropdown";
import { useGetDetailItemQuery } from "@/src/services/master/item/tanstack/use-get-detail-item-query";
import { useInsertItemQuery } from "@/src/services/master/item/tanstack/use-insert-item-query";
import { useUpdateItemQuery } from "@/src/services/master/item/tanstack/use-update-item-query";
import type { UpsertItemSchema } from "@/src/lib/validation/master/item/upsert-item-schema";
import { upsertItemSchema } from "@/src/lib/validation/master/item/upsert-item-schema";  
import { KelompokBarangEnum } from "@/src/lib/enum/master/kelompok-barang-enum";
import { useGetAllActiveSatuanQuery } from "@/src/services/master/satuan/tanstack/use-get-all-active-satuan-query";

type ItemDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function ItemDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: ItemDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailItemQuery(selectedId ?? '');
  const { data: satuanDataDropdown, isLoading: satuanIsLoading } = useGetAllActiveSatuanQuery();
  
  let values: UpsertItemSchema | undefined;
  if (edit && selectedId && data) {
    values = data;
  } else {
    values = {
      p_code: '',
      p_name: '',
      p_barcode: '',
      p_type: '',
      p_unit_id: '',
    };
  }


  const insertItem = useInsertItemQuery();
  const updateItem = useUpdateItemQuery();
  
  const methods = useForm<UpsertItemSchema>({
    resolver: zodResolver(upsertItemSchema),
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

  const isMutating = insertItem.isPending || updateItem.isPending;
  
  const onSubmit = handleSubmit(async (data) => {
    await (edit ? updateItem : insertItem).mutateAsync(data);
    handleHide();
  },
   (errors) => {
    console.error('Errors:', errors);
  }
);

  const handleHide = () => {
    methods.reset();
    onHide();
  };

  const footer = (
    <>
      <Button icon="pi pi-times" label="Cancel" onClick={handleHide} text />
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={onSubmit} text type="submit" />
    </>
  );

  const kelompokBarangOptionsDropdown = Object.entries(KelompokBarangEnum).map(([key, value]) => ({
    label: value,
    value: key
  }));

  console.log('Loading State:', { edit, isLoading, selectedId });

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        className="p-fluid"
        footer={footer}
        header={edit ? "Edit Insentif Mekanik" : "Tambah Insentif Mekanik"}
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
            <form className='' onSubmit={onSubmit}>
                <Input id="p_code" label="Kode" readOnly required />
                <Input id="p_name" label="Nama" required />
                <Input id="p_barcode" label="Barcode"  />
                <Input id="p_popular_name" label="Nama Populer"  />
                <Input id="p_type" label="Type"  />
                <Input id="p_part_number" label="Part Number" />
                <Input id="p_use" label="Dipakai"  />
                <Dropdown id="p_group" label="Kelompok Barang" options={kelompokBarangOptionsDropdown} required />
                <Dropdown id="p_unit_id" isLoading={satuanIsLoading} label="Satuan"  options={satuanDataDropdown} required/>
                <Input id="p_stock" label="Reorder Qty" required type={InputTypeEnum.NUMBER} />
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
