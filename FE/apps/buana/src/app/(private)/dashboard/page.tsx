"use client"
import type { ReactElement } from "react";
import React, { useEffect } from "react";
import TimeManagement from "~/svg/time-management.svg";
import { Button } from "primereact/button";
import Calendar from "@/components/ui/calendar";
import EventCategoryChart from "@/components/dashboard/event-category-chart";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getDataDashboardKey, useGetDataDashboard } from "@/lib/api/dashboard/get-data-dashboard";
import moment from "moment";
import { truncateText } from "@/utils/string-utils";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "primereact/tooltip";



export default function Dashboard(): ReactElement {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dashboardData = useGetDataDashboard();

  useEffect(() => {
    void queryClient.refetchQueries({ queryKey: [getDataDashboardKey] });
  }, []);

  const footerCard = (phase: string) => {
    return (
      <div className="tw-absolute tw-bottom-2 tw-bg-white tw-w-full tw-right-0">
        <div className="tw-border" />
        <div className="tw-flex tw-justify-end tw-pt-2">
          <Link className="tw-w-auto tw-mr-[8%]" href={`/events?phase=${phase}`}>
            <Button label={t('See More')} style={{ backgroundColor: '#DCDFF9', color: '#7580E8', border: 'none' }} type="button" />
          </Link>
        </div>
      </div>
    )
  };

  const headerCard = (title: string, no: number) => {
    let tagColor = "p-tag-warning";
    if (no === 2) {
      tagColor = "p-tag-info";
    } else if (no === 3) {
      tagColor = "p-tag-success";
    }
    return (
      <div className="tw-flex tw-gap-2 tw-items-center max-sm:-tw-mb-4">
        <h4 className="max-sm:tw-text-[11px]">{title}</h4>
        <i className={`tw-h-4 tw-w-4 tw-rounded-full p-tag max-sm:tw-h-3 max-sm:tw-w-2 ${tagColor}`} />
      </div>
    );
  };


  return (
    <div className="grid">
      <div className="col-12 -tw-mb-5">
        <div className="card tw-flex tw-justify-between tw-relative tw-h-[280px]">
          <div className="tw-space-y-2 tw-flex tw-flex-col tw-min-h-full tw-w-full tw-min-w-max tw-p-6 tw-pt-10 tw-overflow-hidden">
            <h1 className="tw-text-[64px] max-sm:tw-text-[25px] max-sm:tw-text-center max-2xl:tw-text-[38px]">{t(`Hi, ${truncateText(dashboardData.data?.name, 25)}`)}</h1>
            <h4 className="tw-font-light tw-pt-2 max-sm:tw-text-center">{t('Arrange your meeting plan today!')}</h4>
            <Link className="mt-auto max-sm:tw-text-center" href="/events/add">
              <Button className="mt-auto w-14rem tw-justify-center">
                {t("Create Schedule Event")}
              </Button>
            </Link>
          </div>
          <TimeManagement className="tw-max-w-xs tw-absolute tw-right-10 -tw-top-12 max-xl:tw-hidden " />
        </div>
      </div>
      <div className="tw-grid col-12 tw-grid-cols-12 tw-gap-4">
        <div className="card tw-col-span-7 max-2xl:tw-col-span-12 tw-flex tw-justify-between tw-flex-col">
          <div className="tw-grid col-12 tw-row-span-2 tw-grid-cols-6 tw-gap-4 max-sm:tw-gap-2" style={{ minHeight: '250px' }}>

            {/* post */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '100px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Completed Event'), 3)}
              {
                dashboardData.data?.post?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-pb-10 tw-my-4 tw-z-10 max-sm:tw-text-[10px] ">
                      {
                        dashboardData.data?.post?.slice(0, 3).map((event) => (
                          <li key={event.id}>
                            <Tooltip
                              mouseTrack
                              mouseTrackLeft={20}
                              mouseTrackTop={20}
                              position="bottom"
                              target={`#eventLink_${event.id}`}
                            >
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 50)}`}
                            </Tooltip>
                            <a
                              href={`/events/edit/${event.id}`}
                              id={`eventLink_${event.id}`}
                            >
                              {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{ maxWidth: '16rem' }}
                    />
                  )
              }
              {footerCard('POST')}
            </div>
            {/* ongoing */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '100px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Ongoing Event'), 2)}
              {
                dashboardData.data?.onGoing?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-my-4 tw-z-10 max-sm:tw-text-[10px] ">
                      {
                        dashboardData.data?.onGoing?.slice(0, 3).map((event) => (
                          <li key={event.id}>
                            <Tooltip
                              mouseTrack
                              mouseTrackLeft={20}
                              mouseTrackTop={20}
                              position="bottom"
                              target={`#eventLink_${event.id}`}
                            >
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 50)}`}
                            </Tooltip>
                            <a
                              href={`/events/edit/${event.id}`}
                              id={`eventLink_${event.id}`}
                            >
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{ maxWidth: '16rem' }}
                    />
                  )
              }
              {footerCard("ONGOING")}
            </div>
            {/* pre */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '100px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Upcoming Event'), 1)}
              {
                dashboardData.data?.pre?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-my-4 tw-z-10 max-sm:tw-text-[10px]">
                      {
                        dashboardData.data?.pre?.slice(0, 3).map((event) => (
                          <li key={event.id}>
                            <Tooltip
                              mouseTrack
                              mouseTrackLeft={20}
                              mouseTrackTop={20}
                              position="bottom"
                              target={`#eventLink_${event.id}`}
                            >
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 50)}`}
                            </Tooltip>
                            <a
                              href={`/events/edit/${event.id}`}
                              id={`eventLink_${event.id}`}
                            >
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{ maxWidth: '16rem' }}
                    />
                  )
              }

              {footerCard("PRE")}
            </div>
          </div>
          <EventCategoryChart />
        </div>
        <div className="card tw-col-span-5 max-2xl:tw-col-span-12">
          <Calendar simple />
        </div>
      </div>
    </div>
  );
}
