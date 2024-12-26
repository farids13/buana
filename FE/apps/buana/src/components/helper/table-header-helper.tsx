import { Button } from "primereact/button";
import type { ReactElement } from "react";
import SearchInput from "@/src/components/ui/search-input-form";

interface TableHeaderHelperProps {
  onAdd: () => void;
  onClearFilter: () => void;
}

export function TableHeaderHelper({ 
  onAdd, 
  onClearFilter 
}: TableHeaderHelperProps): ReactElement {
  return (
    <div className="flex justify-content-between">
      <div className="flex gap-2">
        <Button
          icon="pi pi-plus"
          label="Tambah"
          onClick={onAdd}
          severity="success"
        />
      </div>
      <div>
        <span className="p-input-icon-left mr-2">
          <i className="pi pi-search" />
          <SearchInput />
        </span>
        <Button
          icon="pi pi-filter-slash"
          onClick={onClearFilter}
          outlined
          type="button"
        />
      </div>
    </div>
  );
}