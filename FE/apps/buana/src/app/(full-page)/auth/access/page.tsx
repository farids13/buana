"use client";
import {useRouter} from "next/navigation";
import {Button} from "primereact/button";
import type {ReactElement} from "react";
import React from "react";
import Image from "next/image";

function AccessDenied(): ReactElement {
  const router = useRouter();
  const navigateToDashboard = (): void => {
    router.push("/");
  };

  return (
    <div
      className="overflow-hidden m-0 relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/layout/images/pages/exception/bg-access.png)",
      }}
    >
      <div className="text-center text-5xl pt-5 font-bold text-white">
        <div className="inline-block py-1 px-2 text-color surface-ground">
          <span>Access</span>
        </div>
        <span>Denied</span>
      </div>
      <div className="w-full absolute bottom-0 text-center surface-900 h-14rem">
        <div className="w-full absolute text-center z-1" style={{top: "-36px"}}>
          <Image
            alt="avalon-react"
            fill
            src="/layout/images/pages/exception/icon-error.png"
          />
        </div>
        <div
          className="w-29rem relative text-white"
          style={{marginLeft: "-200px", left: "50%", top: "30px"}}
        >
          <div className="p-3">
            <h3 className="m-0 mb-2 text-0">Access denied to this resource.</h3>
            <p className="m-0 text-0">
              You dont have the necessary permission.
            </p>
          </div>
          <Button onClick={navigateToDashboard}>Go To Dashboard</Button>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
