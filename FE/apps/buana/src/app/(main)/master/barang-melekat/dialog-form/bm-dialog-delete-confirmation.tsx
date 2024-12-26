import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { ReactElement} from "react";
import { useRef } from "react";
import { useDeleteBarangMelekatQuery } from "@/src/services/master/barang-melekat/tanstack/use-delete-barang-melekat-query";

type BMDialogDeleteConfirmationType = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}


export function BMDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: BMDialogDeleteConfirmationType) : ReactElement {

const toast = useRef<Toast>(null);


const deleteBarangMelekat = useDeleteBarangMelekatQuery(selectedId ?? '');
const deleteBM = async () => {
    try {
        await deleteBarangMelekat.mutateAsync(selectedId ?? '');
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

const deleteProductsDialogFooter = (
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
            loading={deleteBarangMelekat.isPending}
            onClick={() => deleteBM}
            text
        />
    </>
)
    return (
        <>
            <Toast ref={toast} />
            <Dialog
                footer={deleteProductsDialogFooter}
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