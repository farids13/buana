import type { UseMutateFunction } from "@tanstack/react-query";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

type ExportButtonProps = {
  action: UseMutateFunction<Blob, unknown, string>;
} & ButtonProps;

export default function ExportButton({ action, ...props }: ExportButtonProps) {
  const menuRef = useRef<Menu>(null);
  const { t } = useTranslation();
  const exportMenu = [
    {
      label: "CSV",
      icon: "pi pi-file",
      command: () => {
        action("CSV");
      },
    },
    {
      label: "Excel",
      icon: "pi pi-file-excel",
      command: () => {
        action("EXCEL");
      },
    },
  ];

  return (
    <>
      <Button onClick={(event) => menuRef?.current?.toggle(event)} {...props} type="button">
        {t('Export')}
      </Button>
      <Menu model={exportMenu} popup ref={menuRef} />
    </>
  );
}
