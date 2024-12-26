"use client";
import Link from "next/link";
import {Ripple} from "primereact/ripple";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import {useContext, useEffect, useRef} from "react";
import {LayoutContext} from "./context/layout-context";
import {MenuContext} from "./context/menu-context";
import type {AppMenuItemProps} from "@/types/types";
import {useSubmenuOverlayPosition} from "./hooks/use-submenu-overlay-position";
import {usePathname, useSearchParams} from "next/navigation";

function AppMenuitem(props: AppMenuItemProps): ReactElement {
  const {activeMenu, setActiveMenu} = useContext(MenuContext);
  const {
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    setLayoutState,
    layoutState,
    layoutConfig,
  } = useContext(LayoutContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const submenuRef = useRef<HTMLUListElement>(null);
  const menuitemRef = useRef<HTMLLIElement>(null);
  const item = props.item;
  const key = props.parentKey
    ? `${props.parentKey}-${props.index}`
    : String(props.index);
  const isActiveRoute = item?.to && pathname === item?.to;
  const active =
    activeMenu === key || Boolean(activeMenu?.startsWith(`${key}-`));

  useSubmenuOverlayPosition({
    target: menuitemRef.current,
    overlay: submenuRef.current,
    container: menuitemRef.current?.closest(".layout-menu-container"),
    when:
      props.root &&
      active &&
      (isSlim() || isSlimPlus() || isHorizontal()) &&
      isDesktop(),
  });

  useEffect(() => {
    if (layoutState.resetMenu) {
      setActiveMenu("");
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        resetMenu: false,
      }));
    }
  }, [layoutState.resetMenu]);

  useEffect(() => {
    if (!(isSlim() || isSlimPlus() || isHorizontal()) && isActiveRoute) {
      setActiveMenu(key);
    }
    const url = pathname + searchParams.toString();
    const onRouteChange = (): void => {
      if (!(isSlim() || isHorizontal()) && item?.to && item?.to === url) {
        setActiveMenu(key);
      }
    };
    onRouteChange();
  }, [pathname, searchParams, layoutConfig]);

  const itemClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    //avoid processing disabled items
    if (item?.disabled) {
      event.preventDefault();
      return;
    }

    // navigate with hover
    if (props.root && (isSlim() || isHorizontal() || isSlimPlus())) {
      const isSubmenu =
        event.currentTarget.closest(
          ".layout-root-menuitem.active-menuitem > ul"
        ) !== null;
      if (isSubmenu)
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: true,
        }));
      else
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: !prevLayoutState.menuHoverActive,
        }));
    }

    //execute command
    if (item?.command) {
      item?.command({originalEvent: event, item});
    }

    // toggle active state
    if (item?.items) {
      setActiveMenu(active ? props.parentKey! : key);

      if (
        props.root &&
        !active &&
        (isSlim() || isHorizontal() || isSlimPlus())
      ) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          overlaySubmenuActive: true,
        }));
      }
    } else {
      if (!isDesktop()) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
        }));
      }

      if (isSlim() || isSlimPlus() || isHorizontal()) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          menuHoverActive: false,
        }));
      }

      setActiveMenu(key);
    }
  };

  const onMouseEnter = (): void => {
    // activate item on hover
    if (
      props.root &&
      (isSlim() || isHorizontal() || isSlimPlus()) &&
      isDesktop()
    ) {
      if (!active && layoutState.menuHoverActive) {
        setActiveMenu(key);
      }
    }
  };

  const subMenu =
    item?.items && item?.visible !== false ? (
      <ul
        className={classNames({"layout-root-submenulist": props.root})}
        ref={submenuRef}
      >
        {item?.items.map((child, i) => {
          return (
            <AppMenuitem
              className={child.badgeClass}
              index={i}
              item={child}
              key={child.label}
              parentKey={key}
            />
          );
        })}
      </ul>
    ) : null;

  return (
    <li
      className={classNames({
        "layout-root-menuitem": props.root,
        "active-menuitem": active,
      })}
      ref={menuitemRef}
    >
      {props.root && item?.visible !== false ? (
        <div className="layout-menuitem-root-text">
          <span>{item?.label}</span>
          <i className="layout-menuitem-root-icon pi pi-fw pi-ellipsis-h" />
        </div>
      ) : null}
      {(!item?.to || item?.items) && item?.visible !== false ? (
        <a
          className={classNames(item?.class, "p-ripple tooltip-target")}
          data-pr-disabled={
            !(isSlim() && props.root && !layoutState.menuHoverActive)
          }
          data-pr-tooltip={item?.label}
          href={item?.url}
          onClick={(e) => {
            itemClick(e);
          }}
          onMouseEnter={onMouseEnter}
          tabIndex={0}
          target={item?.target}
        >
          <i className={classNames("layout-menuitem-icon", item?.icon)} />
          <span className="layout-menuitem-text">{item?.label}</span>
          {item?.items ? (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
          ) : null}
          <Ripple />
        </a>
      ) : null}

      {item?.to && !item?.items && item?.visible !== false ? (
        <Link
          className={classNames(item?.class, "p-ripple ", {
            "active-route": isActiveRoute,
          })}
          href={item?.to}
          onClick={(e) => {
            itemClick(e);
          }}
          onMouseEnter={onMouseEnter}
          replace={item?.replaceUrl}
          tabIndex={0}
        >
          <i className={classNames("layout-menuitem-icon", item?.icon)} />
          <span className="layout-menuitem-text">{item?.label}</span>
          {/* {badge} */}
          {item?.items ? (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
          ) : null}
          <Ripple />
        </Link>
      ) : null}
      {subMenu}
    </li>
  );
}

export default AppMenuitem;
