"use client"
import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Toast } from 'primereact/toast';
import { useGetMembers } from "@/lib/api/member/get-member";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteMember } from "@/lib/api/member/delete-member";
import { confirmDialog } from 'primereact/confirmdialog';
import SearchInput from "@/components/ui/search-input";

const Member = (): ReactElement => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  const deleteMember = useDeleteMember();

  const searchParams = useSearchParams();
  
  const search = searchParams?.get("search") ?? "";

  const { data, isLoading, isFetching, error } = useGetMembers({
    pageIndex,
    limit: pageSize,
    search,
  });
  
  const handleDelete = (id: string) => {
    confirmDialog({
      message: t('Apakah Anda yakin ingin menghapus member ini?'),
      header: t('Konfirmasi Hapus'),
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: t('Ya'),
      rejectLabel: t('Tidak'),
      accept: () => {
        deleteMember.mutate(id);
      }
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/members/edit/${id}`);
  };

  const onPageChange = (event: any) => {
    setPageSize(event.rows);
    setPageIndex(event.page);
  };

  // console.log("data ini om ", data);
  return (
    <div className="grid">
      <Toast ref={toast} />
      <ConfirmDialog />
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

          <div className="tw-mb-4">
            <SearchInput className="tw-w-full md:tw-w-96" />
          </div>

          <DataTable 
            value={data?.data ?? []}
            paginator 
            rows={pageSize}
            totalRecords={data?.total ?? 0}
            rowsPerPageOptions={[5, 10, 25, 50]} 
            className="p-datatable-gridlines"
            showGridlines 
            loading={isLoading || isFetching}
            lazy
            onPage={onPageChange}
            first={pageIndex * pageSize}
          >
            <Column field="id" header={t('ID')} style={{ width: '10%' }}></Column>
            <Column field="name" header={t('Name')}  style={{ width: '25%' }}></Column>
            <Column field="email" header={t('Email')}  style={{ width: '25%' }}></Column>
            <Column field="position" header={t('Position')}  style={{ width: '20%' }}></Column>
            <Column field="departement" header={t('Department')}  style={{ width: '10%' }}></Column>
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

export default Member;
