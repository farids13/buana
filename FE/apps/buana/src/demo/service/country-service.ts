import type {Demo} from "@/types/types";

export const CountryService = {
  getCountries() {
    return fetch("/demo/data/countries.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: Demo.Country[]}) => d.data);
  },
};
