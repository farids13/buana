"use client";
import {Button} from "primereact/button";
import {Chip} from "primereact/chip";
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import type {
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import {FileUpload} from "primereact/fileupload";
import {InputSwitch} from "primereact/inputswitch";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {createRef, useRef, useState} from "react";
import {nanoid} from "nanoid";
import type {RefObject} from "@fullcalendar/core/preact";
import type {Demo} from "@/types/types";

function NewProduct(): ReactElement {
  const colorOptions = [
    {name: "Black", background: "bg-gray-900"},
    {name: "Orange", background: "bg-orange-500"},
    {name: "Navy", background: "bg-blue-500"},
  ];

  const [product, setProduct] = useState<Demo.Product>();

  const [selectedCategory, setSelectedCategory] = useState(product?.category);
  const [selectedStock, setSelectedStock] = useState(product?.category);
  const categoryOptions = ["Sneakers", "Apparel", "Socks"];

  const fileUploader = useRef<FileUpload>(null);

  const chipTemplate = (tag: string): ReactElement => {
    return (
      <>
        <span className="mr-3">{tag}</span>
        <span
          className="chip-remove-icon flex align-items-center justify-content-center border-1 surface-border bg-gray-100 border-circle cursor-pointer"
          onClick={() => {
            onChipRemove(tag);
          }}
        >
          <i className="pi pi-fw pi-times text-black-alpha-60" />
        </span>
      </>
    );
  };

  const onImageMouseOver = (
    ref: React.RefObject<HTMLButtonElement>,
    fileName: string
  ): void => {
    if (ref.current?.id === fileName) ref.current.style.display = "flex";
  };

  const onImageMouseLeave = (
    ref: React.RefObject<HTMLButtonElement>,
    fileName: string
  ): void => {
    if (ref.current?.id === fileName) {
      ref.current.style.display = "none";
    }
  };

  const onChipRemove = (item: string): void => {
    const newTags = product?.tags?.filter((i) => i !== item);
    setProduct((prevState) => {
      if (!prevState?.newTags) return prevState;
      return {...prevState, tags: newTags};
    });
  };

  const onColorSelect = (colorName: string, i: number): void => {
    if (product?.colors?.includes(colorName)) {
      product.colors.splice(product.colors.indexOf(colorName), 1);
      setProduct((prevState) => {
        if (!prevState?.colors) return prevState;
        return {
          ...prevState,
          colors: prevState.colors.filter((color) => color !== colorName),
        };
      });
    } else {
      setProduct((prevState) => {
        if (!prevState?.colors) return prevState;
        return {
          ...prevState,
          colors: [...prevState.colors, colorName],
        };
      });
    }
  };

  const onUpload = (
    event: FileUploadUploadEvent | FileUploadSelectEvent
  ): void => {
    setProduct((prevState) => {
      if (!prevState?.images) return prevState;
      return {...prevState, images: event.files};
    });
  };

  const onFileUploadClick = (): void => {
    const inputEl = fileUploader.current?.getInput();
    inputEl?.click();
  };

  const emptyTemplate = (): ReactElement => {
    return (
      <div
        className="h-15rem overflow-y-auto py-3 border-round"
        style={{cursor: "copy"}}
      >
        <div
          className="flex flex-column w-full h-full justify-content-center align-items-center"
          onClick={onFileUploadClick}
        >
          <i className="pi pi-file text-4xl text-primary" />
          <span className="block font-semibold text-900 text-lg mt-3">
            Drop or select images
          </span>
        </div>
      </div>
    );
  };

  const itemTemplate = (
    file: object,
    props: ItemTemplateOptions
  ): ReactElement => {
    const item = file as Demo.Base;
    const buttonEl = createRef<Button>();
    return (
      <div
        className="flex h-15rem overflow-y-auto py-3 border-round"
        onClick={onFileUploadClick}
        style={{cursor: "copy"}}
      >
        <div className="flex flex-row flex-wrap gap-3 border-round">
          <div
            className="h-full relative w-7rem h-7rem border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto"
            onMouseEnter={() => {
              onImageMouseOver(
                buttonEl as RefObject<HTMLButtonElement>,
                item.name
              );
            }}
            onMouseLeave={() => {
              onImageMouseLeave(
                buttonEl as RefObject<HTMLButtonElement>,
                item.name
              );
            }}
            style={{padding: "1px"}}
          >
            <img
              alt={item.name}
              className="w-full h-full border-round shadow-2"
              src={item.objectURL}
            />
            <Button
              className="hover:flex text-sm absolute justify-content-center align-items-center cursor-pointer w-2rem h-2rem"
              icon="pi pi-times"
              id={item.name}
              onClick={(event) => {
                event.stopPropagation();
                props.onRemove(event);
              }}
              ref={buttonEl}
              rounded
              style={{top: "-10px", right: "-10px", display: "none"}}
              type="button"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <span className="block text-900 font-bold text-xl mb-4">
        Create Product
      </span>
      <div className="grid grid-nogutter flex-wrap gap-3 p-fluid">
        <div className="col-12 lg:col-8">
          <div className="grid formgrid">
            <div className="col-12 field">
              <InputText
                onChange={(e) => {
                  setProduct((prevState) => {
                    if (!prevState?.name) return prevState;
                    return {
                      ...prevState,
                      name: e.target.value,
                    };
                  });
                }}
                placeholder="Product Name"
                type="text"
                value={product?.name}
              />
            </div>
            <div className="col-12 lg:col-4 field">
              <InputText
                keyfilter="int"
                onChange={(e) => {
                  setProduct((prevState) => {
                    if (!prevState?.price) return prevState;
                    return {
                      ...prevState,
                      price: parseFloat(e.target.value) || undefined,
                    };
                  });
                }}
                placeholder="Price"
                value={product?.price?.toString()}
              />
            </div>
            <div className="col-12 lg:col-4 field">
              <InputText
                onChange={(e) => {
                  setProduct((prevState) => {
                    if (!prevState?.code) return prevState;
                    return {
                      ...prevState,
                      code: e.target.value,
                    };
                  });
                }}
                placeholder="Product Code"
                type="text"
                value={product?.code}
              />
            </div>
            <div className="col-12 lg:col-4 field">
              <InputText
                onChange={(e) => {
                  setProduct((prevState) => {
                    if (!prevState?.sku) return prevState;
                    return {
                      ...prevState,
                      sku: e.target.value,
                    };
                  });
                }}
                placeholder="Product SKU"
                type="text"
                value={product?.sku as string}
              />
            </div>
            <div className="col-12 field">
              <Editor style={{height: "250px"}} value={product?.description} />
            </div>
            <div className="col-12 field">
              <FileUpload
                accept="image/*"
                auto
                className="upload-button-hidden border-1 surface-border surface-card border-round"
                customUpload
                emptyTemplate={emptyTemplate}
                itemTemplate={itemTemplate}
                multiple
                name="demo[]"
                onSelect={onUpload}
                onUpload={onUpload}
                ref={fileUploader}
                url="./upload.php"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3">
          <div className="border-1 surface-border border-round">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Publish
            </span>
            <div className="p-3">
              <div className="bg-gray-100 py-2 px-3 flex align-items-center border-round">
                <span className="text-black-alpha-90 font-bold mr-3">
                  Status:
                </span>
                <span className="text-black-alpha-60 font-semibold">
                  {product?.status as string}
                </span>
                <Button
                  className="text-black-alpha-60 ml-auto"
                  icon="pi pi-fw pi-pencil"
                  rounded
                  text
                  type="button"
                />
              </div>
            </div>
          </div>

          <div className="border-1 surface-border border-round">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Tags
            </span>
            <div className="p-3 flex flex-wrap gap-1">
              {product?.tags?.map((tag) => {
                return (
                  <Chip
                    className="mr-2 py-2 px-3 text-900 font-bold surface-card border-1 surface-border"
                    key={nanoid()}
                    style={{borderRadius: "20px"}}
                    template={() => chipTemplate(tag)}
                  />
                );
              })}
            </div>
          </div>

          <div className="border-1 surface-border border-round">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Category
            </span>
            <div className="p-3">
              <Dropdown
                onChange={(e) => {
                  setSelectedCategory(e.value as string);
                }}
                options={categoryOptions}
                placeholder="Select a category"
                value={selectedCategory}
              />
            </div>
          </div>

          <div className="border-1 surface-border border-round">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Colors
            </span>
            <div className="p-3 flex">
              {colorOptions.map((color, i) => {
                return (
                  <div
                    className={classNames(
                      "w-2rem h-2rem mr-2 border-1 surface-border border-circle cursor-pointer flex justify-content-center align-items-center",
                      color.background
                    )}
                    key={nanoid()}
                    onClick={() => {
                      onColorSelect(color.name, i);
                    }}
                  >
                    {product?.colors?.includes(color.name) ? (
                      <i
                        className="pi pi-check text-sm text-white z-5"
                        key={nanoid()}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-1 surface-border border-round">
            <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
              Stock
            </span>
            <div className="p-3">
              <Dropdown
                onChange={(e) => {
                  setSelectedStock(e.value as string);
                }}
                options={categoryOptions}
                placeholder="Select stock"
                value={selectedStock}
              />
            </div>
          </div>

          <div className="border-1 surface-border flex justify-content-between align-items-center py-2 px-3 border-round">
            <span className="text-900 font-bold p-3">In stock</span>
            <InputSwitch
              checked={Boolean(product?.inStock)}
              onChange={(e) => {
                setProduct((prevState) => {
                  if (!prevState?.inStock) return prevState;
                  return {
                    ...prevState,
                    inStock: Boolean(e.value),
                  };
                });
              }}
            />
          </div>

          <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-3 py-2">
            <Button
              className="flex-1"
              icon="pi pi-fw pi-trash"
              label="Discard"
              outlined
              severity="danger"
            />
            <Button
              className="flex-1 border-round"
              icon="pi pi-fw pi-check"
              label="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
