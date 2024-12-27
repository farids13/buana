"use client";
import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdFlag, IoMdLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { LayoutContext } from "@/context/layout-context";
import { useAuthStore } from "@/stores/use-auth-store";
import { useDownloadUserImage, useGetUserDetail } from "@/lib/api/user/get-user-detail";
import { FaLanguage } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { truncateText } from "@/utils/string-utils";

function AppMenuProfile(): ReactElement {
  const logout = useAuthStore((state) => state.logout);
  const { data } = useGetUserDetail();

  const {
    layoutState,
    layoutConfig,
    isDesktop,
    isSlim,
    isHorizontal,
    onMenuProfileToggle,
  } = useContext(LayoutContext);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getImg = useDownloadUserImage();
  const { data: downloadedImage } = getImg;
  const [image, setImage] = useState<string | null>(null);
  const {t, i18n} = useTranslation();

  const overlayPanelRef = useRef<OverlayPanel>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    overlayPanelRef.current?.toggle(event);
  };

  const [langStore, setLangStore] = useState('en');
  useEffect(() => {
    setLangStore(localStorage.getItem('lang') || 'en');
    void i18n.changeLanguage(langStore);
  },[langStore]);

  const changeLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setLangStore(lang);
    overlayPanelRef.current?.hide();
  }

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

  useEffect(() => {
    if (data?.imgUrl) {
      getImg.mutate(); 
    }
  }, [data?.imgUrl]);

  useEffect(() => {
    if (downloadedImage instanceof Blob) {
      const objectUrl = URL.createObjectURL(downloadedImage);
      setImage(objectUrl);
    }
  }, [downloadedImage]);
  

  return (
    <div className="layout-menu-profile border-none tw-relative overflow-visible tw-z-10 tw-mt-8">
      <Tooltip content={tooltipValue("Profile")!} target=".avatar-button" />
      <button
        className="avatar-button p-link border-noround"
        onClick={toggleMenu}
        type="button"
      >
        <Image
          alt="avatar"
          className="tw-rounded-full tw-mt-1"
          height={56}
          src={image ?? "/img/user-default.jpg"}
          width={56}
        />
        <span>
          <b className="tw-text-xl">{truncateText(data?.name, 18)} </b>
          <p className="tw-text-xs">{data?.phoneNumber}</p>
        </span>
        <i
          className={classNames(
            "layout-menu-profile-toggler pi pi-fw",
            {
              "pi-angle-down":
                layoutConfig.menuProfilePosition === "start" || isHorizontal(),
              "pi-angle-up":
                layoutConfig.menuProfilePosition === "end" && !isHorizontal(),
            },
          )}
        />
      </button>

      <ul
        className={classNames(
          "menu-transition tw-border-2 tw-border-[#334798] tw-rounded-2xl ml-8 mr-4 tw-absolute tw-inset-x-0 tw-top-20 tw-bg-white",
          {
            overlay: isHorizontal(),
          },
        )}
        ref={ulRef}
        style={{ maxHeight: 0, opacity: 0 }}
      >
        {layoutState.menuProfileActive ? (
          <>
            <li className="tw-border-b-2 tw-p-3 tw-border-[#334798] hover:tw-bg-[--menuitem-hover-bg]">
              <Link
                className="p-link tw-flex tw-space-x-4 tw-text-base tw-shadow-none"
                href="/profile"
              >
                <FaRegUser color="#4343BF" size={22} />
                <span className={hiddenClassName}>{t('Profile')}</span>
              </Link>
            </li>
            <li className="tw-border-b-2 tw-p-3 tw-border-[#334798] hover:tw-bg-[--menuitem-hover-bg]">
              <div className="p-link tw-flex tw-space-x-4 tw-text-base tw-shadow-none" onClick={handleLanguageClick}>
                <FaLanguage color="#4343BF" size={22} />
                <span className={hiddenClassName}>Change Language</span>
              </div>
              <OverlayPanel ref={overlayPanelRef}>
                <div className="tw-flex tw-flex-col tw-mt-4 tw-space-y-4 tw-border-[#334798] tw-bg-red">
                    <Button onClick={() => {changeLanguage('en')}} outlined>
                        <Image alt="Id Flag" height={20} src='/svg/flag/en.svg' width={20} />
                        <span className="tw-ml-4">English</span>
                    </Button>

                    <Button onClick={() => {changeLanguage('id')}} outlined>
                      <Image alt="Id Flag" height={20} src='/svg/flag/id.svg' width={20} />
                      <span className="tw-ml-4">Indonesia</span>
                    </Button>
                </div>
              </OverlayPanel>
            </li>
            <li className="tw-p-3 hover:tw-bg-[--menuitem-hover-bg]">
              <div
                className="p-link tw-flex tw-space-x-4 tw-text-base tw-shadow-none"
                onClick={() => {
                  logout();
                }}
              >
                <IoMdLogOut color="#4343BF" size={24} />
                <span className={hiddenClassName}>{t('Log Out')}</span>
              </div>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default AppMenuProfile;
