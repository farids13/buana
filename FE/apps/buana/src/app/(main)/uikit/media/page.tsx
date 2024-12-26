"use client";

import {Button} from "primereact/button";
import {Carousel} from "primereact/carousel";
import {Galleria} from "primereact/galleria";
import {Image} from "primereact/image";
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";
import {PhotoService} from "@/src/demo/service/photo-service";
import {ProductService} from "@/src/demo/service/product-service";
import type {Demo} from "@/types/types";

export default function MediaDemo(): ReactElement {
  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [images, setImages] = useState<Demo.Photo[]>([]);

  const galleriaResponsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];
  const carouselResponsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    ProductService.getProductsSmall()
      .then((_products) => {
        setProducts(_products);
      })
      .catch(() => ({}));

    PhotoService.getImages()
      .then((_images) => {
        setImages(_images);
      })
      .catch(() => ({}));
  }, []);

  const carouselItemTemplate = (product: Demo.Product): ReactElement => {
    return (
      <div className="border-1 surface-border border-round m-1 text-center py-5">
        <div className="mb-3">
          <img
            alt={product.name}
            className="w-6 shadow-2"
            src={`/demo/images/product/${product.image}`}
          />
        </div>
        <div>
          <h4 className="p-mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <span
            className={`product-badge status-${product.inventoryStatus?.toLowerCase()}`}
          >
            {product.inventoryStatus}
          </span>
          <div className="car-buttons mt-5">
            <Button
              className="mr-2"
              icon="pi pi-search"
              rounded
              type="button"
            />
            <Button
              className="mr-2"
              icon="pi pi-star"
              rounded
              severity="success"
              type="button"
            />
            <Button icon="pi pi-cog" rounded severity="help" type="button" />
          </div>
        </div>
      </div>
    );
  };

  const galleriaItemTemplate = (item: Demo.Photo): ReactElement => (
    <img
      alt={item.alt}
      src={`/${item.itemImageSrc}`}
      style={{width: "100%", display: "block"}}
    />
  );
  const galleriaThumbnailTemplate = (item: Demo.Photo): ReactElement => (
    <img
      alt={item.alt}
      src={`/${item.thumbnailImageSrc}`}
      style={{width: "100%", display: "block"}}
    />
  );

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <div className="card">
          <h5>Carousel</h5>
          <Carousel
            itemTemplate={carouselItemTemplate}
            numScroll={3}
            numVisible={3}
            responsiveOptions={carouselResponsiveOptions}
            value={products}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Image</h5>
          <div className="flex justify-content-center">
            <Image
              alt="Image"
              preview
              src="/demo/images/galleria/galleria10.jpg"
              width="250"
            />
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h5>Galleria</h5>
          <Galleria
            circular
            item={galleriaItemTemplate}
            numVisible={7}
            responsiveOptions={galleriaResponsiveOptions}
            style={{maxWidth: "800px", margin: "auto"}}
            thumbnail={galleriaThumbnailTemplate}
            value={images}
          />
        </div>
      </div>
    </div>
  );
}
