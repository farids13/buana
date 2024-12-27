"use client";
import React from "react";
import type { ReactElement } from "react";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import PreEventForm from "./pre-event-form";
import { ProgressSpinner } from "primereact/progressspinner";
import OngoingEventForm from "./ongoing-event-form";
import PostEventForm from "./post-event-form";
import { TabPanel, TabView } from "primereact/tabview";
import { BiTimer } from "react-icons/bi";
import { RiTodoFill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { useTranslation } from "react-i18next";

type EventFormProps = {
  edit?: boolean;
};

export default function EventForm({ edit }: Readonly<EventFormProps>): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data, isLoading } = useGetEventDetail(id);

  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="tw-min-h-[calc(100vh-10rem)] tw-justify-center tw-flex tw-items-center">
        <ProgressSpinner
          animationDuration=".5s"
          fill="var(--surface-ground)"
          strokeWidth="4"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    );

  const activeIndex = () => {
    switch (data?.phase) {
      case "PRE":
        return 0;
      case "ONGOING":
        return 1;
      case "POST":
        return 2;
      default:
        return 0;
    }
  };

  return edit && data && data.status !== "DRAFT" ? (
    <TabView
      activeIndex={activeIndex()}
      panelContainerClassName="bg-purple-50 p-0 tw-mt-4"
      pt={{
        nav: { className: "tw-justify-between" },
        inkbar: {
          className: "tw-h-1 tw-absolute tw-bg-[#334798] tw-bottom-0 tw-block",
        },
      }}
    >
      <TabPanel
        header={t("Pre Event")}
        leftIcon={<RiTodoFill size={28} />}
        pt={{
          headerAction: {
            className:
              "tw-flex tw-flex-col tw-space-y-2 bg-purple-50 !tw-border-0",
          },
        }}
      >
        <PreEventForm edit={edit} />
      </TabPanel>
      <TabPanel
        disabled={data?.phase === "PRE"}
        header={t("Ongoing Event")}
        leftIcon={<BiTimer size={28} />}
        pt={{
          headerAction: {
            className:
              "tw-flex tw-flex-col tw-space-y-2 bg-purple-50 !tw-border-0",
          },
        }}
      >
        <OngoingEventForm endAt={data.endAt} />
      </TabPanel>
      <TabPanel
        disabled={data?.phase !== "POST"}
        header={t("Post Event")}
        leftIcon={<AiOutlineFileDone size={28} />}
        pt={{
          headerAction: {
            className:
              "tw-flex tw-flex-col tw-space-y-2 bg-purple-50 !tw-border-0",
          },
        }}
      >
        <PostEventForm />
      </TabPanel>
    </TabView>
  ) : (
    <PreEventForm edit={edit} />
  );
}
