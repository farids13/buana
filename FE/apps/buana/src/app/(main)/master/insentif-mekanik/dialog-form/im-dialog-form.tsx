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
import { useGetDetailInsentifMekanikQuery } from '@/src/services/master/insentif-mekanik/tanstack/use-get-detail-insentif-mekanik-query';
import type { UpsertInsentifMekanikSchema} from '@/src/lib/validation/master/insentif-mekanik/upsert-insentif-mekanik-schema';
import { upsertInsentifMekanikSchema, upsertInsentifMekanikSchemaForm, UpsertInsentifMekanikSchemaForm } from '@/src/lib/validation/master/insentif-mekanik/upsert-insentif-mekanik-schema';
import { InsentifMekanikEnum } from '@/src/lib/enum/master/insentif-mekanik-enum';
import { useUpdateInsentifMekanikQuery } from '@/src/services/master/insentif-mekanik/tanstack/use-update-insentif-mekanik-query';
import { useInsertInsentifMekanikQuery } from '@/src/services/master/insentif-mekanik/tanstack/use-insert-insentif-mekanik-query';
import Dropdown from "@/src/components/ui/dropdown";

type IMDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function IMDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: IMDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailInsentifMekanikQuery(selectedId ?? '');
  
  const defaultValues: UpsertInsentifMekanikSchema = {
    ins_code: '',
    ins_type: InsentifMekanikEnum.RUPIAH,
    ins_value: 0
  };
  
  const values: UpsertInsentifMekanikSchema = edit && selectedId && data ? data : defaultValues;
  
  const insertInsentifMekanik = useInsertInsentifMekanikQuery();
  const updateInsentifMekanik = useUpdateInsentifMekanikQuery();
  
  const methods = useForm<UpsertInsentifMekanikSchema>({
    resolver: zodResolver(upsertInsentifMekanikSchema),
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
  
  const { handleSubmit, watch } = methods;
  const insType = watch('ins_type');
  
  const isMutating = insertInsentifMekanik.isPending || updateInsentifMekanik.isPending;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (edit) {
        await updateInsentifMekanik.mutateAsync(data);
      } else {
        await insertInsentifMekanik.mutateAsync(data);
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
      <Button icon="pi pi-check" label="Save" loading={isMutating} onClick={onSubmit} text type="submit" />
    </>
  );

  const instTypeOptionsDropdown = Object.entries(InsentifMekanikEnum).map(([key, value]) => ({
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
              <div className="field">
                <Input id="ins_code" label="Kode" required />
              </div>
              <div className="field">
                <Dropdown id="ins_type" label="Type" options={instTypeOptionsDropdown} required />
              </div>
              <div className="field">
                <Input id="ins_value" label="Nilai"
                  required
                  type={insType === 'RUPIAH' ? InputTypeEnum.CURRENCY : InputTypeEnum.PERCENTAGE} />
              </div>
            </form>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}
