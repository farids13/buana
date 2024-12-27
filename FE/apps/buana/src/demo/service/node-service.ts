import type {TreeNode} from "primereact/treenode";

export const NodeService = {
  getFiles() {
    return fetch("/demo/data/files.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: TreeNode[]}) => d.data);
  },

  getLazyFiles() {
    return fetch("/demo/data/files-lazy.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: TreeNode[]}) => d.data);
  },

  getFilesystem() {
    return fetch("/demo/data/filesystem.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: TreeNode[]}) => d.data);
  },

  getLazyFilesystem() {
    return fetch("/demo/data/filesystem-lazy.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: TreeNode[]}) => d.data);
  },
};
