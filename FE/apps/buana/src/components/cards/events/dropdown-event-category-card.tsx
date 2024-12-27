"use client"
import { useState, type ReactElement } from "react";
import Dropdown from "../../ui/dropdown";
import { Button } from "primereact/button";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventCategorySchemaForm } from "@/lib/validations/event-category";
import type { EventCategorySchema } from "@/lib/validations/event-category";
import { useInsertEventCategory } from "@/lib/api/event-category/insert-event-category";
import { toast } from "react-toastify";
import Input from "../../ui/input";

export default function DropdownEventCategoryCard(): ReactElement {
	const [showDialogCategory, setShowDialogCategory] = useState(false);
	const eventCategory = useGetEventCategoryDropdown();
	const insertEventCategory = useInsertEventCategory();
	const { t } = useTranslation();
	const setValue = useFormContext().setValue;

	const onSubmitDialog = async (data) => {
		const resp = await insertEventCategory.mutateAsync(data);
		setShowDialogCategory(false);
		if (resp.status === 200) {
			setValue("eventCategoryId", resp.data.id);
		}
	};

	const methods = useForm<EventCategorySchema>({
		resolver: zodResolver(eventCategorySchemaForm),
		resetOptions: {
			keepDirtyValues: true,
		},
	});

	const { handleSubmit } = methods;

	const handleSaveButtonClick = async () => {
		await handleSubmit(onSubmitDialog)().then(() => {
			setShowDialogCategory(false);
			toast.success("Event category added");
		}).catch(() => {
			toast.error("Error adding event category");
		});
	};

	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			await handleSubmit(onSubmitDialog)().then(() => {
				setShowDialogCategory(false);
				toast.success("Event category added");
			}).catch(() => {
				toast.error("Error Adding event category");
			});
		}
	};


	const footerCategory = () => {
		return (
			<div className="p-2 tw-w-full">
				<Button
					className="tw-w-full"
					icon="pi pi-plus"
					iconPos="right"
					label={t("Add Category")}
					onClick={() => {
						setShowDialogCategory(true);
					}}
					outlined
				/>
			</div>
		);
	};

	return (
		<>
			<Dialog
				className="tw-min-w-fit"
				header={t("Add Event Category")}
				onHide={() => { setShowDialogCategory(false) }}
				pt={{
					content: {
						className: "border-noround-top pt-5 tw-space-y-8",
					},
				}}
				visible={showDialogCategory}
			>
				<FormProvider {...methods} >
					<form
						className="tw-space-y-8"
						id="eventCategoryForm"
						onKeyDown={(e) => {
							void handleKeyPress(e);
						}}
					>
						<Input float id="eventCategoryName" label="Event Category Name" />
						<div className="tw-flex tw-justify-center">
							<div className="tw-flex tw-gap-4">
								<Button
									label="Save"
									loading={insertEventCategory.isPending}
									onClick={(e) => {
										e.preventDefault();
										void handleSaveButtonClick();
									}}
									outlined
									type="button"
								/>
								<Button label="Cancel" onClick={() => { setShowDialogCategory(false) }} type="button" />
							</div>
						</div>
					</form>
				</FormProvider>
			</Dialog>

			<Dropdown
				float
				id="eventCategoryId"
				isLoading={eventCategory.isLoading}
				label={t("Event Category")}
				loading={eventCategory.isLoading}
				optionLabel="eventCategoryName"
				optionValue="id"
				options={eventCategory.data}
				panelFooterTemplate={footerCategory}
				required
			/>

		</>
	);
}