"use client";

import type {ReactElement} from "react";
import React, {useState, useEffect, useRef} from "react";
import {ProgressBar} from "primereact/progressbar";
import {Button} from "primereact/button";
import {Badge} from "primereact/badge";
import {Tag} from "primereact/tag";
import {Avatar} from "primereact/avatar";
import {AvatarGroup} from "primereact/avatargroup";
import {Chip} from "primereact/chip";
import {Skeleton} from "primereact/skeleton";
import {ScrollPanel} from "primereact/scrollpanel";
import {ScrollTop} from "primereact/scrolltop";

function MiscDemo(): ReactElement {
  const [value, setValue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const newVal = prevValue + Math.floor(Math.random() * 10) + 1;
        return newVal >= 100 ? 100 : newVal;
      });
    }, 2000);

    intervalRef.current = interval;

    return () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    };
  }, []);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>ProgressBar</h5>
          <div className="grid">
            <div className="col">
              <ProgressBar value={value} />
            </div>
            <div className="col">
              <ProgressBar showValue={false} value="50" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card">
          <h4>Badge</h4>
          <h5>Numbers</h5>
          <div className="flex flex-wrap gap-2">
            <Badge value="2" />
            <Badge severity="success" value="8" />
            <Badge severity="info" value="4" />
            <Badge severity="warning" value="12" />
            <Badge severity="danger" value="3" />
          </div>

          <h5>Positioned Badge</h5>
          <div className="flex flex-wrap gap-2">
            <i
              className="pi pi-bell mr-4 p-text-secondary p-overlay-badge"
              style={{fontSize: "2rem"}}
            >
              <Badge value="2" />
            </i>
            <i
              className="pi pi-calendar mr-4 p-text-secondary p-overlay-badge"
              style={{fontSize: "2rem"}}
            >
              <Badge severity="danger" value="10+" />
            </i>
            <i
              className="pi pi-envelope p-text-secondary p-overlay-badge"
              style={{fontSize: "2rem"}}
            >
              <Badge severity="danger" />
            </i>
          </div>

          <h5>Button Badge</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Emails" type="button">
              <Badge value="8" />
            </Button>
            <Button
              icon="pi pi-users"
              label="Messages"
              severity="warning"
              type="button"
            >
              <Badge severity="danger" value="8" />
            </Button>
          </div>
          <h5>Sizes</h5>
          <div className="flex flex-wrap gap-2 align-items-end">
            <Badge value="2" />
            <Badge severity="warning" size="large" value="4" />
            <Badge severity="success" size="xlarge" value="6" />
          </div>
        </div>

        <div className="card">
          <h4>Avatar</h4>
          <h5>Avatar Group</h5>
          <AvatarGroup className="mb-3">
            <Avatar
              image="/demo/images/avatar/amyelsner.png"
              shape="circle"
              size="large"
            />
            <Avatar
              image="/demo/images/avatar/asiyajavayant.png"
              shape="circle"
              size="large"
            />
            <Avatar
              image="/demo/images/avatar/onyamalimba.png"
              shape="circle"
              size="large"
            />
            <Avatar
              image="/demo/images/avatar/ionibowcher.png"
              shape="circle"
              size="large"
            />
            <Avatar
              image="/demo/images/avatar/xuxuefeng.png"
              shape="circle"
              size="large"
            />
            <Avatar
              label="+2"
              shape="circle"
              size="large"
              style={{backgroundColor: "#9c27b0", color: "#ffffff"}}
            />
          </AvatarGroup>

          <h5>Label - Circle</h5>
          <div className="flex flex-wrap gap-2 align-items-end">
            <Avatar label="P" shape="circle" size="xlarge" />
            <Avatar
              label="V"
              shape="circle"
              size="large"
              style={{backgroundColor: "#2196F3", color: "#ffffff"}}
            />
            <Avatar
              label="U"
              shape="circle"
              style={{backgroundColor: "#9c27b0", color: "#ffffff"}}
            />
          </div>

          <h5>Icon - Badge</h5>
          <Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge">
            <Badge value="4" />
          </Avatar>
        </div>

        <div className="card">
          <h4>ScrollTop</h4>
          <ScrollPanel style={{width: "250px", height: "200px"}}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget
              est lorem. Amet consectetur adipiscing elit ut. Nam libero justo
              laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit
              dolor magna. Est ultricies integer quis auctor elit sed vulputate.
              Consequat ac felis donec et. Tellus orci ac auctor augue mauris.
              Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a.
              Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend
              mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut
              etiam sit amet nisl purus. Cursus sit amet dictum sit amet.
              Tristique senectus et netus et malesuada fames ac turpis egestas.
              Et tortor consequat id porta nibh venenatis cras sed. Diam
              maecenas ultricies mi eget mauris. Eget egestas purus viverra
              accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies
              integer. Mattis aliquam faucibus purus in massa tempor nec.
            </p>
            <ScrollTop
              className="custom-scrolltop"
              icon="pi pi-arrow-up"
              target="parent"
              threshold={100}
            />
          </ScrollPanel>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card">
          <h4>Tag</h4>
          <h5>Tags</h5>
          <div className="flex flex-wrap gap-2">
            <Tag value="Primary" />
            <Tag severity="success" value="Success" />
            <Tag severity="info" value="Info" />
            <Tag severity="warning" value="Warning" />
            <Tag severity="danger" value="Danger" />
          </div>

          <h5>Pills</h5>
          <div className="flex flex-wrap gap-2">
            <Tag rounded value="Primary" />
            <Tag rounded severity="success" value="Success" />
            <Tag rounded severity="info" value="Info" />
            <Tag rounded severity="warning" value="Warning" />
            <Tag rounded severity="danger" value="Danger" />
          </div>

          <h5>Icons</h5>
          <div className="flex flex-wrap gap-2">
            <Tag icon="pi pi-user" value="Primary" />
            <Tag icon="pi pi-check" severity="success" value="Success" />
            <Tag icon="pi pi-info-circle" severity="info" value="Info" />
            <Tag
              icon="pi pi-exclamation-triangle"
              severity="warning"
              value="Warning"
            />
            <Tag icon="pi pi-times" severity="danger" value="Danger" />
          </div>
        </div>

        <div className="card">
          <h4>Chip</h4>
          <h5>Basic</h5>
          <div className="flex flex-wrap align-items-center gap-2">
            <Chip label="Action" />
            <Chip label="Comedy" />
            <Chip label="Mystery" />
            <Chip label="Thriller" removable />
          </div>

          <h5>Icon</h5>
          <div className="flex align-items-center flex-wrap gap-1">
            <Chip icon="pi pi-apple" label="Apple" />
            <Chip icon="pi pi-facebook" label="Facebook" />
            <Chip icon="pi pi-google" label="Google" />
            <Chip icon="pi pi-microsoft" label="Microsoft" removable />
          </div>

          <h5>Image</h5>
          <div className="flex align-items-center flex-wrap gap-1">
            <Chip
              image="/demo/images/avatar/amyelsner.png"
              label="Amy Elsner"
            />
            <Chip
              image="/demo/images/avatar/asiyajavayant.png"
              label="Asiya Javayant"
            />
            <Chip
              image="/demo/images/avatar/onyamalimba.png"
              label="Onyama Limba"
            />
            <Chip
              image="/demo/images/avatar/xuxuefeng.png"
              label="Xuxue Feng"
              removable
            />
          </div>

          <h5>Styling</h5>
          <div className="flex align-items-center flex-wrap gap-1 custom-chip">
            <Chip label="Action" />
            <Chip icon="pi pi-apple" label="Apple" />
            <Chip
              image="/demo/images/avatar/onyamalimba.png"
              label="Onyama Limba"
            />
            <Chip
              image="/demo/images/avatar/xuxuefeng.png"
              label="Xuxue Feng"
              removable
            />
          </div>
        </div>

        <div className="card">
          <h4>Skeleton</h4>
          <div className="border-round border-1 surface-border p-4">
            <div className="flex mb-3">
              <Skeleton className="mr-2" shape="circle" size="4rem" />
              <div>
                <Skeleton className="mb-2" width="10rem" />
                <Skeleton className="mb-2" width="5rem" />
                <Skeleton height=".5rem" />
              </div>
            </div>
            <Skeleton height="150px" width="100%" />
            <div className="flex justify-content-between mt-3">
              <Skeleton height="2rem" width="4rem" />
              <Skeleton height="2rem" width="4rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiscDemo;
