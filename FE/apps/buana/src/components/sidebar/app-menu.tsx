import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

import { TbCategory2, TbHomeDot, TbListDetails } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { GoDatabase } from "react-icons/go";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdGroups, MdOutlineSettings } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";
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
          icon: <TbListDetails color="#4343BF" size={size} />,
          label: t("Events"),
          to: "/events",
        },
        {
          icon: <RxCalendar color="#4343BF" size={size} />,
          label: t("Calendar"),
          to: "/calendar",
        },
        {
          icon: <GoDatabase color="#4343BF" size={size} />,
          label: "Data Master",
          items: [
            {
              icon: <FaRegAddressCard className="tw-ml-5" color="#4343BF" size={subSize} />,
              label: t("Address"),
              to: "/data-master/address",
            },
            {
              icon: <MdGroups className="tw-ml-5" color="#4343BF" size={subSize} />,
              label: t("Audience Group"),
              to: "/audience-group",
            },
            {
              icon: <TbCategory2 className="tw-ml-5" color="#4343BF" size={subSize} />,
              label: t("Event Category"),
              to: "/data-master/event-category",
            },
          ]
        },
        {
          icon: <MdOutlineSettings color="#4343BF" size={size} />,
          label: t("Settings"),
          to: "/settings",
        },
        {
          icon: <LuBadgeHelp color="#4343BF" size={size} />,
          label: t("Help"),
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
