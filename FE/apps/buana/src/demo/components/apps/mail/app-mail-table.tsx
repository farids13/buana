import type {ReactElement} from "react";
import React, {useState, useRef, useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import {classNames} from "primereact/utils";
import {Dialog} from "primereact/dialog";
import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableRowMouseEvent,
} from "primereact/datatable";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Menu} from "primereact/menu";
import {Avatar} from "primereact/avatar";
import type {ColumnBodyOptions} from "primereact/column";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import type {Demo} from "@/types/types";
import {MailContext} from "./context/mail-context";
import AppMailReply from "./app-mail-reply";

interface AppMailTableProps {
  mails: Demo.Mail[];
}

export default function AppMailTable(props: AppMailTableProps): ReactElement {
  const [mail, setMail] = useState<Demo.Mail | null>(null);
  const [selectedMails, setSelectedMails] = useState<Demo.Mail[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const {
    onStar,
    onArchive,
    onBookmark,
    onTrash,
    onDelete,
    onDeleteMultiple,
    onSpamMultiple,
    onArchiveMultiple,
    clearMailActions,
  } = useContext(MailContext);
  const menu = useRef<Menu | null>(null);
  const dt = useRef<DataTable<Demo.Mail[]>>(null);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const onGlobalFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const _filters = {...filters};

    (_filters.global as DataTableFilterMetaData).value = value;

    setFilters(_filters);

    setGlobalFilterValue(value);
  };

  const initFilters = (): void => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      name: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}],
      },
      representative: {value: null, matchMode: FilterMatchMode.IN},
      date: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}],
      },
      activity: {value: null, matchMode: FilterMatchMode.BETWEEN},
      verified: {value: null, matchMode: FilterMatchMode.EQUALS},
    });
    setGlobalFilterValue("");
  };

  const menuItems = [
    {
      label: "Archive",
      icon: "pi pi-fw pi-file",
      command: () => {
        handleArchiveMultiple();
      },
    },
    {
      label: "Spam",
      icon: "pi pi-fw pi-ban",
      command: () => {
        handleSpamMultiple();
      },
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => {
        handleDeleteMultiple();
      },
    },
  ];

  const onRowSelect = (id: number): void => {
    router.push(`/apps/mail/detail/${id}`);
  };

  const handleStar = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.TouchEvent<HTMLSpanElement>,
    id: number
  ): void => {
    event.stopPropagation();
    onStar(id);
  };

  const handleArchive = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.TouchEvent<HTMLSpanElement>,
    _mail: Demo.Mail
  ): void => {
    event.stopPropagation();
    clearMailActions(_mail);
    onArchive(_mail.id);
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Mail archived",
      life: 3000,
    });
  };

  const handleBookmark = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.TouchEvent<HTMLSpanElement>,
    id: number
  ): void => {
    event.stopPropagation();
    onBookmark(id);
  };

  const handleDelete = (id: number): void => {
    onDelete(id);
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Mail deleted",
      life: 3000,
    });
  };

  const handleDeleteMultiple = (): void => {
    const _selectedMails = [...selectedMails];
    if (_selectedMails.length > 0) {
      for (const _mail of _selectedMails) {
        clearMailActions(_mail);
      }

      onDeleteMultiple(selectedMails);
      toast.current?.show({
        severity: "info",
        summary: "Info",
        detail: "Moved to deleted",
        life: 3000,
      });
    }
  };

  const handleSpamMultiple = (): void => {
    const _selectedMails = [...selectedMails];
    if (_selectedMails.length > 0) {
      for (const _mail of _selectedMails) {
        clearMailActions(_mail);
      }

      onSpamMultiple(selectedMails);
      toast.current?.show({
        severity: "info",
        summary: "Info",
        detail: "Moved to spam",
        life: 3000,
      });
    }
  };

  const handleArchiveMultiple = (): void => {
    const _selectedMails = [...selectedMails];
    if (_selectedMails.length > 0) {
      for (const _mail of _selectedMails) {
        clearMailActions(_mail);
      }

      onArchiveMultiple(selectedMails);
      toast.current?.show({
        severity: "info",
        summary: "Info",
        detail: "Moved to archive",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    initFilters();
  }, []);

  const handleTrash = (
    event: React.MouseEvent<HTMLButtonElement>,
    _mail: Demo.Mail
  ): void => {
    event.stopPropagation();
    if (_mail.trash) {
      handleDelete(_mail.id);
    }
    onTrash(_mail.id);
  };

  const handleReply = (
    event: React.MouseEvent<HTMLButtonElement>,
    _mail: Demo.Mail
  ): void => {
    event.stopPropagation();
    setMail(_mail);
    setDialogVisible(true);
  };

  const actionHeaderTemplate = (
    <div className="flex -ml-2">
      <Button
        className="p-button-plain"
        icon="pi pi-refresh"
        rounded
        text
        type="button"
      />
      <Button
        className="p-button-plain ml-3"
        icon="pi pi-ellipsis-v"
        onClick={(event) => menu.current?.toggle(event)}
        rounded
        text
        type="button"
      />
      <Menu model={menuItems} popup ref={menu} />
    </div>
  );

  const actionsBodyTemplate = (_mail: Demo.Mail): ReactElement => {
    return (
      <>
        {!_mail.trash && !_mail.spam ? (
          <div className="flex">
            <span
              className="cursor-pointer"
              onClick={(e) => {
                handleStar(e, _mail.id);
              }}
              onTouchEnd={(e) => {
                handleStar(e, _mail.id);
              }}
              style={{width: "4rem"}}
            >
              <i
                className={classNames("pi pi-fw text-xl", {
                  "pi-star-fill": _mail.starred,
                  "pi-star": !_mail.starred,
                })}
              />
            </span>

            <span
              className="cursor-pointer"
              onClick={(e) => {
                handleBookmark(e, _mail.id);
              }}
              onTouchEnd={(e) => {
                handleBookmark(e, _mail.id);
              }}
            >
              <i
                className={classNames("pi pi-fw text-xl", {
                  "pi-bookmark-fill": _mail.important,
                  "pi-bookmark": !_mail.important,
                })}
              />
            </span>
          </div>
        ) : null}
      </>
    );
  };

  const avatarBodyTemplate = (_mail: Demo.Mail): ReactElement => {
    const folder = _mail.image ? "demo" : "layout";
    const imageName = _mail.image ? _mail.image : "avatar.png";
    return (
      <Avatar
        image={`/${folder}/images/avatar/${imageName}`}
        onClick={() => {
          onRowSelect(_mail.id);
        }}
      />
    );
  };

  const authorBodyTemplate = (_mail: Demo.Mail): ReactElement => {
    return (
      <div
        className="text-900 font-semibold"
        onClick={() => {
          onRowSelect(_mail.id);
        }}
        style={{minWidth: "12rem"}}
      >
        {_mail.from || _mail.to}
      </div>
    );
  };

  const titleBodyTemplate = (_mail: Demo.Mail): ReactElement => {
    return (
      <span
        className="font-medium white-space-nowrap overflow-hidden text-overflow-ellipsis block"
        onClick={() => {
          onRowSelect(_mail.id);
        }}
        style={{maxWidth: "30rem", minWidth: "12rem"}}
      >
        {_mail.title}
      </span>
    );
  };

  const onRowMouseEnter = (event: DataTableRowMouseEvent): void => {
    event.originalEvent.preventDefault();
    const id = event.index;
    const dateEl = document.getElementById(`${id}-date`);
    const optsEl = document.getElementById(`${id}-options`);
    if (optsEl) {
      optsEl.style.display = "flex";
    }
    if (dateEl) {
      dateEl.style.display = "none";
    }
  };

  const onRowMouseLeave = (event: DataTableRowMouseEvent): void => {
    event.originalEvent.preventDefault();
    const id = event.index;
    const dateEl = document.getElementById(`${id}-date`);
    const optsEl = document.getElementById(`${id}-options`);
    if (optsEl) {
      optsEl.style.display = "none";
    }
    if (dateEl) {
      dateEl.style.display = "flex";
    }
  };

  const dateHeaderTemplate = (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        className="w-full sm:w-auto"
        id="search"
        onChange={onGlobalFilterChange}
        placeholder="Search Mail"
        value={globalFilterValue}
      />
    </span>
  );

  const dateBodyTemplate = (
    _mail: Demo.Mail,
    columnOptions: ColumnBodyOptions
  ): ReactElement => {
    return (
      <div className="cursor-pointer" style={{minWidth: "10rem"}}>
        <div className="flex justify-content-end w-full px-0">
          <span
            className="text-700 font-semibold white-space-nowrap"
            id={`${columnOptions.rowIndex.toString()}-date`}
          >
            {_mail.date}
          </span>
          <div
            id={`${columnOptions.rowIndex.toString()}-options`}
            style={{display: "none"}}
          >
            <Button
              className="h-2rem w-2rem mr-2"
              icon="pi pi-inbox"
              onClick={(event) => {
                handleArchive(event, _mail);
              }}
              tooltip="Archive"
              tooltipOptions={{position: "top"}}
              type="button"
            />
            <Button
              className="h-2rem w-2rem mr-2"
              icon="pi pi-reply"
              onClick={(event) => {
                handleReply(event, _mail);
              }}
              severity="secondary"
              tooltip="Reply"
              tooltipOptions={{position: "top"}}
              type="button"
            />
            <Button
              className="h-2rem w-2rem"
              icon="pi pi-trash"
              onClick={(event) => {
                handleTrash(event, _mail);
              }}
              severity="danger"
              tooltip="Trash"
              tooltipOptions={{position: "top"}}
              type="button"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        emptyMessage="No mails found."
        filters={filters}
        globalFilterFields={["from", "to", "title"]}
        onRowMouseEnter={onRowMouseEnter}
        onRowMouseLeave={onRowMouseLeave}
        onSelectionChange={(e) => {
          setSelectedMails(e.value);
        }}
        paginator
        ref={dt}
        responsiveLayout="scroll"
        rowHover
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
        selection={selectedMails}
        selectionMode="checkbox"
        value={props.mails}
      >
        <Column selectionMode="multiple" style={{width: "4rem"}} />
        <Column
          body={actionsBodyTemplate}
          header={actionHeaderTemplate}
          style={{width: "8rem"}}
        />
        <Column body={avatarBodyTemplate} style={{minWidth: "4rem"}} />
        <Column body={authorBodyTemplate} />
        <Column body={titleBodyTemplate} style={{minWidth: "12rem"}} />
        <Column
          body={dateBodyTemplate}
          field="date"
          header={dateHeaderTemplate}
        />
      </DataTable>
      <Dialog
        className="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6"
        closable
        contentClassName="border-round-bottom border-top-1 surface-border p-0"
        header="New Message"
        modal
        onHide={() => {
          setDialogVisible(false);
        }}
        visible={dialogVisible}
      >
        <AppMailReply
          content={mail}
          hide={() => {
            setDialogVisible(false);
          }}
        />
      </Dialog>
    </>
  );
}
