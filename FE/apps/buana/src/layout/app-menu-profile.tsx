import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useRef} from "react";
import {Tooltip} from "primereact/tooltip";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {LayoutContext} from "./context/layout-context";
import { logout } from "../services/auth/auth-service";

function AppMenuProfile(): ReactElement {
  const {layoutState, layoutConfig, isSlim, isHorizontal, onMenuProfileToggle} =
    useContext(LayoutContext);
  const router = useRouter();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hiddenClassName = classNames({
    hidden: layoutConfig.menuMode === "drawer" && !layoutState.sidebarActive,
  });

  const toggleMenu = (): void => {
    if (layoutState.menuProfileActive) {
      setTimeout(() => {
        (ulRef.current as any).style.maxHeight = "0";
      }, 1);
      (ulRef.current as any).style.opacity = "0";
      if (isHorizontal()) {
        (ulRef.current as any).style.transform = "scaleY(0.8)";
      }
    } else {
      setTimeout(() => {
        (ulRef.current as any).style.maxHeight = `${(
          ulRef.current as any
        ).scrollHeight.toString()}px`;
      }, 1);
      (ulRef.current as any).style.opacity = "1";
      if (isHorizontal()) {
        (ulRef.current as any).style.transform = "scaleY(1)";
      }
    }
    onMenuProfileToggle();
  };

  useEffect(() => {
    if (layoutState.menuProfileActive) toggleMenu();
  }, [pathname, searchParams]);

  const tooltipValue = (tooltipText: string): string | null => {
    return isSlim() ? tooltipText : null;
  };

  return (
    <div className="layout-menu-profile">
      <Tooltip content={tooltipValue("Profile")!} target=".avatar-button" />
      <button
        className="avatar-button p-link border-noround"
        onClick={toggleMenu}
        type="button"
      >
        <img
          alt="avatar"
          src="/layout/images/avatar/amyelsner.png"
          style={{width: "32px", height: "32px"}}
        />
        <span>
          <strong>Amy Elsner</strong>
          <small>Webmaster</small>
        </span>
        <i
          className={classNames("layout-menu-profile-toggler pi pi-fw", {
            "pi-angle-down":
              layoutConfig.menuProfilePosition === "start" || isHorizontal(),
            "pi-angle-up":
              layoutConfig.menuProfilePosition === "end" && !isHorizontal(),
          })}
        />
      </button>

      <ul
        className={classNames("menu-transition", {overlay: isHorizontal()})}
        ref={ulRef}
        style={{overflow: "hidden", maxHeight: 0, opacity: 0}}
      >
        {layoutState.menuProfileActive ? (
          <>
            <li>
              <button
                className="p-link"
                onClick={() => {
                  router.push("/profile/create");
                }}
                type="button"
              >
                <i className="pi pi-cog pi-fw" />
                <span className={hiddenClassName}>Settings</span>
              </button>
            </li>

            <li>
              <button
                className="p-link"
                onClick={() => {
                  router.push("/profile/list");
                }}
                type="button"
              >
                <i className="pi pi-file-o pi-fw" />
                <span className={hiddenClassName}>Profile</span>
              </button>
            </li>
            <li>
              <button
                className="p-link"
                onClick={() => {
                  router.push("/documentation");
                }}
                type="button"
              >
                <i className="pi pi-compass pi-fw" />
                <span className={hiddenClassName}>Support</span>
              </button>
            </li>
            <li>
              <button
                className="p-link"
                onClick={() => {
                  logout();
                }}
                type="button"
              >
                <i className="pi pi-power-off pi-fw" />
                <span className={hiddenClassName}>Keluar</span>
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default AppMenuProfile;
