import { useDeleteItemQuery } from "@/src/services/master/item/tanstack/use-delete-item-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ReactElement, useRef } from "react";

type ItemDialogDeleteConfirmation = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}


export function ItemDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: ItemDialogDeleteConfirmation) : ReactElement {

const toast = useRef<Toast>(null);


const deleteItem = useDeleteItemQuery(selectedId ?? '');
const deleteItemFunction = async () => {
    try {
        await deleteItem.mutateAsync(selectedId ?? '');
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
            loading={deleteItem.isPending}
            onClick={deleteItemFunction}
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