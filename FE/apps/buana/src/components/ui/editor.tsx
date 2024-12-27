import { Controller, useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";
import { Editor as PrimeEditor } from "primereact/editor";
import type { EditorProps as PrimeEditorProps } from "primereact/editor";
import type { ReactElement } from "react";
import { classNames } from "primereact/utils";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "primereact/skeleton";

export type EditorProps = {
    label: string;
    id: string;
    placeHolder?: string;
    validation?: RegisterOptions
    required?: boolean;
    isLoading?: boolean;
} & PrimeEditorProps;

export default function Editor({
    label,
    id,
    validation,
    placeHolder,
    required,
    isLoading
}: EditorProps): ReactElement {

    const { formState: { errors }, control } = useFormContext();
    const error = errors[id];

    const renderHeader = () => {
        return (
            <div id="standalone-container">
                <h4 className="tw-text-center tw-mb-2">{label}</h4>
                <div className="tw-flex tw-justify-center" id="toolbar-container">
                    <span className="ql-formats">
                        <select className="ql-font" />
                        <select className="ql-header">
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option value="4">Heading 4</option>
                            <option value="5">Heading 5</option>
                            <option value="6">Heading 6</option>
                            <option value="">Normal</option>
                        </select>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-bold" type="button" />
                        <button className="ql-italic" type="button" />
                        <button className="ql-underline" type="button" />
                        <button className="ql-strike" type="button" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" type="button" value="ordered" />
                        <button className="ql-list" type="button" value="bullet" />
                        <select className="ql-align" />
                    </span>
                    <span className="ql-formats">
                        <select className="ql-color" />
                        <select className="ql-background" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-script" type="button" value="sub" />
                        <button className="ql-script" type="button" value="super" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-blockquote" type="button" />
                        <button className="ql-code-block" type="button" />
                    </span>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <Skeleton className='tw-mb-3' height='25vh' width='100%' />
        );
    }

    return (
        <>
            <span className={classNames({"p-float-label": true})}>
                <Controller
                    control={control}
                    name={id}
                    render={({ field, fieldState }) => (
                        <span>
                            <PrimeEditor
                                className={classNames(
                                    { "p-invalid": fieldState.error },
                                    "w-full",
                                )}
                                headerTemplate={renderHeader()}
                                id={field.name}
                                name={id}
                                onTextChange={(e) => { field.onChange(e.htmlValue) }}
                                placeholder={placeHolder}
                                style={{ height: '35vh' }}
                                value={field.value}
                            />
                        </span>
                    )}
                    rules={validation}
                />
            </span>
            {error ? (
                <small className="p-error">{error.message?.toString()}</small>
            ) : null}
        </>
    )
}