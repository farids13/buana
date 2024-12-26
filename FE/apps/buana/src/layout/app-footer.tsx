import type {ReactElement} from "react";
import React, {useContext} from "react";
import {Button} from "primereact/button";
import {LayoutContext} from "./context/layout-context";

function AppFooter(): ReactElement {
  const {layoutConfig} = useContext(LayoutContext);
  const footerLogoSrc = `/layout/images/logo/footer-${
    layoutConfig.colorScheme === "light" ? "avalon" : "avalon-dark"
  }.svg`;

  return (
    <div className="layout-footer">
      <div className="text-3xl font-bold">
        RAMA MOTOR
      </div>
      <div className="flex gap-2">
        <Button className="p-button-plain" icon="pi pi-facebook" rounded text />
        <Button className="p-button-plain" icon="pi pi-instagram" rounded text />
        <Button className="p-button-plain" icon="pi pi-youtube" rounded text />
      </div>
    </div>
  );
}

export default AppFooter;
