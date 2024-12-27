"use client"
import Image from "next/image";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import i18n from "@/app/i18n";
import { Tooltip } from "primereact/tooltip";
import { useTranslation } from "react-i18next";

export default function ButtonLanguage() : ReactElement {
    const op = useRef<OverlayPanel>(null);
    const [langStore, setLangStore] = useState('en');
    const [isShow, setIsShow] = useState(false);
    const {t} = useTranslation();

    const onButtonClick = (event) => {
        op.current?.toggle(event);
        setIsShow(!isShow);
    }
    const changeLanguage = (lang: string) => {
        void i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
        setLangStore(lang);
        op.current?.hide();
      }

    useEffect(() => {
      setLangStore(localStorage.getItem('lang') ?? 'en');
      void i18n.changeLanguage(langStore);
    },[langStore]);

    return(
      <>
        <Tooltip content={t('Change Language')} position="left" target=".button-change-language"  />
        <Button className="tw-flex tw-gap-2 tw-justify-center tw-items-center button-change-language" onClick={onButtonClick} outlined style={{ border: 0, color: 'black', fontFamily: "Exo", fontSize: "20px", maxWidth: "120px", fontWeight: 600 }}>
            <Image alt="Flag Logo" height={30} src={langStore === 'en' ? '/svg/flag/en.svg' : '/svg/flag/id.svg'} width={30} />
            <h4>{langStore === 'en' ? 'ENG' : 'IDN'}</h4>
            <i className={`pi ${isShow ? 'pi-chevron-up' : 'pi-chevron-down'} tw-ml-2`} />
        </Button>
        <OverlayPanel ref={op}>
          <div className="tw-flex tw-flex-col tw-mt-4 tw-space-y-4 tw-border-[#334798]">
            <Button onClick={() => { changeLanguage('en') }} outlined>
              <Image alt="Id Flag" height={20} src='/svg/flag/en.svg' width={20} />
              <b className="tw-ml-4 tw-text-black">ENG</b>
            </Button>
            <Button onClick={() => { changeLanguage('id') }} outlined>
              <Image alt="Id Flag" height={20} src='/svg/flag/id.svg' width={20} />
              <b className="tw-ml-4 tw-text-black">IDN</b>
            </Button>
          </div>
        </OverlayPanel>
      </>
    );
}