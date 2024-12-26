import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { ReactElement} from "react";
import { useRef } from "react";
import { useDeleteMobilQuery } from "@/src/services/master/mobil/tanstack/use-delete-mobil-query";

type MobilDialogDeleteConfirmationType = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}

export function MobilDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: MobilDialogDeleteConfirmationType): ReactElement {

    const toast = useRef<Toast>(null);
    const deleteMobil = useDeleteMobilQuery(selectedId ?? '');

    const deleteMobilFunction = async () => {
        try {
            await deleteMobil.mutateAsync(selectedId ?? '');
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
                loading={deleteMobil.isPending}
                onClick={() =>deleteMobilFunction}
                text
            />
        </>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                footer={deleteDialogFooter}
                header="Confirm"
                modal
                onHide={onHide}
                style={{ width: "450px" }}
                visible={visible}
            >
                <div className="flex align-items-center justify-content-center">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    <span>
                        Apakah Anda yakin ingin menghapus data ini?
                    </span>
                </div>
            </Dialog>
        </>
    );
}