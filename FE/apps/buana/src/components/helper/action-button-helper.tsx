import { Button } from "primereact/button";

interface ActionButtonsProps {
    id: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }
  
  export function ActionButtonHelper({ id, onEdit, onDelete }: ActionButtonsProps): React.ReactNode {
    return (
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-pencil"
          onClick={() => { onEdit(id); }}
          outlined
          rounded
          severity="info"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => { onDelete(id); }}
          outlined
          rounded
          severity="danger"
        />
      </div>
    );
  }