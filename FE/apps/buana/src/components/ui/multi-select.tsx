import { useEffect } from 'react';
import { classNames } from "primereact/utils";
import { MultiSelect as PrimeMultiSelect } from "primereact/multiselect";
import type { MultiSelectProps as PrimeMultiSelectProps } from "primereact/multiselect";
import type { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";

export type MultiSelectProps = {
    label: string;
    id: string;
    validation?: RegisterOptions
    float?: boolean;
    options: unknown[];
    required?: boolean;
    loading?: boolean;
} & PrimeMultiSelectProps;

export default function MultiSelect({
    label,
    id,
    validation,
    float = false,
    options,
    required,
}: MultiSelectProps): ReactElement {

    const { formState: { errors }, control, setValue, getValues } = useFormContext();
    const error = errors[id];

    useEffect(() => {
        setValue(id, getValues(id) || []);
    }, [setValue, id]);

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
                render={({ field }) => (
                    <span className={classNames({ "p-float-label mt-5": float })}>
                        <PrimeMultiSelect
                            className={classNames(
                                { "p-invalid": error },
                                "w-full",
                            )}
                            display='chip'
                            id={id}
                            onChange={(e) => {
                                field.onChange(e.value);
                            }}
                            options={options}
                            value={field.value || []}
                        />
                        {float ? (
                            <label
                                className={classNames("tw-text-white", {
                                    "p-error": error,
                                })}
                                htmlFor={id}
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
