"use client"
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from 'primereact/dialog';
import { useGetEventListCalendar } from '@/lib/api/event/get-event-list-calendar-by-date';
import { useGetEventDetail } from '@/lib/api/event/get-event-detail';
import moment from 'moment';
import { ProgressSpinner } from 'primereact/progressspinner';
import i18n from '@/app/i18n';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'primereact/tooltip';

interface Event {
    id: string,
    title: string;
    start: Date | null;
    end: Date | null;
    allDay: boolean | null;
    isOnline: boolean | null;
}
const defaultValue: Event = { id: '', title: '', start: null, end: null, allDay: null, isOnline: false };

const content  = (eventInfo : any) => {
        return(
            <>
            <Tooltip
                content="Click to detail"
                mouseTrack
                mouseTrackLeft={20}
                mouseTrackTop={20}
                position="bottom"
                target={`#tooltip-${eventInfo.event.id}`}
            />
            <div className="tooltip tw-flex tw-justify-center tw-items-center" id={`tooltip-${eventInfo.event.id}`}>
                <div className="fc-daygrid-event-dot"/>
                <span className='test'>{eventInfo.timeText}</span>
            </div>
        </>
        );
}

export default function Calendar({ simple = false }: Readonly<{ simple?: boolean }>): ReactElement {
    const [eventDialog, setEventDialog] = useState<boolean>(false);
    const [clickedEvent, setClickedEvent] = useState<any>(null);
    const [changedEvent, setChangedEvent] = useState<Event>(defaultValue);
    const [events, setEvents] = useState<any>(defaultValue);
    const [viewDate, setViewDate] = useState(new Date());
    const { data } = useGetEventListCalendar(viewDate);
    const { data: eventDetail } = useGetEventDetail(clickedEvent?.id);
    const { t } = useTranslation();
    const eventClick = (e: any) => {
        const { id, title, start, end, isOnline } = e.event;
        setEventDialog(true);
        setClickedEvent(e.event);
        setChangedEvent({ id, title, start, end, allDay: null, isOnline });
    };

    useEffect(() => {
        const modifiedEvents = data?.map(event => ({ ...event, end: event.start }));
        setEvents(simple ? modifiedEvents : data);
    }, [data]);

    const langStore = i18n.language;

    return (
        <div className="tw-h-full tw-w-full">
            {
                simple ? (
                        <FullCalendar
                            buttonText={{ today: t('Today'), dayGridMonth: t('Month'), timeGridWeek: t('Week'), timeGridDay: t('Day') }}
                            datesSet={(e) => { setViewDate(e.view.currentStart) }}
                            eventClick={eventClick}
                            eventContent={(e) =>  content(e)}
                            events={events}
                            headerToolbar={{ center: 'title', left: 'prev', right: 'next' }}
                            initialDate={new Date()}
                            initialView='dayGridMonth'
                            locale={langStore}  
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        />

                ) :
                    (
                        <FullCalendar
                            buttonText={{ today: t('Today'), dayGridMonth: t('Month'), timeGridWeek: t('Week'), timeGridDay: t('Day') }}
                            datesSet={(e) => { setViewDate(e.view.currentStart) }}
                            dayHeaderFormat={{ weekday: 'long' }}
                            dayMaxEvents
                            eventClick={eventClick}
                            events={events}
                            headerToolbar={{ center: 'title', left: 'prev,next today', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                            initialDate={new Date()}
                            initialView='dayGridMonth'
                            locale={langStore}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            selectable
                        />

                    )
            }
            <Dialog
                closable
                contentStyle={{
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderRadius: '0',
                }}
                header={moment(clickedEvent?.start).format("DD, MMMM YYYY")}
                headerStyle={{ paddingLeft: '32px' }}
                modal
                onHide={() => { setEventDialog(false) }}
                style={{ maxWidth: '700px', minWidth: '500px' }}
                visible={Boolean(eventDialog && clickedEvent)}
            >
                {
                    eventDetail ? (
                        <div className='tw-flex tw-flex-col tw-space-y-6 tw-p-4'>
                            <div>
                                <h4>{t('Topic')}</h4>
                                <p>{eventDetail?.topic}</p>
                            </div>
                            <div>
                                <h4>{t("Description")}</h4>
                                <p>{eventDetail?.purpose}</p>
                            </div>
                            <div className='flex tw-justify-between tw-px-[2%]'>
                                <div>
                                    <h4>{t("Start")}</h4>
                                    <p><i className='pi pi-clock' /> {moment(eventDetail?.startAt).format("DD MMMM YYYY hh:mm")}</p>
                                </div>
                                <div>
                                    <h4>{t('End')}</h4>
                                    <p><i className='pi pi-clock' /> {moment(eventDetail?.endAt).format("DD MMMM YYYY hh:mm")}</p>
                                </div>
                            </div>
                            {eventDetail?.isOnline ? (
                                <div>
                                    <h4 className='tw-mb-2'> {t('Link Meeting')} </h4>
                                    <p className='tw-border tw-h-[40px] tw-flex tw-items-center tw-border-radius-sm'>
                                        <div className='tw-flex tw-justify-center tw-items-center tw-h-full tw-w-10 tw-bg-pink-400 tw-mr-2'>
                                            <span className='pi pi-desktop' style={{ fontSize: '20px', verticalAlign: 'middle', color: 'white' }} />
                                        </div>
                                        {eventDetail?.linkUrl ?? "-"}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h4 className='tw-mb-2'> {t('Location')} </h4>
                                    <p className='tw-border tw-h-[40px] tw-flex tw-items-center tw-border-radius-sm'>
                                        <div className='tw-flex tw-justify-center tw-items-center tw-h-full tw-w-10 tw-bg-orange-400 tw-mr-2'>
                                            <span className='pi pi-map-marker' style={{ fontSize: '20px', verticalAlign: 'middle', color: 'white' }} />
                                        </div>
                                        {eventDetail?.address ?? "-"}
                                    </p>
                                </div>
                            )
                            }
                        </div>
                    ) : (
                        <div className='tw-flex tw-items-center'>
                            <ProgressSpinner
                                strokeWidth="8"
                                style={{ height: '50px', marginLeft: 'auto', width: '50px' }}
                            />
                        </div>
                    )
                }
            </Dialog>
        </div>
    );
};