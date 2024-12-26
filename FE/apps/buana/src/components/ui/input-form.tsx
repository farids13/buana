"use client";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export enum InputTypeEnum {
  CURRENCY = 'currency',
  PERCENTAGE = 'percentage',
  TEXT = 'text',
  PASSWORD = 'password',
  HIDDEN = 'hidden',
  NUMBER = 'number'
}

export type InputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Icon */
  icon?: string;
  /** Float label */
  float?: boolean;
  /**
   * Input type
   * @example text, email, password, currency, percentage
   */
  type?: InputTypeEnum;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  useLocalStorage? : boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  id,
  icon,
  type = InputTypeEnum.TEXT,
  validation,
  float = false,
  required,
  useLocalStorage
}: InputProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  const isPassword = type === InputTypeEnum.PASSWORD;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {!float && (
        <p className={classNames("block mb-2 tw-text-white", { "p-error": error })}>
          {label} {required ? <span className="tw-text-red-600 tw-text-xs" style={{color: 'red'}}>*</span> : null}
        </p>
      )}
      <Controller
        control={control}
        defaultValue=""
        name={id}
        render={({ field, fieldState }) => {
          const renderInput = () => {
            switch (type) {
              case InputTypeEnum.NUMBER:
                return (
                    <InputNumber
                      className={classNames(
                        { "p-invalid": fieldState.error },
                        "w-full"
                      )}
                      id={field.name}
                      min={0}
                      minFractionDigits={0}
                      onValueChange={(e) => { field.onChange(e.value); }}
                      showButtons
                      useGrouping={false}
                      value={field.value}
                    />
                );
              
              case InputTypeEnum.CURRENCY:
                return (
                  <InputNumber
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "w-full",
                    )}
                    currency="IDR"
                    id={field.name}
                    locale="id-ID"
                    minFractionDigits={0}
                    mode="currency"
                    onValueChange={(e) => { field.onChange(e.value); }}
                    value={field.value}
                  />
                );
              
              case InputTypeEnum.PERCENTAGE:
                return (
                  <InputNumber
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "w-full",
                    )}
                    id={field.name}
                    max={100}
                    maxFractionDigits={0}
                    min={0}
                    minFractionDigits={0}
                    onValueChange={(e) => {
                      if (e.value === null) {
                        field.onChange(null);
                        return;
                      }
                      
                      const value = Number(e.value);
                      if (value > 100) {
                        field.onChange(100);
                        return;
                      }
                      if (value < 0) {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(value);
                    }}
                    suffix="%"
                    useGrouping={false}
                    value={field.value}
                    {...(validation && {
                      tooltip: "Nilai maksimal adalah 100%",
                      tooltipOptions: {
                        event: 'both',
                        position: 'right',
                        className: 'text-red-500'
                      }
                    })}
                  />
                );
              
              case InputTypeEnum.PASSWORD:
                return (
                  <InputText
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "w-full",
                    )}
                    id={field.name}
                    onChange={(e) => { field.onChange(e.target.value); }}
                    type={showPassword ? "text" : "password"}
                    value={field.value}
                  />
                );
              
              case InputTypeEnum.HIDDEN:
                return (
                  <input
                    id={field.name}
                    onChange={(e) => { field.onChange(e.target.value); }}
                    type="hidden"
                    value={field.value}
                  />
                );
              
              default:
                return (
                  <InputText
                    className={classNames(
                      { "p-invalid": fieldState.error },
                      "w-full",
                    )}
                    id={field.name}
                    onChange={(e) => { field.onChange(e.target.value); }}
                    type="text"
                    value={field.value}
                  />
                );
            }
          };

          return (
            <span
              className={classNames("p-input-icon-right block", {
                "p-float-label": float,
              })}
            >
              <i
                className={classNames(
                  "pi",
                  icon,
                  isPassword && "tw-cursor-pointer",
                  showPassword && isPassword && "pi-eye",
                  !showPassword && isPassword && "pi-eye-slash",
                )}
                onClick={() => {
                  if (isPassword) {
                    setShowPassword(!showPassword);
                  }
                }}
              />
              {renderInput()}
              {float ? (
                <label className={classNames("tw-text-white", { "p-error": error })} htmlFor={field.name}>
                  {label} {required ? <span className="tw-text-red-600 tw-text-xs" style={{color: 'red'}}>*</span> : null}
                </label>
              ) : null}
            </span>
          );
        }}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
    </>
  );
}
