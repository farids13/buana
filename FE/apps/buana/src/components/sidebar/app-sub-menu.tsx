import { Tooltip } from "primereact/tooltip";
import type { ReactElement } from "react";
import { useContext, useEffect, useRef } from "react";
import type {
  MenuProps,
  MenuModel,
  Breadcrumb,
  BreadcrumbItem,
} from "@/types/types";
import AppMenuitem from "./app-menuitem";
import { LayoutContext } from "../../context/layout-context";
import { MenuProvider } from "../../context/menu-context";
import type { AppMenuItem } from "@/types/layout";

function AppSubMenu(props: MenuProps): ReactElement {
  const { layoutState, setBreadcrumbs } = useContext(LayoutContext);
  const tooltipRef = useRef<Tooltip | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.hide();
      (tooltipRef.current as any).updateTargetEvents();
    }
  }, [layoutState.overlaySubmenuActive]);

  useEffect(() => {
    const generateBreadcrumbs = (model: MenuModel[]): void => {
      const breadcrumbs: Breadcrumb[] = [];

      const getBreadcrumb = (
        item: BreadcrumbItem,
        labels: string[] = [],
      ): void => {
        const { label, to, items } = item;

        label && labels.push(label);
        items?.forEach((_item) => {
          getBreadcrumb(_item, labels.slice());
        });
        to && breadcrumbs.push({ labels, to });
      };

      model.forEach((item) => {
        getBreadcrumb(item);
      });
      setBreadcrumbs(breadcrumbs);
    };

    generateBreadcrumbs(props.model);
  }, []);

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {props.model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem
            className="layout-root-menuitem"
              index={i}
              item={item as AppMenuItem}
              key={item.label}
            />
          ) : (
            <li className="menu-separator tw-border-red-500" />
          );
        })}
      </ul>
      <Tooltip
        ref={tooltipRef}
        target="li:not(.active-menuitem)>.tooltip-target"
      />
    </MenuProvider>
  );
}

export default AppSubMenu;
