"use client";

import OrderForm from "./forms/order-form";
import React, {useState} from "react";
import type {ReactElement} from "react";

// This component handles the customer visit form, including customer details, vehicle information, and service type selection.
export default function CustomerVisitPage(): ReactElement {
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        vehicleType: "",
        licensePlate: "",
        arrivalDate: null as Date | null,
        complaint: "",
        odometer: 0,
        orderNumber: "",
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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        // console.log(formData);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Formulir Kunjungan Pelanggan</h4>
                    <OrderForm formData={formData}
                               handleSubmit={handleSubmit}
                               licensePlates={licensePlates}
                               setFormData={setFormData}/>
                </div>
            </div>
        </div>
    );
}
