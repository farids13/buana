import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';

function OrderForm({formData, setFormData, handleSubmit, licensePlates}): ReactElement {

    const [isCustomerFound, setIsCustomerFound] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<{ label: string; value: string } | null>(null);
    const [customerVehicles, setCustomerVehicles] = useState<Record<string, string[]>>({
        "john_doe": ["B 1234 ABC", "B 2345 BCD"],
        "jane_smith": ["B 3456 CDE"],
        "robert_johnson": ["B 4567 DEF", "B 5678 EFG"],
        "mary_williams": ["B 6789 FGH"],
        "james_brown": ["B 7890 GHI", "B 8901 HIJ"],
        "patricia_davis": ["B 9012 IJK", "B 0123 JKL"],
        "michael_miller": [],
        "linda_wilson": [],
        "william_moore": [],
        "elizabeth_taylor": []
    });


    const customers = [
        {label: "John Doe", value: "john_doe"},
        {label: "Jane Smith", value: "jane_smith"},
        {label: "Robert Johnson", value: "robert_johnson"},
        {label: "Mary Williams", value: "mary_williams"},
        {label: "James Brown", value: "james_brown"},
        {label: "Patricia Davis", value: "patricia_davis"},
        {label: "Michael Miller", value: "michael_miller"},
        {label: "Linda Wilson", value: "linda_wilson"},
        {label: "William Moore", value: "william_moore"},
        {label: "Elizabeth Taylor", value: "elizabeth_taylor"}
    ];
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleLicensePlateChange = (e) => {
        const selectedPlate = e.value;
        const normalizedPlate = selectedPlate.replace(/\s+/g, ''); // Remove spaces from the selected plate

        // Simulate searching for customer based on license plate
        const foundCustomer = customers.find(customer =>
            customerVehicles[customer.value]?.some(plate => plate.replace(/\s+/g, '') === normalizedPlate)
        );

        setFormData({
            ...formData,
            licensePlate: selectedPlate,
            customerName: foundCustomer ? foundCustomer.label : "Customer Umum"
        });

        setSelectedCustomer(foundCustomer || null);
        setIsCustomerFound(Boolean(foundCustomer));
    };

    return (
        <form className="p-fluid" onSubmit={handleSubmit}>
            <div className="grid formgrid">
                <div className="field col-12 md:col-12">
                    <label htmlFor="orderNumber">Nomor Order</label>
                    <InputText
                        id="orderNumber"
                        onChange={(e) => {
                            setFormData({...formData, orderNumber: e.target.value});
                        }}
                        placeholder="Masukkan nomor order"
                        required
                        style={{fontSize: '1.5em'}}
                        value={formData.orderNumber}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <label htmlFor="arrivalDate">Tanggal Kunjungan</label>
                    <Calendar
                        id="arrivalDate"
                        onChange={(e) => {
                            setFormData({...formData, arrivalDate: e.value as Date});
                        }}
                        required
                        showTime
                        value={formData.arrivalDate}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <label htmlFor="licensePlate">Nomor Polisi</label>
                    <Dropdown
                        filter
                        filterBy="label"
                        filterMatchMode="contains"
                        id="licensePlate"
                        onChange={handleLicensePlateChange}
                        options={licensePlates}
                        placeholder="Pilih atau Ketik Nomor Polisi"
                        required
                        value={formData.licensePlate?.replace(/\s+/g, '')}
                        virtualScrollerOptions={{itemSize: 38}}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <label htmlFor="customerName">Nama Pelanggan</label>
                    <InputText
                        id="customerName"
                        readOnly
                        value={formData.customerName}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <label htmlFor="odometer">Kilometer Masuk</label>
                    <InputNumber
                        id="odometer"
                        min={0}
                        onValueChange={(e) => {
                            setFormData({...formData, odometer: e.value ?? 0});
                        }}
                        placeholder="Masukkan kilometer kendaraan"
                        required
                        suffix=" km"
                        value={formData.odometer ?? 0}
                    />
                </div>
                <div className="field col-12">
                    <label htmlFor="complaint">Keluhan</label>
                    <InputTextarea
                        id="complaint"
                        onChange={(e) => {
                            setFormData({...formData, complaint: e.target.value});
                        }}
                        required
                        rows={3}
                        value={formData.complaint}
                    />
                </div>
                {handleSubmit ? <div className="field col-12">
                        <Button
                            className="mt-2"
                            icon="pi pi-save"
                            label="Simpan"
                            type="submit"
                        />
                    </div> : null}
            </div>
        </form>
    );
}

export default OrderForm;