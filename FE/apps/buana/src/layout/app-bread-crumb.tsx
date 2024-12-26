import {usePathname, useSearchParams} from "next/navigation";
import {ObjectUtils} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "primereact/button";
import Link from "next/link";
import type {Breadcrumb} from "@/types/types";
import {LayoutContext} from "./context/layout-context";
import {nanoid} from "nanoid";

function AppBreadcrumb(): ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb | null>(null);
  const {breadcrumbs} = useContext(LayoutContext);
  const isDashboard =
    pathname + searchParams.toString() !== "/" &&
    pathname + searchParams.toString() !== "/dashboards/banking";

  useEffect(() => {
    const filteredBreadcrumbs = breadcrumbs?.find((crumb) => {
      return crumb.to?.replace(/\/$/, " ") === pathname.replace(/\/$/, "");
    });
    setBreadcrumb(filteredBreadcrumbs ?? null);
  }, [pathname, breadcrumbs]);

  return (
    <div className="layout-breadcrumb-container">
      <nav className="layout-breadcrumb">
        <ol>
          <li>
            <Link href="/" style={{color: "inherit"}}>
              <i className="pi pi-home" />
            </Link>
          </li>
          {ObjectUtils.isNotEmpty(breadcrumb?.labels) && isDashboard ? (
            breadcrumb?.labels?.map((label) => {
              return (
                <React.Fragment key={nanoid()}>
                  <i className="pi pi-angle-right" />
                  <li key={nanoid()}>{label}</li>
                </React.Fragment>
              );
            })
          ) : (
            <>
              <i className="pi pi-angle-right" />
              {pathname + searchParams.toString() === "/" && (
                <li key="home">E-Commerce Dashboard</li>
              )}
              {pathname + searchParams.toString() === "/dashboards/banking" && (
                <li key="home">Banking Dashboard</li>
              )}
            </>
          )}
        </ol>
      </nav>
      <div className="layout-breadcrumb-buttons">
        <Button
          className="p-button-plain"
          icon="pi pi-cloud-upload"
          rounded
          text
        />
        <Button className="p-button-plain" icon="pi pi-bookmark" rounded text />
        <Button
          className="p-button-plain"
          icon="pi pi-power-off"
          rounded
          text
        />
      </div>
    </div>
  );
}

export default AppBreadcrumb;
