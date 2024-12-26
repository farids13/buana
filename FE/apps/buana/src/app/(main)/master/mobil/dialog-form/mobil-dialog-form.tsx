'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ReactElement } from 'react';
import { useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import Input, { InputTypeEnum } from '@/src/components/ui/input-form';
import Switch from '@/src/components/ui/switch';
import Dropdown from "@/src/components/ui/dropdown";
import TextArea from "@/src/components/ui/text-area";
import MultiSelect from "@/src/components/ui/multi-select";
import { useGetDetailMobilQuery } from "@/src/services/master/mobil/tanstack/use-get-detail-mobil-query";
import { useInsertMobilQuery } from "@/src/services/master/mobil/tanstack/use-insert-mobil-query";
import { upsertMobilSchema, UpsertMobilSchema } from "@/src/lib/validation/master/mobil/upsert-mobil-schema";
import { useUpdateMobilQuery } from "@/src/services/master/mobil/tanstack/use-update-mobil-query";
import { useGetDropdownModelMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-get-dropdown-model-mobil-query";
import { useGetDropdownPelangganQuery } from "@/src/services/master/pelanggan/tanstack/use-get-dropdown-pelanggan-query";
import { useGetDropdownMerekMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/merek-mobil/use-get-dropdown-merek-mobil-schama";
import { Tooltip } from 'primereact/tooltip';

type MobilDialogFormProps = {
  visible: boolean;
  edit?: boolean;
  selectedId: string | null;
  onHide: () => void;
};

export function MobilDialogForm({
  visible,
  edit,
  selectedId,
  onHide
}: MobilDialogFormProps): ReactElement {

  const { data, isLoading } = useGetDetailMobilQuery(selectedId ?? '');


  const defaultValues: UpsertMobilSchema = {
    car_license_number: '',
    cm_id: '',
    cb_id: '',
    customers: [],
    car_year: 0,
  };

  const values: UpsertMobilSchema = edit && selectedId && data ? data : defaultValues;

  const insertMobil = useInsertMobilQuery();
  const updateMobil = useUpdateMobilQuery();

  const methods = useForm<UpsertMobilSchema>({
    resolver: zodResolver(upsertMobilSchema),
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

  const { data: dropdownMerekMobil, isLoading: isLoadingDropdownMerekMobil } = useGetDropdownMerekMobilQuery();
  const { data: dropdownPelanggan, isLoading: isLoadingDropdownPelanggan } = useGetDropdownPelangganQuery();
  
  const { handleSubmit, watch } = methods;
  const selectedMerekId = watch('cb_id');

  const { data: dropdownModelMobil, isLoading: isLoadingDropdownModelMobil } = useGetDropdownModelMobilQuery(selectedMerekId ?? '');
  
  const isMutating = insertMobil.isPending || updateMobil.isPending;
  const onSubmit = handleSubmit((data) => {
    if (edit) {
      updateMobil.mutateAsync(data)
        .then(() => {
          methods.reset(defaultValues);
          handleHide();
        })
        .catch((error) => {
          console.error('Update error:', error);
        });
    } else {
      insertMobil.mutateAsync(data)
        .then(() => {
          methods.reset(defaultValues);
          handleHide();
        })
        .catch((error) => {
          console.error('Submit error:', error);
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
        header={edit ? "Edit Mobil" : "Tambah Mobil"}
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
                <Input id="car_license_number" label="Nomor Polisi" required />
              </div>
              <div className="field">
                <Dropdown
                
                  id="cb_id"
                  label="Merek Mobil"
                  options={dropdownMerekMobil}
                  loading={isLoadingDropdownMerekMobil}
                  required
                />
              </div>
              <div className="field">
                {!selectedMerekId && (
                  <Tooltip target=".model-mobil-wrapper" position="top">
                    Silakan pilih merek mobil terlebih dahulu
                  </Tooltip>
                )}
                <div className="model-mobil-wrapper">
                  <Dropdown
                    id="cm_id"
                    label="Model Mobil"
                    options={dropdownModelMobil}
                    loading={isLoadingDropdownModelMobil} 
                    disabled={!selectedMerekId}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <MultiSelect
                
                  id="customers"
                  label="Pelanggan" 
                  options={dropdownPelanggan ?? []}
                  loading={isLoadingDropdownPelanggan}
                  required
                />
              </div>
              <div className="field">
                <Input id="car_machine_number" label="Nomor Rangka Mesin"  />
              </div>
              <div className="field">
                <Input id="car_year" label="Tahun Mobil"  type={InputTypeEnum.NUMBER} />
              </div>
              <div className="field">
                <TextArea id="car_note" label="Catatan" rows={3} />
              </div>
              <div className='flex gap-4 '>
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
