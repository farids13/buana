import { useDeleteMerekMobilQuery } from "@/src/services/master/merek-model-mobil/tanstack/merek-mobil/use-delete-merek-mobil-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ReactElement, useRef } from "react";

type MerekMobilDialogDeleteConfirmationType = {
    visible: boolean;
    onHide: () => void;
    selectedId: string | null;
}

export function MerekMobilDialogDeleteConfirmation({
    visible,
    onHide,
    selectedId
}: MerekMobilDialogDeleteConfirmationType): ReactElement {

    const toast = useRef<Toast>(null);
    const deleteMerekMobil = useDeleteMerekMobilQuery(selectedId ?? '');

    const deleteMM = async () => {
        try {
            await deleteMerekMobil.mutateAsync(selectedId ?? '');
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
                loading={deleteMerekMobil.isPending}
                onClick={() =>deleteMM}
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