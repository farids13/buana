import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

import { TbHomeDot, TbUser } from "react-icons/tb";
import { useTranslation } from "react-i18next";

function AppMenu(): ReactElement {
  const size = 32;
  const subSize = 30;
  const { t } = useTranslation();
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          icon: <TbHomeDot color="#4343BF" size={size} />,
          label: t('Home'),
          to: "/dashboard",
        },
        {
          icon: <TbUser color="#4343BF" size={size} />,
          label: t("Data Member"),
          to: "/member",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
