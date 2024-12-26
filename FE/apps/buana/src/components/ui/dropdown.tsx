import type { DropdownProps as PrimeDropdownProps } from "primereact/dropdown";
import { Dropdown as PrimeDropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";

import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export type DropdownProps = {
  label: string;
  id: string;
  placeholder?: string;
  float?: boolean;
  loading?: boolean;
  isLoading?: boolean;
  readOnly?: boolean;
  validation?: RegisterOptions;
} & PrimeDropdownProps;

export default function Dropdown({
  label,
  id,
  validation,
  float = false,
  options,
  required,
  loading,
  isLoading,
  ...props
}: DropdownProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  if (isLoading) {
    return (
      <Skeleton className='tw-mb-3' height='5vh' width='100%' />
    );
  }

  return (
    <>
      {!float && (
        <p
          className={classNames("block mb-2 tw-text-white", {
            "p-error": error,
          })}
        >
          {label} {required ? <span className="tw-text-red-600 tw-text-xs" style={{color: 'red'}}>*</span> : null}
        </p>
      )}
      <Controller
        control={control}
        name={id}
        render={({ field, fieldState }) => (
          <span className={classNames({ "p-float-label": float })}>
            <PrimeDropdown
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full",
              )}
              emptyMessage={loading ? "Loading..." : "No results found"}
              id={field.name}
              onChange={field.onChange}
              options={options}
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
                {label} {required ? <span className="tw-text-red-600 tw-text-xs" style={{color: 'red'}}>*</span> : null}
              </label>
            ) : null}
          </span>
        )}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
    </>
  );
}
