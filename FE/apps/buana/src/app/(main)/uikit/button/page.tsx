"use client";
import type {ReactElement} from "react";
import React, {useState} from "react";
import {SplitButton} from "primereact/splitbutton";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import styles from "./index.module.scss";

function ButtonDemo(): ReactElement {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const onLoadingClick1 = (): void => {
    setLoading1(true);

    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  const onLoadingClick2 = (): void => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  const onLoadingClick3 = (): void => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };

  const onLoadingClick4 = (): void => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };

  const items = [
    {
      label: "Update",
      icon: "pi pi-refresh",
    },
    {
      label: "Delete",
      icon: "pi pi-times",
    },
    {
      label: "Home",
      icon: "pi pi-home",
    },
  ];

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <div className="card">
          <h5>Default</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Submit" />
            <Button disabled label="Disabled" />
            <Button label="Link" link />
          </div>
        </div>

        <div className="card">
          <h5>Severities</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Success" severity="success" />
            <Button label="Info" severity="info" />
            <Button label="Warning" severity="warning" />
            <Button label="Help" severity="help" />
            <Button label="Danger" severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Text</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" text />
            <Button label="Secondary" severity="secondary" text />
            <Button label="Success" severity="success" text />
            <Button label="Info" severity="info" text />
            <Button label="Warning" severity="warning" text />
            <Button label="Help" severity="help" text />
            <Button label="Danger" severity="danger" text />
            <Button className="p-button-plain" label="Plain" text />
          </div>
        </div>

        <div className="card">
          <h5>Outlined</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" outlined />
            <Button label="Secondary" outlined severity="secondary" />
            <Button label="Success" outlined severity="success" />
            <Button label="Info" outlined severity="info" />
            <Button label="Warning" outlined severity="warning" />
            <Button label="Help" outlined severity="help" />
            <Button label="Danger" outlined severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Button Group</h5>
          <span className="p-buttonset flex">
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-trash" label="Delete" />
            <Button icon="pi pi-times" label="Cancel" />
          </span>
        </div>

        <div className="card">
          <h5>SplitButton</h5>
          <div className="flex flex-wrap gap-2">
            <SplitButton
              icon="pi pi-check"
              label="Save"
              model={items}
              severity="secondary"
            />
            <SplitButton
              icon="pi pi-check"
              label="Save"
              model={items}
              severity="success"
            />
            <SplitButton
              icon="pi pi-check"
              label="Save"
              model={items}
              severity="info"
            />
            <SplitButton
              icon="pi pi-check"
              label="Save"
              model={items}
              severity="warning"
            />
            <SplitButton
              icon="pi pi-check"
              label="Save"
              model={items}
              severity="danger"
            />
          </div>
        </div>

        <div className="card">
          <h5>Template</h5>
          <div className="flex flex-wrap gap-2">
            <Button
              aria-label="Google"
              className={classNames(styles["p-button"], styles.google)}
            >
              <span className="flex align-items-center px-2 bg-purple-700 text-white">
                <i className="pi pi-google" />
              </span>
              <span className="px-3 py-2 flex align-items-center text-white">
                Google
              </span>
            </Button>
            <Button
              aria-label="Twitter"
              className={classNames(styles["p-button"], styles.twitter)}
            >
              <span className="flex align-items-center px-2 bg-blue-500 text-white">
                <i className="pi pi-twitter" />
              </span>
              <span className="px-3 py-2 flex align-items-center text-white">
                Twitter
              </span>
            </Button>
            <Button
              aria-label="Discord"
              className={classNames(styles["p-button"], styles.discord)}
            >
              <span className="flex align-items-center px-2 bg-bluegray-800 text-white">
                <i className="pi pi-discord" />
              </span>
              <span className="px-3 py-2 flex align-items-center text-white">
                Discord
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card">
          <h5>Icons</h5>
          <div className="flex flex-wrap gap-2">
            <Button icon="pi pi-star-fill" />
            <Button icon="pi pi-bookmark" label="Bookmark" />
            <Button icon="pi pi-bookmark" iconPos="right" label="Bookmark" />
          </div>
        </div>

        <div className="card">
          <h5>Raised</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" raised />
            <Button label="Secondary" raised severity="secondary" />
            <Button label="Success" raised severity="success" />
            <Button label="Info" raised severity="info" />
            <Button label="Warning" raised severity="warning" />
            <Button label="Help" raised severity="help" />
            <Button label="Danger" raised severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Rounded</h5>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" rounded />
            <Button label="Secondary" rounded severity="secondary" />
            <Button label="Success" rounded severity="success" />
            <Button label="Info" rounded severity="info" />
            <Button label="Warning" rounded severity="warning" />
            <Button label="Help" rounded severity="help" />
            <Button label="Danger" rounded severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Rounded Icons</h5>
          <div className="flex flex-wrap gap-2">
            <Button icon="pi pi-check" rounded />
            <Button icon="pi pi-bookmark" rounded severity="secondary" />
            <Button icon="pi pi-search" rounded severity="success" />
            <Button icon="pi pi-user" rounded severity="info" />
            <Button icon="pi pi-bell" rounded severity="warning" />
            <Button icon="pi pi-heart" rounded severity="help" />
            <Button icon="pi pi-times" rounded severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Rounded Text</h5>
          <div className="flex flex-wrap gap-2">
            <Button icon="pi pi-check" rounded text />
            <Button icon="pi pi-bookmark" rounded severity="secondary" text />
            <Button icon="pi pi-search" rounded severity="success" text />
            <Button icon="pi pi-user" rounded severity="info" text />
            <Button icon="pi pi-bell" rounded severity="warning" text />
            <Button icon="pi pi-heart" rounded severity="help" text />
            <Button icon="pi pi-times" rounded severity="danger" text />
            <Button
              className="p-button-plain"
              icon="pi pi-filter"
              rounded
              text
            />
          </div>
        </div>

        <div className="card">
          <h5>Rounded Outlined</h5>
          <div className="flex flex-wrap gap-2">
            <Button icon="pi pi-check" outlined rounded />
            <Button
              icon="pi pi-bookmark"
              outlined
              rounded
              severity="secondary"
            />
            <Button icon="pi pi-search" outlined rounded severity="success" />
            <Button icon="pi pi-user" outlined rounded severity="info" />
            <Button icon="pi pi-bell" outlined rounded severity="warning" />
            <Button icon="pi pi-heart" outlined rounded severity="help" />
            <Button icon="pi pi-times" outlined rounded severity="danger" />
          </div>
        </div>

        <div className="card">
          <h5>Loading</h5>
          <div className="flex flex-wrap gap-2">
            <Button
              icon="pi pi-search"
              label="Search"
              loading={loading1}
              onClick={onLoadingClick1}
            />
            <Button
              icon="pi pi-search"
              iconPos="right"
              label="Search"
              loading={loading2}
              onClick={onLoadingClick2}
            />
            <Button
              icon="pi pi-search"
              loading={loading3}
              onClick={onLoadingClick3}
            />
            <Button
              label="Search"
              loading={loading4}
              onClick={onLoadingClick4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonDemo;
