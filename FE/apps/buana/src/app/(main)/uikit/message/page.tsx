"use client";
import type {ReactElement} from "react";
import React, {useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Messages} from "primereact/messages";
import {Message} from "primereact/message";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

function MessagesDemo(): ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const toast = useRef<Toast>(null);
  const message = useRef<Messages>(null);

  const addSuccessMessage = (): void => {
    message.current?.show({severity: "success", content: "Message Detail"});
  };

  const addInfoMessage = (): void => {
    message.current?.show({severity: "info", content: "Message Detail"});
  };

  const addWarnMessage = (): void => {
    message.current?.show({severity: "warn", content: "Message Detail"});
  };

  const addErrorMessage = (): void => {
    message.current?.show({severity: "error", content: "Message Detail"});
  };

  const showSuccess = (): void => {
    toast.current?.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Detail",
      life: 3000,
    });
  };

  const showInfo = (): void => {
    toast.current?.show({
      severity: "info",
      summary: "Info Message",
      detail: "Message Detail",
      life: 3000,
    });
  };

  const showWarn = (): void => {
    toast.current?.show({
      severity: "warn",
      summary: "Warn Message",
      detail: "Message Detail",
      life: 3000,
    });
  };

  const showError = (): void => {
    toast.current?.show({
      severity: "error",
      summary: "Error Message",
      detail: "Message Detail",
      life: 3000,
    });
  };

  return (
    <div className="grid">
      <div className="col-12 lg:col-6">
        <div className="card">
          <h5>Toast</h5>
          <div className="flex flex-wrap gap-2">
            <Toast ref={toast} />
            <Button
              label="Success"
              onClick={showSuccess}
              severity="success"
              type="button"
            />
            <Button
              label="Info"
              onClick={showInfo}
              severity="info"
              type="button"
            />
            <Button
              label="Warn"
              onClick={showWarn}
              severity="warning"
              type="button"
            />
            <Button
              label="Error"
              onClick={showError}
              severity="danger"
              type="button"
            />
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-6">
        <div className="card">
          <h5>Messages</h5>
          <div className="flex flex-wrap gap-2">
            <Button
              label="Success"
              onClick={addSuccessMessage}
              severity="success"
              type="button"
            />
            <Button
              label="Info"
              onClick={addInfoMessage}
              severity="info"
              type="button"
            />
            <Button
              label="Warn"
              onClick={addWarnMessage}
              severity="warning"
              type="button"
            />
            <Button
              label="Error"
              onClick={addErrorMessage}
              severity="danger"
              type="button"
            />
          </div>
          <Messages ref={message} />
        </div>
      </div>

      <div className="col-12 lg:col-8">
        <div className="card">
          <h5>Inline</h5>
          <div className="flex align-items-center flex-wrap gap-2 mb-3">
            <label className="col-fixed w-9rem" htmlFor="username1">
              Username
            </label>
            <InputText
              className="p-invalid"
              id="username1"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              value={username}
            />
            <Message severity="error" text="Username is required" />
          </div>
          <div className="flex align-items-center flex-wrap gap-2">
            <label className="col-fixed w-9rem" htmlFor="email">
              Email
            </label>
            <InputText
              className="p-invalid"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              value={email}
            />
            <Message severity="error" />
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-4">
        <div className="card">
          <h5>Help Text</h5>
          <div className="field p-fluid">
            <label htmlFor="username2">Username</label>
            <InputText
              aria-describedby="username-help"
              className="p-invalid"
              id="username2"
              type="text"
            />
            <small className="p-error" id="username-help">
              Enter your username to reset your password.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesDemo;
