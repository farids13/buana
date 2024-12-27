import type {Demo} from "@/types/demo";

export const FileService = {
  getFiles() {
    return fetch("/demo/data/file-management.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {files: Demo.File[]}) => d.files);
  },

  getMetrics() {
    return fetch("/demo/data/file-management.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {metrics: Demo.Metric[]}) => d.metrics);
  },

  getFoldersSmall() {
    return fetch("/demo/data/file-management.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {folders_small: Demo.BaseFolder[]}) => d.folders_small);
  },

  getFoldersLarge() {
    return fetch("/demo/data/file-management.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {folders_large: Demo.BaseFolder[]}) => d.folders_large);
  },
};
