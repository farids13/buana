import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { ReactElement} from "react";
import { useRef } from "react";
import { useDeleteModelMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/model-mobil/use-delete-model-mobil-query";

type ModelMobilDialogDeleteConfirmation = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}


export function ModelMobilDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: ModelMobilDialogDeleteConfirmation) : ReactElement {

const toast = useRef<Toast>(null);


const deleteModelMobil = useDeleteModelMobilQuery(selectedId ?? '');
const deleteModelMobilHandler = async () => {
    try {
        await deleteModelMobil.mutateAsync(selectedId ?? '');
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
            loading={deleteModelMobil.isPending}
            onClick={deleteModelMobilHandler}
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