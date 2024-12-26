"use client";
import Head from "next/head";
import type {ReactElement} from "react";
import React, {useState, createContext} from "react";
import type {
  ChildContainerProps,
  LayoutContextProps,
  LayoutConfig,
  LayoutState,
  Breadcrumb,
} from "@/types/types";

export const LayoutContext = createContext({} as LayoutContextProps);

export function LayoutProvider(props: ChildContainerProps): ReactElement {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: true,
    inputStyle: "outlined",
    menuMode: "static",
    colorScheme: "light",
    componentTheme: "purple",
    scale: 14,
    menuTheme: "light",
    topbarTheme: "purple",
    menuProfilePosition: "start",
    desktopMenuActive: true,
    mobileMenuActive: false,
    mobileTopbarActive: false,
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    profileSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    rightMenuActive: false,
    topbarMenuActive: false,
    sidebarActive: false,
    anchored: false,
    overlaySubmenuActive: false,
    menuProfileActive: false,
    resetMenu: false,
  });

  const onMenuProfileToggle = (): void => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      menuProfileActive: !prevLayoutState.menuProfileActive,
    }));
  };

  const isSidebarActive = (): boolean =>
    layoutState.overlayMenuActive ||
    layoutState.staticMenuMobileActive ||
    layoutState.overlaySubmenuActive;

  const onMenuToggle = (): void => {
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive,
      }));
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
      }));
    }
  };

  const isOverlay = (): boolean => {
    return layoutConfig.menuMode === "overlay";
  };

  const isSlim = (): boolean => {
    return layoutConfig.menuMode === "slim";
  };

  const isSlimPlus = (): boolean => {
    return layoutConfig.menuMode === "slim-plus";
  };

  const isHorizontal = (): boolean => {
    return layoutConfig.menuMode === "horizontal";
  };

  const isDesktop = (): boolean => {
    return window.innerWidth > 991;
  };
  const onTopbarMenuToggle = (): void => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      topbarMenuActive: !prevLayoutState.topbarMenuActive,
    }));
  };
  const showRightSidebar = (): void => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      rightMenuActive: true,
    }));
  };

  const value = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    isSidebarActive,
    breadcrumbs,
    setBreadcrumbs,
    onMenuProfileToggle,
    onTopbarMenuToggle,
    showRightSidebar,
  };

  return (
    <LayoutContext.Provider value={value}>
      <>
        <Head>
          <title>PrimeReact - Avalon</title>
          <meta charSet="UTF-8" />
          <meta
            content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
            name="description"
          />
          <meta content="index, follow" name="robots" />
          <meta content="initial-scale=1, width=device-width" name="viewport" />
          <meta content="website" property="og:type" />
          <meta content="Avalon by PrimeReact for NextJS" property="og:title" />
          <meta content="https://apollo.primereact.org/" property="og:url" />
          <meta
            content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
            property="og:description"
          />
          <meta
            content="https://www.primefaces.org/static/social/avalon-react.png"
            property="og:image"
          />
          <meta content="604800" property="og:ttl" />
          <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        </Head>
        {props.children}
      </>
    </LayoutContext.Provider>
  );
}
