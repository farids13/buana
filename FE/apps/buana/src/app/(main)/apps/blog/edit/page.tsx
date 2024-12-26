"use client";
import {Button} from "primereact/button";
import {Chip} from "primereact/chip";
import {Editor} from "primereact/editor";
import type {ItemTemplateOptions} from "primereact/fileupload";
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import type {ReactElement} from "react";
import React, {useRef} from "react";
import {nanoid} from "nanoid";
import type {Demo} from "@/types/types";

export default function BlogEdit(): ReactElement {
  const fileUploader = useRef<FileUpload | null>(null);
  const tags = ["Software", "Web"];

  const onContentButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
  ): void => {
    onRemove(event);
    event.stopPropagation();
  };

  const onFileUploadClick = (): void => {
    const inputEl = fileUploader.current?.getInput();
    inputEl?.click();
  };

  const emptyTemplate = (): ReactElement => {
    return (
      <div className="h-20rem m-1 border-round">
        <div
          className="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
          onClick={onFileUploadClick}
        >
          <i className="pi pi-fw pi-file text-4xl text-primary" />
          <span className="block font-semibold text-900 text-lg mt-3">
            Drop or select a cover image
          </span>
        </div>
      </div>
    );
  };

  const itemTemplate = (
    image: object,
    props: ItemTemplateOptions
  ): ReactElement => {
    const file = image as Demo.Base;
    return (
      <div className="h-20rem m-1 border-round">
        <div className="w-full h-full relative border-round p-0">
          <img
            alt={file.name}
            className="w-full h-full border-round"
            src={file.objectURL}
          />
          <Button
            className="text-sm absolute justify-content-center align-items-center"
            icon="pi pi-times"
            onClick={(e) => {
              onContentButtonClick(e, () => {
                props.onRemove(e);
              });
            }}
            rounded
            style={{top: "-10px", right: "-10px"}}
            type="button"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <span className="block text-900 font-bold text-xl mb-4">
        Create a new post
      </span>
      <div className="grid">
        <div className="col-12 lg:col-8">
          <FileUpload
            accept="image/*"
            auto
            className="upload-button-hidden border-1 surface-border surface-card p-0 border-round mb-4"
            customUpload
            emptyTemplate={emptyTemplate}
            itemTemplate={itemTemplate}
            multiple
            name="demo[]"
            ref={fileUploader}
            url="./upload.php"
          />
          <div className="flex flex-column p-fluid">
            <div className="mb-4">
              <InputText placeholder="Title" type="text" />
            </div>
            <div className="mb-4">
              <InputTextarea autoResize placeholder="Content" rows={6} />
            </div>
            <Editor style={{height: "250px"}} />
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="border-1 surface-border border-round mb-4">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Publish
            </span>
            <div className="p-3">
              <div className="surface-100 p-3 flex align-items-center border-round">
                <span className="text-900 font-semibold mr-3">Status:</span>
                <span className="font-medium">Draft</span>
                <Button
                  className="ml-auto"
                  icon="pi pi-fw pi-pencil"
                  rounded
                  text
                  type="button"
                />
              </div>
            </div>
            <div className="p-3">
              <div className="surface-100 p-3 flex align-items-center border-round">
                <span className="text-900 font-semibold mr-3">Visibility:</span>
                <span className="font-medium">Private</span>
                <Button
                  className="ml-auto"
                  icon="pi pi-fw pi-pencil"
                  rounded
                  text
                  type="button"
                />
              </div>
            </div>
          </div>
          <div className="border-1 surface-border border-round mb-4">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Tags
            </span>
            <div className="p-3 flex gap-2">
              {tags.map((tag) => {
                return <Chip key={nanoid()} label={tag} />;
              })}
            </div>
          </div>
          <div className="border-1 surface-border border-round p-fluid mb-4">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Meta
            </span>
            <div className="p-3">
              <div className="mb-4">
                <InputText placeholder="Title" type="text" />
              </div>
              <div>
                <InputTextarea autoResize placeholder="Description" rows={6} />{" "}
              </div>
            </div>
          </div>
          <div className="flex justify-content-between gap-3">
            <Button
              className="flex-1"
              icon="pi pi-fw pi-trash"
              label="Discard"
              outlined
              severity="danger"
            />
            <Button
              className="flex-1"
              icon="pi pi-fw pi-check"
              label="Publish"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
