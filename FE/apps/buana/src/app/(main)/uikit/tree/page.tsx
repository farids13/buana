"use client";
import type {ReactElement} from "react";
import React, {useState, useEffect} from "react";
import type {
  TreeCheckboxSelectionKeys,
  TreeMultipleSelectionKeys,
} from "primereact/tree";
import {Tree} from "primereact/tree";
import type {TreeTableSelectionKeysType} from "primereact/treetable";
import {TreeTable} from "primereact/treetable";
import {Column} from "primereact/column";
import type {TreeNode} from "primereact/treenode";
import {NodeService} from "@/src/demo/service/node-service";

export default function TreeDemo(): ReactElement {
  const [files, setFiles] = useState<TreeNode[]>([]);
  const [files2, setFiles2] = useState<TreeNode[]>([]);
  const [selectedFileKeys, setSelectedFileKeys] = useState<
    string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null
  >(null);
  const [selectedFileKeys2, setSelectedFileKeys2] =
    useState<TreeTableSelectionKeysType | null>(null);

  useEffect(() => {
    NodeService.getFiles()
      .then((_files) => {
        setFiles(_files);
      })
      .catch(() => ({}));
    NodeService.getFilesystem()
      .then((_files) => {
        setFiles2(_files);
      })
      .catch(() => ({}));
  }, []);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Tree</h5>
          <Tree
            onSelectionChange={(e) => {
              setSelectedFileKeys(e.value);
            }}
            selectionKeys={selectedFileKeys}
            selectionMode="checkbox"
            value={files}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <h5>TreeTable</h5>
          <TreeTable
            onSelectionChange={(e) => {
              setSelectedFileKeys2(e.value);
            }}
            selectionKeys={selectedFileKeys2}
            selectionMode="checkbox"
            value={files2}
          >
            <Column expander field="name" header="Name" />
            <Column field="size" header="Size" />
            <Column field="type" header="Type" />
          </TreeTable>
        </div>
      </div>
    </div>
  );
}
