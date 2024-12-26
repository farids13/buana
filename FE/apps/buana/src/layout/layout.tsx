"use client";
import type {ReactElement} from "react";
import React, {useCallback, useContext, useEffect, useRef} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {classNames, DomHandler} from "primereact/utils";
import {
  useEventListener,
  useMountEffect,
  useResizeListener,
  useUnmountEffect,
} from "primereact/hooks";
import {PrimeReactContext} from "primereact/api";
import type {AppTopbarRef, ChildContainerProps} from "@/types/types";
import {LayoutContext} from "./context/layout-context";
import AppConfig from "./app-config";
import AppSidebar from "./app-sidebar";
import AppTopbar from "./app-topbar";
import AppBreadcrumb from "./app-bread-crumb";
import AppFooter from "./app-footer";

function Layout(props: ChildContainerProps): ReactElement {
  const {
    layoutConfig,
    layoutState,
    setLayoutState,
    setLayoutConfig,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    isSidebarActive,
  } = useContext(LayoutContext);
  const {setRipple} = useContext(PrimeReactContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let timeout: NodeJS.Timeout | null = null;

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop(),
    }));
  }, [isSlim, isSlimPlus, isHorizontal, isDesktop]);

  const blockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          `(^|\\b)${"blocked-scroll".split(" ").join("|")}(\\b|$)`,
          "gi"
        ),
        " "
      );
    }
  };
  useMountEffect(() => {
    setRipple(layoutConfig.ripple);
  });

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

  useEffect(() => {
    const onRouteChange = (): void => {
      if (layoutConfig.colorScheme === "dark") {
        setLayoutConfig((prevState) => ({...prevState, menuTheme: "dark"}));
      }
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isSidebarActive()) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isSlimPlus() || isHorizontal()) &&
        bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    layoutState.overlaySubmenuActive,
  ]);

  useEffect(() => {
    const onRouteChange = (): void => {
      hideMenu();
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClassName = classNames(
    `layout-topbar-${layoutConfig.topbarTheme}`,
    `layout-menu-${layoutConfig.menuTheme}`,
    `layout-menu-profile-${layoutConfig.menuProfilePosition}`,
    {
      "layout-overlay": layoutConfig.menuMode === "overlay",
      "layout-static": layoutConfig.menuMode === "static",
      "layout-slim": layoutConfig.menuMode === "slim",
      "layout-slim-plus": layoutConfig.menuMode === "slim-plus",
      "layout-horizontal": layoutConfig.menuMode === "horizontal",
      "layout-reveal": layoutConfig.menuMode === "reveal",
      "layout-drawer": layoutConfig.menuMode === "drawer",
      "p-input-filled": layoutConfig.inputStyle === "filled",
      "layout-sidebar-dark": layoutConfig.colorScheme === "dark",
      "p-ripple-disabled": !layoutConfig.ripple,
      "layout-static-inactive":
        layoutState.staticMenuDesktopInactive &&
        layoutConfig.menuMode === "static",
      "layout-overlay-active": layoutState.overlayMenuActive,
      "layout-mobile-active": layoutState.staticMenuMobileActive,
      "layout-topbar-menu-active": layoutState.topbarMenuActive,
      "layout-menu-profile-active": layoutState.menuProfileActive,
      "layout-sidebar-active": layoutState.sidebarActive,
      "layout-sidebar-anchored": layoutState.anchored,
    }
  );

  return (
    <div className={classNames("layout-container", containerClassName)}>
      <AppTopbar ref={topbarRef} />
      <div
        className="layout-sidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={sidebarRef}
      >
        <AppSidebar />
      </div>
      <div className="layout-content-wrapper">
        <div>
          <AppBreadcrumb />
          <div className="layout-content">{props.children}</div>
        </div>
        <AppFooter />
      </div>
      <AppConfig />
      <div className="layout-mask" />
    </div>
  );
}

export default Layout;
