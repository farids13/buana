import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export type TextAreaProps = {
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
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function TextArea({
  label,
  id,
  validation,
  float = false,
}: TextAreaProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <>
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
            <InputTextarea
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full",
              )}
              id={field.name}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              rows={3}
              value={field.value}
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
    </>
  );
}
