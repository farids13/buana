"use client"
import type { ReactElement } from "react";
import React, { useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Toast } from 'primereact/toast';

const Dashboard = (): ReactElement => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  const handleDelete = (id: number) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: `Member ${id} deleted successfully`,
      life: 3000
    });
  };

  const handleEdit = (id: number) => {
    toast.current?.show({
      severity: 'info',
      summary: 'Info',
      detail: `Editing member ${id}`,
      life: 3000
    });
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="card">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <h2 className="tw-text-2xl tw-font-semibold">{t('Member List')}</h2>
            <Link href="/members/add">
              <Button 
                icon="pi pi-plus" 
                label={t('Add Member')}
                className="p-button-primary"
              />
            </Link>
          </div>

          <DataTable 
            value={members} 
            paginator 
            rows={10} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            className="p-datatable-gridlines"
            showGridlines 
            responsiveLayout="scroll"
          >
            <Column field="id" header={t('ID')} sortable style={{ width: '10%' }}></Column>
            <Column field="name" header={t('Name')} sortable style={{ width: '30%' }}></Column>
            <Column field="email" header={t('Email')} sortable style={{ width: '30%' }}></Column>
            <Column field="role" header={t('Role')} sortable style={{ width: '20%' }}></Column>
            <Column 
              body={(rowData) => (
                <div className="tw-flex tw-gap-2">
                  <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-sm" 
                    onClick={() => handleEdit(rowData.id)} 
                  />
                  <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-button-sm" 
                    onClick={() => handleDelete(rowData.id)}
                  />
                </div>
              )}
              header={t('Actions')} 
              style={{ width: '10%' }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
