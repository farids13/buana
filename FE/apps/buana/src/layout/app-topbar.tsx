import {forwardRef, useContext, useImperativeHandle, useRef} from "react";
import Link from "next/link";
import {StyleClass} from "primereact/styleclass";
import {Ripple} from "primereact/ripple";
import type {AppTopbarRef} from "@/types/types";
import {LayoutContext} from "./context/layout-context";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const {onMenuToggle, onTopbarMenuToggle} = useContext(LayoutContext);
  const menubuttonRef = useRef(null);

  const mobileButtonRef = useRef(null);

  const bellRef = useRef(null);
  const avatarRef = useRef(null);
  const tableRef = useRef(null);

  const onMenuButtonClick = (): void => {
    onMenuToggle();
  };

  const onMobileTopbarMenuButtonClick = (): void => {
    onTopbarMenuToggle();
  };

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <div className="layout-topbar-start">
        <Link className="layout-topbar-logo" href="/">
          <svg height="32" viewBox="76.57757571265185 190.83736243325228 183.96889777553318 88.32527513349538">
            <g data-paper-data="{&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;icon&quot;,&quot;rawIconId&quot;:&quot;5908a6ae-91e6-4a4f-a50b-9b2d7c842972&quot;,&quot;source&quot;:&quot;inline&quot;,&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;isDetailed&quot;:false,&quot;fillRule&quot;:&quot;nonzero&quot;,&quot;bounds&quot;:{&quot;x&quot;:76.57757571265185,&quot;y&quot;:190.83736243325228,&quot;width&quot;:183.96889777553318,&quot;height&quot;:88.32527513349538},&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;suitableAsStandaloneIcon&quot;:true}" fillRule="nonzero">
              <path d="M186.91072,258.9749c-1.12939,1.88607 -3.02862,3.65167 -5.64879,5.24787c-2.62393,1.60372 -12.30651,6.46383 -26.54802,1.7656c-7.07182,-2.33406 -13.20624,-5.5848 -19.13738,-8.72636c-3.77402,-1.99901 -7.4031,-3.92084 -11.17148,-5.57727c0.52517,-0.04141 1.11809,-0.09976 1.43808,-0.16376l0.56657,-0.10918c0.54399,-0.10164 1.08797,-0.20329 1.62443,-0.33505c2.79145,-0.68139 5.4888,-1.80137 8.01862,-3.32603c4.57211,-2.75193 8.23885,-6.49018 10.90042,-11.10936c2.66158,-4.62671 4.01119,-9.76352 4.01119,-15.26737c0,-6.74241 -2.05548,-12.94084 -6.11184,-18.42399c-1.67902,-2.27006 -3.67614,-4.27283 -5.9349,-5.94997c-5.50385,-4.09025 -11.72487,-6.16266 -18.48988,-6.16266h-43.85017v82.52399h15.43301v-21.44886l2.81028,-0.00376c8.66237,0.80187 14.64998,4.3613 22.93964,9.29106c1.95007,1.1595 4.03001,2.39429 6.30007,3.6912c0.85833,0.48939 1.88607,1.11997 3.06439,1.84089c5.43986,3.3298 13.658,8.35743 23.33493,11.08113c3.43897,0.96939 6.99465,1.34961 10.36961,1.34961c7.37863,0 13.84623,-1.91807 16.48522,-3.29027c11.11689,-5.78244 11.11689,-18.21318 11.11689,-18.21318l-0.44422,-0.48187zM123.5994,242.3918c-1.19526,0.74162 -2.51288,1.37784 -4.1486,2.00842c-2.59381,0.99762 -5.2761,1.55666 -7.92638,1.66208h-19.51196v-49.37473h18.29223c5.37209,0 10.01386,1.10868 13.80106,3.29215c3.76837,2.17595 6.65394,5.14057 8.57766,8.81295c1.93689,3.70438 2.92133,7.93768 2.92133,12.58321c0,4.3613 -1.08797,8.42331 -3.2338,12.07122c-2.15336,3.6592 -5.10481,6.66712 -8.77154,8.94471zM246.18825,190.83736l-33.43161,56.87195c-3.60085,-7.09817 -8.94659,-13.63542 -13.71071,-19.46303l-1.62631,-1.99336c-8.41014,-10.35832 -15.17514,-19.48373 -19.36891,-34.58734l-0.22964,-0.82633h-15.50643v2.73687l0.0113,68.82269h5.85209v-54.632c3.99614,9.34376 9.83316,18.77034 17.40567,28.09716c1.3515,1.66396 2.60511,3.18674 3.77402,4.60976c4.55329,5.53398 7.84356,9.53388 10.7009,14.29422c2.46206,4.10343 5.21587,10.25103 5.66197,12.2331c0.02071,0.0847 0.76422,2.90628 0.76422,2.90628l38.72653,-66.04629v69.50033h15.33513v-82.52399z" data-paper-data="{&quot;isPathIcon&quot;:true}" fill="var(--topbar-item-text-color)" />
            </g>
          </svg>
        </Link>
        <a
          className="p-ripple layout-menu-button"
          onClick={onMenuButtonClick}
          ref={menubuttonRef}
        >
          <i className="pi pi-angle-right" />
          <Ripple />
        </a>

        <a
          className="p-ripple layout-topbar-mobile-button"
          onClick={onMobileTopbarMenuButtonClick}
          ref={mobileButtonRef}
        >
          <i className="pi pi-ellipsis-v" />
          <Ripple />
        </a>
      </div>

      <div className="layout-topbar-end">
        <div className="layout-topbar-actions-end">
          <ul className="layout-topbar-items">
            <li className="layout-topbar-search">
              <input placeholder="Search" type="text" />
              <i className="pi-fw pi pi-search" />
            </li>
            <li>
              <StyleClass
                enterActiveClassName="px-scalein"
                enterClassName="hidden"
                hideOnOutsideClick
                leaveActiveClassName="px-fadeout"
                leaveToClassName="hidden"
                nodeRef={bellRef}
                selector="@next"
              >
                <a className="p-ripple" ref={bellRef}>
                  <i className="pi pi-bell" />
                  <Ripple />
                </a>
              </StyleClass>
              <div className="hidden">
                <ul className="list-none p-0 m-0">
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-sliders-h text-lg" />
                      <span>Pending tasks</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-calendar text-lg" />
                      <span>Meeting today at 3pm</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-download text-lg" />
                      <span>Download documents</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-bookmark text-lg" />
                      <span>Book flight</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <StyleClass
                enterActiveClassName="px-scalein"
                enterClassName="hidden"
                hideOnOutsideClick
                leaveActiveClassName="px-fadeout"
                leaveToClassName="hidden"
                nodeRef={tableRef}
                selector="@next"
              >
                <a className="p-ripple" ref={tableRef}>
                  <i className="pi pi-envelope" />
                  <Ripple />
                </a>
              </StyleClass>
              <div className="hidden">
                <ul className="list-none p-0 m-0 flex flex-column text-color">
                  <li>
                    <a className="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary">
                      <img
                        alt="avatar5"
                        className="w-3rem h-3rem"
                        src="/layout/images/avatar/avatar5.png"
                      />
                      <span>Give me a call</span>
                    </a>
                  </li>
                  <li>
                    <a className="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary">
                      <img
                        alt="avatar1"
                        className="w-3rem h-3rem"
                        src="/layout/images/avatar/avatar1.png"
                      />
                      <span>Sales reports attached</span>
                    </a>
                  </li>
                  <li>
                    <a className="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary">
                      <img
                        alt="avatar2"
                        className="w-3rem h-3rem"
                        src="/layout/images/avatar/avatar2.png"
                      />
                      <span>About your invoice</span>
                    </a>
                  </li>
                  <li>
                    <a className="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary">
                      <img
                        alt="avatar3"
                        className="w-3rem h-3rem"
                        src="/layout/images/avatar/avatar3.png"
                      />
                      <span>Meeting today at 10pm</span>
                    </a>
                  </li>
                  <li>
                    <a className="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary">
                      <img
                        alt="avatar4"
                        className="w-3rem h-3rem"
                        src="/layout/images/avatar/avatar4.png"
                      />
                      <span>Out of office</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <StyleClass
                enterActiveClassName="px-scalein"
                enterClassName="hidden"
                hideOnOutsideClick
                leaveActiveClassName="px-fadeout"
                leaveToClassName="hidden"
                nodeRef={avatarRef}
                selector="@next"
              >
                <a className="p-ripple" ref={avatarRef}>
                  <i className="pi pi-cog" /> <Ripple />
                </a>
              </StyleClass>
              <div className="hidden">
                <ul className="list-none p-0 m-0">
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-palette text-lg" />
                      <span>Change Theme</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-star text-lg" />
                      <span>Favorites</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-lock text-lg" />
                      <span>Lock Screen</span>
                    </a>
                  </li>
                  <li>
                    <a className="py-2 px-3 flex gap-2 cursor-pointer text-color hover:text-primary">
                      <i className="pi pi-fw pi-image text-lg" />
                      <span>Wallpaper</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
