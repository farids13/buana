import type { ChipsProps as PrimeChipsProps } from "primereact/chips";
import { Chips as PrimeChips } from "primereact/chips";

import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export type ChipsProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Float label */
  float?: boolean;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & PrimeChipsProps;

export default function Chips({
  label,
  id,
  validation,
  float = false,
  helperText,
  ...props
}: ChipsProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className="tw-flex tw-flex-col">
      {!float && (
        <p
          className={classNames("block mb-2 tw-text-white", {
            "p-error": error,
          })}
        >
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={id}
        render={({ field, fieldState }) => (
          <span className={classNames({ "p-float-label": float })}>
            <PrimeChips
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full block",
              )}
              id={field.name}
              onChange={field.onChange}
              separator=","
              value={field.value}
              {...props}
            />
            {float ? (
              <label
                className={classNames("tw-text-white", {
                  "p-error": error,
                })}
                htmlFor={field.name}
              >
                {label}
              </label>
            ) : null}
          </span>
        )}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
      {helperText ? (
        <small className="tw-text-gray-500">{helperText}</small>
      ) : null}
    </div>
  );
}
