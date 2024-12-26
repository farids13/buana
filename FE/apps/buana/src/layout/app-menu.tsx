import type {ReactElement} from "react";
import AppSubMenu from "./app-sub-menu";
import type {MenuModel} from "@/types/types";

function AppMenu(): ReactElement {
  const model: MenuModel[] = [
    {
      label: "Rama Motor",
      icon: "pi pi-th-large",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
        {
          label: "Audit",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
        {
          label: "Bengkel",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
        {
          label:"DO",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Order Pekerjaan",
              icon: "pi pi-fw ",
              to: "/service-advisor/customer-visit",
            },
            {
              label: "Riwayat Order Pekerjaan",
              icon: "pi pi-fw ",
              to: "/service-advisor/customer-reception",
            },
          ],
        },
        {
          label: "Gudang",
          icon: "pi pi-fw pi-inbox",
          to: "/",
          items: [
            {
              label: "Cetak Bon Bengkel Permintaan", 
              icon: "pi pi-fw pi-print",
              to: "/gudang/cetak-bon-bengkel-permintaan",
            },
            {
              label: "Cetak Mutasi Bon Bengkel",
              icon: "pi pi-fw pi-print", 
              to: "/gudang/cetak-mutasi-bon-bengkel", 
            },
            {
              label: "Cetak Order Barang",
              icon: "pi pi-fw pi-print",
              to: "/gudang/cetak-order-barang",
            },
            {
              label: "Riwayat Bon Bengkel",
              icon: "pi pi-fw pi-list",
              to: "/gudang/riwayat-bon-bengkel",
            },
            {
              label: "Order Barang", 
              icon: "pi pi-fw pi-shopping-cart",
              to: "/gudang/order-barang",
            },
            {
              label: "Riwayat Order Barang",
              icon: "pi pi-fw pi-list",
              to: "/gudang/riwayat-order-barang",
            },
          ],
        },
        {
          label : "Laporan",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
        {
          label: "Master",
          icon: "pi pi-fw pi-th-large",
          items: [
            {
              label: "Barang Melekat",
              icon: "pi pi-fw pi-box",
              to: "/master/barang-melekat",
            },
            {
              label: "Insentif Mekanik",
              icon: "pi pi-fw pi-money-bill",
              to: "/master/insentif-mekanik",
            },
            {
              label: "Item",
              icon: "pi pi-fw pi-list",
              to: "/master/item",
            },
            {
              label: "Kondisi Mobil",
              icon: "pi pi-fw pi-car",
              to: "/master/kondisi-mobil",
            },
            {
              label: "Merek Dan Model",
              icon: "pi pi-fw pi-tag",
              to: "/master/merek-model-mobil",
            },
            {
              label : "Mobil",
              icon : "pi pi-fw pi-car",
              to : "/master/mobil",
            },
            {
              label : "Pelanggan",
              icon : "pi pi-fw pi-user",
              to : "/master/pelanggan",
            },
            {
              label : "Satuan",
              icon : "pi pi-fw pi-sliders-h",
              to : "/master/satuan",
            },
            {
              label : "Supplier",
              icon : "pi pi-fw pi-truck",
              to : "/master/supplier",
            },
          ],
        },
        {
          label: "POS",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
        {
          label : "Purchasing",
          icon: "pi pi-fw ",
          to: "/",
          items: [
            {
              label: "Menu 1",
              icon: "pi pi-fw ",
              to: "/",
            },
          ],
        },
      ],
    },
    // {
    //   label: "Audit",
    //   icon: "pi pi-fw pi-pencil",
    //   items: [
    //     {
    //       label: "Example 2",
    //       icon: "pi pi-fw pi-pencil",
    //       to: "/",
    //     },
    //   ],
    // },
    // {
    //   label: "Favorites",
    //   icon: "pi ",
    //   items: [
    //     {
    //       label: "Dashboards",
    //       icon: "pi pi-fw ",
    //       items: [
    //         {
    //           label: "E-Commerce",
    //           icon: "pi pi-fw ",
    //           to: "/",
    //         },
    //         {
    //           label: "Banking",
    //           icon: "pi pi-fw pi-money-bill",
    //           to: "/dashboards/banking",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Apps",
    //   icon: "pi pi-th-large",
    //   items: [
    //     {
    //       label: "Blog",
    //       icon: "pi pi-fw pi-comment",
    //       items: [
    //         {
    //           label: "List",
    //           icon: "pi pi-fw pi-image",
    //           to: "/apps/blog/list",
    //         },
    //         {
    //           label: "Detail",
    //           icon: "pi pi-fw pi-list",
    //           to: "/apps/blog/detail",
    //         },
    //         {
    //           label: "Edit",
    //           icon: "pi pi-fw pi-pencil",
    //           to: "/apps/blog/edit",
    //         },
    //       ],
    //     },
    //     {
    //       label: "Calendar",
    //       icon: "pi pi-fw pi-calendar",
    //       to: "/apps/calendar",
    //     },
    //     {
    //       label: "Chat",
    //       icon: "pi pi-fw pi-comments",
    //       to: "/apps/chat",
    //     },
    //     {
    //       label: "Files",
    //       icon: "pi pi-fw pi-folder",
    //       to: "/apps/files",
    //     },
    //     {
    //       label: "Mail",
    //       icon: "pi pi-fw pi-envelope",
    //       items: [
    //         {
    //           label: "Inbox",
    //           icon: "pi pi-fw pi-inbox",
    //           to: "/apps/mail/inbox",
    //         },
    //         {
    //           label: "Compose",
    //           icon: "pi pi-fw pi-pencil",
    //           to: "/apps/mail/compose",
    //         },
    //         {
    //           label: "Detail",
    //           icon: "pi pi-fw pi-comment",
    //           to: "/apps/mail/detail/1000",
    //         },
    //       ],
    //     },
    //     {
    //       label: "Task List",
    //       icon: "pi pi-fw pi-check-square",
    //       to: "/apps/tasklist",
    //     },
    //   ],
    // },
    // {
    //   label: "UI Kit",
    //   icon: "pi pi-fw pi-star-fill",
    //   items: [
    //     {
    //       label: "Form Layout",
    //       icon: "pi pi-fw pi-id-card",
    //       to: "/uikit/formlayout",
    //     },
    //     {
    //       label: "Input",
    //       icon: "pi pi-fw pi-check-square",
    //       to: "/uikit/input",
    //     },
    //     {
    //       label: "Float Label",
    //       icon: "pi pi-fw pi-bookmark",
    //       to: "/uikit/floatlabel",
    //     },
    //     {
    //       label: "Invalid State",
    //       icon: "pi pi-fw pi-exclamation-circle",
    //       to: "/uikit/invalidstate",
    //     },
    //     {
    //       label: "Button",
    //       icon: "pi pi-fw pi-box",
    //       to: "/uikit/button",
    //     },
    //     {
    //       label: "Table",
    //       icon: "pi pi-fw pi-table",
    //       to: "/uikit/table",
    //     },
    //     {
    //       label: "List",
    //       icon: "pi pi-fw pi-list",
    //       to: "/uikit/list",
    //     },
    //     {
    //       label: "Tree",
    //       icon: "pi pi-fw pi-share-alt",
    //       to: "/uikit/tree",
    //     },
    //     {
    //       label: "Panel",
    //       icon: "pi pi-fw pi-tablet",
    //       to: "/uikit/panel",
    //     },
    //     {
    //       label: "Overlay",
    //       icon: "pi pi-fw pi-clone",
    //       to: "/uikit/overlay",
    //     },
    //     {
    //       label: "Media",
    //       icon: "pi pi-fw pi-image",
    //       to: "/uikit/media",
    //     },
    //     {
    //       label: "Menu",
    //       icon: "pi pi-fw pi-bars",
    //       to: "/uikit/menu",
    //     },
    //     {
    //       label: "Message",
    //       icon: "pi pi-fw pi-comment",
    //       to: "/uikit/message",
    //     },
    //     {
    //       label: "File",
    //       icon: "pi pi-fw pi-file",
    //       to: "/uikit/file",
    //     },
    //     {
    //       label: "Chart",
    //       icon: "pi pi-fw pi-chart-bar",
    //       to: "/uikit/charts",
    //     },
    //     {
    //       label: "Misc",
    //       icon: "pi pi-fw pi-circle-off",
    //       to: "/uikit/misc",
    //     },
    //   ],
    // },
    // {
    //   label: "Prime Blocks",
    //   icon: "pi pi-fw pi-prime",
    //   items: [
    //     {
    //       label: "Free Blocks",
    //       icon: "pi pi-fw pi-eye",
    //       to: "/blocks",
    //     },
    //     {
    //       label: "All Blocks",
    //       icon: "pi pi-fw pi-globe",
    //       url: "https://blocks.primereact.org/",
    //       target: "_blank",
    //     },
    //   ],
    // },
    // {
    //   label: "Utilities",
    //   icon: "pi pi-fw pi-compass",
    //   items: [
    //     {
    //       label: "PrimeIcons",
    //       icon: "pi pi-fw pi-prime",
    //       to: "/utilities/icons",
    //     },
    //     {
    //       label: "Colors",
    //       icon: "pi pi-fw pi-palette",
    //       to: "/utilities/colors",
    //     },
    //     {
    //       label: "PrimeFlex",
    //       icon: "pi pi-fw pi-desktop",
    //       url: "https://www.primeflex.org",
    //       target: "_blank",
    //     },
    //     {
    //       label: "Figma",
    //       icon: "pi pi-fw pi-pencil",
    //       url: "https://www.figma.com/file/LuzEn29BAxr03T2vMQ5A1y/Preview-%7C-Avalon-1.0.0?node-id=0%3A1&t=uRZE9N9j7l5GUvvA-1",
    //       target: "_blank",
    //     },
    //   ],
    // },
    // {
    //   label: "Pages",
    //   icon: "pi pi-fw pi-briefcase",
    //   items: [
    //     {
    //       label: "Landing",
    //       icon: "pi pi-fw pi-globe",
    //       to: "/landing",
    //     },
    //     {
    //       label: "Auth",
    //       icon: "pi pi-fw pi-user",
    //       items: [
    //         {
    //           label: "Login",
    //           icon: "pi pi-fw pi-sign-in",
    //           to: "/auth/login",
    //         },
    //         {
    //           label: "Login 2",
    //           icon: "pi pi-fw pi-sign-in",
    //           to: "/auth/login2",
    //         },
    //         {
    //           label: "Error",
    //           icon: "pi pi-fw pi-times-circle",
    //           to: "/auth/error",
    //         },
    //         {
    //           label: "Error 2",
    //           icon: "pi pi-fw pi-times-circle",
    //           to: "/auth/error2",
    //         },
    //         {
    //           label: "Access Denied",
    //           icon: "pi pi-fw pi-lock",
    //           to: "/auth/access",
    //         },
    //         {
    //           label: "Access Denied 2",
    //           icon: "pi pi-fw pi-lock",
    //           to: "/auth/access2",
    //         },
    //       ],
    //     },
    //     {
    //       label: "Crud",
    //       icon: "pi pi-fw pi-pencil",
    //       to: "/pages/crud",
    //     },
    //     {
    //       label: "Timeline",
    //       icon: "pi pi-fw pi-calendar",
    //       to: "/pages/timeline",
    //     },
    //     {
    //       label: "Invoice",
    //       icon: "pi pi-fw pi-dollar",
    //       to: "/pages/invoice",
    //     },

    //     {
    //       label: "Help",
    //       icon: "pi pi-fw pi-question-circle",
    //       to: "/pages/help",
    //     },
    //     {
    //       label: "Not Found",
    //       icon: "pi pi-fw pi-exclamation-circle",
    //       to: "/pages/notfound",
    //     },
    //     {
    //       label: "Not Found 2",
    //       icon: "pi pi-fw pi-exclamation-circle",
    //       to: "/pages/notfound2",
    //     },
    //     {
    //       label: "Empty",
    //       icon: "pi pi-fw pi-circle-off",
    //       to: "/pages/empty",
    //     },
    //     {
    //       label: "Contact Us",
    //       icon: "pi pi-fw pi-phone",
    //       to: "/pages/contact",
    //     },
    //   ],
    // },
    // {
    //   label: "E-Commerce",
    //   icon: "pi pi-fw pi-wallet",
    //   items: [
    //     {
    //       label: "Product Overview",
    //       icon: "pi pi-fw pi-image",
    //       to: "/ecommerce/product-overview",
    //     },
    //     {
    //       label: "Product List",
    //       icon: "pi pi-fw pi-list",
    //       to: "/ecommerce/product-list",
    //     },
    //     {
    //       label: "New Product",
    //       icon: "pi pi-fw pi-plus",
    //       to: "/ecommerce/new-product",
    //     },
    //     {
    //       label: "Shopping Cart",
    //       icon: "pi pi-fw pi-shopping-cart",
    //       to: "/ecommerce/shopping-cart",
    //     },
    //     {
    //       label: "Checkout Form",
    //       icon: "pi pi-fw pi-check-square",
    //       to: "/ecommerce/checkout-form",
    //     },
    //     {
    //       label: "Order History",
    //       icon: "pi pi-fw pi-history",
    //       to: "/ecommerce/order-history",
    //     },
    //     {
    //       label: "Order Summary",
    //       icon: "pi pi-fw pi-file",
    //       to: "/ecommerce/order-summary",
    //     },
    //   ],
    // },

    // {
    //   label: "User Management",
    //   icon: "pi pi-fw pi-user",
    //   items: [
    //     {
    //       label: "List",
    //       icon: "pi pi-fw pi-list",
    //       to: "/profile/list",
    //     },
    //     {
    //       label: "Create",
    //       icon: "pi pi-fw pi-plus",
    //       to: "/profile/create",
    //     },
    //   ],
    // },
    // {
    //   label: "Hierarchy",
    //   icon: "pi pi-fw pi-align-left",
    //   items: [
    //     {
    //       label: "Submenu 1",
    //       icon: "pi pi-fw pi-align-left",
    //       items: [
    //         {
    //           label: "Submenu 1.1",
    //           icon: "pi pi-fw pi-align-left",
    //           items: [
    //             {
    //               label: "Submenu 1.1.1",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //             {
    //               label: "Submenu 1.1.2",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //             {
    //               label: "Submenu 1.1.3",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //           ],
    //         },
    //         {
    //           label: "Submenu 1.2",
    //           icon: "pi pi-fw pi-align-left",
    //           items: [
    //             {
    //               label: "Submenu 1.2.1",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Submenu 2",
    //       icon: "pi pi-fw pi-align-left",
    //       items: [
    //         {
    //           label: "Submenu 2.1",
    //           icon: "pi pi-fw pi-align-left",
    //           items: [
    //             {
    //               label: "Submenu 2.1.1",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //             {
    //               label: "Submenu 2.1.2",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //           ],
    //         },
    //         {
    //           label: "Submenu 2.2",
    //           icon: "pi pi-fw pi-align-left",
    //           items: [
    //             {
    //               label: "Submenu 2.2.1",
    //               icon: "pi pi-fw pi-align-left",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Start",
    //   icon: "pi pi-fw pi-download",
    //   items: [
    //     {
    //       label: "Buy Now",
    //       icon: "pi pi-fw pi-shopping-cart",
    //       url: "https://www.primefaces.org/store",
    //     },
    //     {
    //       label: "Documentation",
    //       icon: "pi pi-fw pi-info-circle",
    //       to: "/documentation",
    //     },
    //   ],
    // },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
