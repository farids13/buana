"use client";

import type {ReactElement} from "react";
import React, {useRef} from "react";
import {FileUpload} from "primereact/fileupload";
import {Toast} from "primereact/toast";

function FileDemo(): ReactElement {
  const toast = useRef<Toast | null>(null);

  const onUpload = (): void => {
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="card">
          <h5>Advanced</h5>
          <FileUpload
            accept="image/*"
            maxFileSize={1000000}
            multiple
            name="demo[]"
            onUpload={onUpload}
            url="/api/upload"
          />

          <h5>Basic</h5>
          <FileUpload
            accept="image/*"
            maxFileSize={1000000}
            mode="basic"
            name="demo[]"
            onUpload={onUpload}
            url="/api/upload"
          />
        </div>
      </div>
    </div>
  );
}

export default FileDemo;
