import { useDeleteInsentifMekanikQuery } from "@/src/services/master/insentif-mekanik/tanstack/use-delete-insentif-mekanik-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ReactElement, useRef } from "react";

type IMDialogDeleteConfirmation = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}


export function IMDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: IMDialogDeleteConfirmation) : ReactElement {

const toast = useRef<Toast>(null);


const deleteInsentifMekanik = useDeleteInsentifMekanikQuery(selectedId ?? '');
const deleteIM = async () => {
    try {
        await deleteInsentifMekanik.mutateAsync(selectedId ?? '');
        onHide();
        toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Data berhasil dihapus',
          });
        
    } catch (error) {
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Terjadi kesalahan saat menghapus data',
          });
    }
}

const deleteDialogFooter = (
    <>
        <Button
            icon="pi pi-times"
            label="No"
            onClick={onHide}
            text
        />
        <Button
            icon="pi pi-check"
            label="Yes"
            loading={deleteInsentifMekanik.isPending}
            onClick={deleteIM}
            text
        />
    </>
)
    return (
        <>
            <Toast ref={toast} />
            <Dialog
                footer={deleteDialogFooter}
                header="Confirm"
                modal
                onHide={onHide}
                style={{width: "450px"}}
                visible={visible}
                >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{fontSize: "2rem"}}
                />
                <span>
                    Apakah Anda yakin ingin menghapus data ini?
                </span>
            </div>
          </Dialog>
                </>
    );
}