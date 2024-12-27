import { classNames } from "primereact/utils";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";
import { RadioButton as PrimeRadioButton } from "primereact/radiobutton";

type RadioButtonProps = {
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   * */
  id: string;
  options: Record<string, string>[];
  validation?: RegisterOptions;
};

export default function RadioButton({
  id,
  validation,
  options,
}: RadioButtonProps) {
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
            {options.map((option) => (
              <div
                className="tw-flex tw-items-center tw-mt-2"
                key={option.value}
              >
                <PrimeRadioButton
                  checked={field.value === option.value}
                  className={classNames({ "p-invalid": error })}
                  inputId={option.value}
                  inputRef={field.ref}
                  onChange={field.onChange}
                  value={option.value}
                />
                <label
                  className={classNames("ml-2", { "p-error": error })}
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            ))}
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
