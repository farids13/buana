import { classNames } from "primereact/utils";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";

type SwitchProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   * */
  id: string;
  validation?: RegisterOptions;
};

export default function Switch({ label, id, validation }: SwitchProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <Controller
      control={control}
      name={id}
      render={({ field }) => {
        return (
          <>
            <div className="tw-flex tw-items-center !tw-mt-2">
              <InputSwitch
                checked={field.value}
                className={classNames({ "p-invalid": error })}
                inputId={field.name}
                inputRef={field.ref}
                onChange={(e) => {
                  field.onChange(e.value);
                }}
              />
              <label
                className={classNames("ml-2", { "p-error": error })}
                htmlFor={field.name}
              >
                {label}
              </label>
            </div>
            {error ? (
              <small className="p-error">{error.message?.toString()}</small>
            ) : null}
          </>
        );
      }}
      rules={validation}
    />
  );
}
