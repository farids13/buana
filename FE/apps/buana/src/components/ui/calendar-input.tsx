import type { CalendarProps as PrimeCalendarProps } from "primereact/calendar";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

type CalendarProps = {
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
  icon?: boolean;
  /** Float label */
  float?: boolean;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & PrimeCalendarProps;



export default function CalendarInput({
  label,
  id,
  float,
  validation,
  icon,
  required,
  ...props
}: CalendarProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className="w-full">
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
            <Calendar
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full",
              )}
              dateFormat="yy-mm-dd"
              hourFormat="24"
              inputId={field.name}
              onChange={field.onChange}
              pt={{
                input: { root: { className: "border-noround-right" } },
                dropdownButton: { root: { className: "border-noround-left" } },
              }}
              showIcon={icon}
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
                {label} {required ? <span className="tw-text-red-600 tw-text-xs">*</span> : null}
              </label>
            ) : null}
          </span>
        )}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
    </div>
  );
}
