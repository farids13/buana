'use client';

import {TabView, TabPanel} from 'primereact/tabview';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import OrderForm from "@/src/app/(main)/service-advisor/customer-visit/forms/order-form";

function CustomerVisitEditPage(): ReactElement {

    const [formData, setFormData] = useState({
        orderNumber: "",
        licensePlate: "",
        customerName: "",
        arrivalDate: "",
        odometer: 0,
        serviceType: null,
        complaint: ""
    });

    const licensePlates = [
        {label: "B 1234 ABC", value: "B1234ABC"},
        {label: "B 2345 BCD", value: "B2345BCD"},
        {label: "B 3456 CDE", value: "B3456CDE"},
        {label: "B 4567 DEF", value: "B4567DEF"},
        {label: "B 5678 EFG", value: "B5678EFG"},
        {label: "B 6789 FGH", value: "B6789FGH"},
        {label: "B 7890 GHI", value: "B7890GHI"},
        {label: "B 8901 HIJ", value: "B8901HIJ"},
        {label: "B 9012 IJK", value: "B9012IJK"},
        {label: "B 0123 JKL", value: "B0123JKL"}
    ];

    const barangMelekat = [
        {name: 'Ban Cadangan', quantity: 1},
        {name: 'Toolkit', quantity: 1},
        {name: 'Segitiga Pengaman', quantity: 1},
        {name: 'Rompi Keselamatan', quantity: 1}
    ];

    const kondisiKendaraan = [
        {part: 'Mesin', condition: 'Baik'},
        {part: 'Rem', condition: 'Perlu Perbaikan'},
        {part: 'Ban', condition: 'Baik'},
        {part: 'Suspensi', condition: 'Baik'},
        {part: 'Kaca Depan', condition: 'Baik'},
        {part: 'Lampu Depan', condition: 'Perlu Perbaikan'},
        {part: 'AC', condition: 'Baik'},
        {part: 'Baterai', condition: 'Baik'}
    ];

    const items = [
        {
            kode: 'IND-001',
            sparePart: 'Hydraulic Jack',
            partNumber: 'HJ-1001',
            dipakai: 'Mekanik A',
            qty: 1,
            hargaSatuan: 750000,
            nilai: 750000,
            mekanikPenerima: 'Mekanik B'
        },
        {
            kode: 'IND-002',
            sparePart: 'Wrench Set',
            partNumber: 'WS-1002',
            dipakai: 'Mekanik C',
            qty: 3,
            hargaSatuan: 300000,
            nilai: 900000,
            mekanikPenerima: 'Mekanik D'
        },
        {
            kode: 'IND-003',
            sparePart: 'Safety Vest',
            partNumber: 'SV-1003',
            dipakai: 'Mekanik E',
            qty: 2,
            hargaSatuan: 100000,
            nilai: 200000,
            mekanikPenerima: 'Mekanik F'
        }
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Formulir Kunjungan Pelanggan</h4>
                    <div className="flex justify-content-end mb-3">
                        <Button icon="pi pi-print" label="Cetak Tanda Terima Order Kerja" onClick={() => {
                            // console.log('Print receipt');
                        }}/>
                    </div>
                    <TabView>
                        <TabPanel header="Order Kerja">
                            <OrderForm
                                formData={formData}
                                handleSubmit={null}
                                licensePlates={licensePlates}
                                setFormData={setFormData}
                            />
                        </TabPanel>
                        <TabPanel header="Periksa Kendaraan">
                            <div className="grid">
                                <div className="col-6">
                                    <h5>Daftar Barang Melekat</h5>
                                    <DataTable className="p-datatable-striped" value={barangMelekat}>
                                        <Column field="name" header="Nama Barang"/>
                                        <Column body={VehiclePartAmount} field="quantity" header="Kuantitas"/>
                                    </DataTable>
                                </div>
                                <div className="col-6">
                                    <h5>Kondisi Kendaraan</h5>
                                    <DataTable className="p-datatable-striped" value={kondisiKendaraan}>
                                        <Column field="part" header="Bagian"/>
                                        <Column
                                            body={VehiclePartCondition}
                                            field="condition"
                                            header="Kondisi"
                                        />
                                    </DataTable>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Keranjang Belanja">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="workshop-bon">Bon
                                    Bengkel</label>
                                <InputText className="mt-1 block w-full" id="workshop-bon"
                                           placeholder="Masukkan bon bengkel"/>
                                <Button className="mt-3" label="Item Pakai" onClick={() => {
                                    // Handle item use logic here
                                }}/>
                            </div>
                            <DataTable className="p-datatable-striped" value={items}>
                                <Column field="kode" header="Kode"/>
                                <Column field="nama" header="Nama"/>
                                <Column field="partNumber" header="Part Number"/>
                                <Column field="dipakai" header="Dipakai"/>
                                <Column field="qty" header="Qty"/>
                                <Column field="hargaSatuan" header="Harga Satuan"/>
                                <Column field="nilai" header="Nilai"/>
                                <Column field="mekanikPenerima" header="Mekanik Penerima"/>
                            </DataTable>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
}

function VehiclePartAmount(rowData: { quantity: number | null | undefined; }): ReactElement {
    return <InputNumber
        min={0}
        onValueChange={(e) => {
            e.value;
        }}
        placeholder="Masukkan kuantitas"
        style={{width: '100%'}} // Fill the cell
        value={rowData.quantity}
    />;
}

function VehiclePartCondition(rowData: { condition: any; }): ReactElement {
    return <Dropdown
        onChange={(e) => {
            e.value;
        }}
        options={[
            {label: 'Baik', value: 'baik'},
            {label: 'Perlu Perbaikan', value: 'perlu_perbaikan'},
            {label: 'Rusak', value: 'rusak'}
        ]}
        placeholder="Pilih kondisi"
        style={{width: '100%'}} // Fill the cell
        value={rowData.condition}
    />;
}

export default CustomerVisitEditPage;
