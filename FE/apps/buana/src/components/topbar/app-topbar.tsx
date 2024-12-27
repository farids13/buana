"use client"
import { LayoutContext } from "@/context/layout-context";
import { useGetFile } from "@/lib/api/storage/get-file";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import Image from "next/image";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import ButtonLanguage from "../ui/button-language";
import type { AppTopbarRef } from "@/types/layout";

 const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { onMenuToggle, onTopbarMenuToggle } = useContext(LayoutContext);
    const { data } = useGetUserDetail();
    const file = useGetFile("asset", data?.logoUrl);
    const menubuttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
      }));
    
    return (
        <div className="layout-topbar">
            <div className="layout-topbar-start">
                <Image
                    alt="profile"
                    className="tw-w-[280px] max-md:tw-w-[230px] max-sm:tw-w-[180px] "
                    height={6}
                    src={file.data ? URL.createObjectURL(file.data) : "/svg/logo.svg"}
                    style={{ maxWidth: '280px', maxHeight: '45px', objectFit: 'contain' }}
                    width={38}
                />
                <button className="p-ripple layout-menu-button" onClick={() => { onMenuToggle() }} type="button">
                    <i className="pi pi-angle-right" />
                </button>
                <button className="p-ripple layout-topbar-mobile-button p-link" onClick={() => { onTopbarMenuToggle() }} type="button">
                    <i className="pi pi-ellipsis-v" />
                </button>
            </div>
            <div className="layout-topbar-end tw-border">
                <ButtonLanguage />
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
