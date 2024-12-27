import type {Demo} from "@/types/types";

let icons: Demo.Icon[];

export const IconService = {
  getIcons() {
    return fetch("/demo/data/icons.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {icons: Demo.Icon[]}) => d.icons);
  },

  getIcon(id: number) {
    return icons.find((x: Demo.Icon) => x.properties?.id === id);
  },
};
