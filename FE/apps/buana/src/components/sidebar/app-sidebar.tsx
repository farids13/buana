import type { ReactElement } from "react";
import React, { useContext, useRef } from "react";
import AppMenu from "./app-menu";
import { MenuProvider } from "../../context/menu-context";
import AppMenuProfile from "./app-menu-profile";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import { LayoutContext } from "@/context/layout-context";
import { Tooltip } from "primereact/tooltip";
import { useTranslation } from "react-i18next";

function AppSidebar({sidebarRef} : {sidebarRef: React.RefObject<HTMLDivElement>}): ReactElement {
  let timeout: NodeJS.Timeout | null = null;
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  const { data } = useGetUserDetail();
  const {t} = useTranslation();

  const onMouseEnter = (): void => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };

  const onMouseLeave = (): void => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(() => {
          setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            sidebarActive: false,
          }));
        }, 300);
      }
    }
  };

  return (
    <div className="layout-sidebar tw-h-full top-0 tw-rounded-r-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={sidebarRef}>
      <div className="layout-menu-container tw-mt-2">
        <div className="layout-sidebar-top">
          <div className="layout-sidebar-logo tw-text-2xl tw-font-bold tw-text-center">
            <span className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-secondary-500 tw-bg-clip-text tw-text-transparent tw-font-sans">
              Buana
            </span>
          </div>
          <div className="layout-sidebar-logo-slim tw-mx-auto tw-text-2xl tw-font-bold tw-text-center">
            <span className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-secondary-500 tw-bg-clip-text tw-text-transparent tw-font-sans">
              B
            </span>
          </div>
          <Tooltip content={t('Sidebar Button')} position="bottom" target="#layout-sidebar-anchor" />
          <button
            className="layout-sidebar-anchor p-link"
            id="layout-sidebar-anchor"
            onClick={() => { setLayoutState((prevLayoutState) => ({ ...prevLayoutState, anchored: !prevLayoutState.anchored })); }}
            type="button"
          />
        </div>
        <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
          <AppMenuProfile />
          <MenuProvider>
            <AppMenu />
          </MenuProvider>
        </div>
      </div>
    </div>
  );
}
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
