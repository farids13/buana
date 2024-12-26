"use client";
// fullcalendar core import
import FullCalendar from "@fullcalendar/react";
// fullcalendar plugins imports
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Button} from "primereact/button";
import {Calendar as PRCalendar} from "primereact/calendar";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";
import type {DateSelectArg, EventClickArg, DateInput} from "@fullcalendar/core";
import {EventService} from "@/src/demo/service/event-service";
import type {Demo} from "@/types/types";

export default function CalendarDemo(): ReactElement {
  const [events, setEvents] = useState<Demo.Event[]>([]);
  const [tags, setTags] = useState<Demo.Event["tag"][]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [view, setView] = useState("");
  const [changedEvent, setChangedEvent] = useState<Demo.Event>({
    title: "",
    start: "",
    end: "",
    allDay: false,
    location: "",
    borderColor: "",
    textColor: "",
    description: "",
    tag: {
      name: "Company A",
      color: "#FFB6B6",
    },
  });
  const onEventClick = (e: EventClickArg): void => {
    const {start, end} = e.event;
    const plainEvent = e.event.toPlainObject({
      collapseExtendedProps: true,
      collapseColor: true,
    });
    setView("display");
    setShowDialog(true);
    setChangedEvent((prevChangeState) => ({
      ...prevChangeState,
      ...plainEvent,
      start: start as DateInput,
      end: end ? end : (start as DateInput),
    }));
  };

  useEffect(() => {
    EventService.getEvents()
      .then((data) => {
        setEvents(data);
        const _tags: Demo.Event["tag"][] = [];
        data.forEach((event) => {
          _tags.push(event.tag);
        });
        setTags(_tags);
      })
      .catch(() => ({}));
  }, []);

  const handleSave = (): void => {
    if (validate()) {
      const _clickedEvent = {
        ...changedEvent,
        backgroundColor: changedEvent.tag?.color ?? "#fff",
        borderColor: changedEvent.tag?.color ?? "#fff",
        textColor: "#212121",
      };
      setShowDialog(false);
      if (_clickedEvent.id) {
        const _events = events.map((i) =>
          i.id?.toString() === _clickedEvent.id?.toString() ? _clickedEvent : i
        );
        setEvents(_events);
      } else {
        setEvents((prevState) => [
          ...prevState,
          {
            ..._clickedEvent,
            id: Math.floor(Math.random() * 10000).toString(),
          },
        ]);
      }
    }
  };

  const validate = (): string | 0 | undefined => {
    const {start, end, title} = changedEvent;
    return start && end && title;
  };

  const onEditClick = (): void => {
    setView("edit");
  };

  const onDateSelect = (e: DateSelectArg): void => {
    setView("new");
    setShowDialog(true);
    setChangedEvent({
      ...e,
      title: "",
      location: "",
      borderColor: "",
      textColor: "",
      description: "",
      tag: {
        name: "Company A",
        color: "#FFB6B6",
      },
    });
  };

  const selectedItemTemplate = (): ReactElement => {
    return (
      <div className="flex align-items-center">
        <div
          className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
          style={{backgroundColor: changedEvent.tag?.color || "#FFB6B6"}}
        />
        <div>{changedEvent.tag?.name || "Company A"}</div>
      </div>
    );
  };

  const itemOptionTemplate = (tag: Demo.Event["tag"]): ReactElement => {
    return (
      <div className="flex align-items-center">
        <div
          className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
          style={{backgroundColor: tag?.color}}
        />
        <div>{tag?.name}</div>
      </div>
    );
  };

  const header = function (): string | undefined {
    if (view === "display") {
      return changedEvent.title;
    }
    return view === "new" ? "New Event" : "Edit Event";
  };

  const footer = (
    <>
      {view === "display" ? (
        <Button
          icon="pi pi-pencil"
          label="Edit"
          onClick={onEditClick}
          type="button"
        />
      ) : null}
      {view === "new" || view === "edit" ? (
        <Button
          disabled={!changedEvent.start || !changedEvent.end}
          icon="pi pi-check"
          label="Save"
          onClick={handleSave}
          type="button"
        />
      ) : null}
    </>
  );

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Calendar</h5>
          <FullCalendar
            dayMaxEvents
            editable
            eventClick={onEventClick}
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={720}
            initialDate="2022-05-11"
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            select={onDateSelect}
            selectMirror
            selectable
          />

          <Dialog
            breakpoints={{"960px": "75vw", "640px": "90vw"}}
            closable
            footer={footer}
            header={header}
            headerClassName="text-900 font-semibold text-xl"
            modal
            onHide={() => {
              setShowDialog(false);
            }}
            style={{width: "36rem"}}
            visible={showDialog}
          >
            <>
              {view === "display" ? (
                <>
                  <span className="text-900 font-semibold block mb-2">
                    Description
                  </span>
                  <span className="block mb-3">{changedEvent.description}</span>

                  <div className="grid">
                    <div className="col-6">
                      <div className="text-900 font-semibold mb-2">Start</div>
                      <p className="flex align-items-center m-0">
                        <i className="pi pi-fw pi-clock text-700 mr-2" />
                        <span>
                          {changedEvent.start?.toString().slice(0, 10)}
                        </span>
                      </p>
                    </div>
                    <div className="col-6">
                      <div className="text-900 font-semibold mb-2">End</div>
                      <p className="flex align-items-center m-0">
                        <i className="pi pi-fw pi-clock text-700 mr-2" />
                        <span>{changedEvent.end?.toString().slice(0, 10)}</span>
                      </p>
                    </div>
                    <div className="col-12">
                      <div className="text-900 font-semibold mb-2">
                        Location
                      </div>
                      <p className="flex align-items-center m-0">
                        <i className="pi pi-fw pi-clock text-700 mr-2" />
                        <span>{changedEvent.location}</span>
                      </p>
                    </div>
                    <div className="col-12">
                      <div className="text-900 font-semibold mb-2">Color</div>
                      <p className="flex align-items-center m-0">
                        <span
                          className="inline-flex flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                          style={{backgroundColor: changedEvent.tag?.color}}
                        />
                        <span>{changedEvent.tag?.name}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid p-fluid formgrid">
                  <div className="col-12 md:col-6 field">
                    <label className="text-900 font-semibold" htmlFor="title">
                      Title
                    </label>
                    <span className="p-input-icon-left">
                      <i className="pi pi-pencil" />
                      <InputText
                        id="title"
                        onChange={(e) => {
                          setChangedEvent((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                          }));
                        }}
                        placeholder="Title"
                        type="text"
                        value={changedEvent.title}
                      />
                    </span>
                  </div>
                  <div className="col-12 md:col-6 field">
                    <label
                      className="text-900 font-semibold"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <span className="p-input-icon-left">
                      <i className="pi pi-map-marker" />
                      <InputText
                        id="location"
                        onChange={(e) => {
                          setChangedEvent((prevState) => ({
                            ...prevState,
                            location: e.target.value,
                          }));
                        }}
                        placeholder="Location"
                        type="text"
                        value={changedEvent.location}
                      />
                    </span>
                  </div>
                  <div className="col-12 field">
                    <label
                      className="text-900 font-semibold"
                      htmlFor="description"
                    >
                      Event Description
                    </label>
                    <InputTextarea
                      id="description"
                      onChange={(e) => {
                        setChangedEvent((prevState) => ({
                          ...prevState,
                          description: e.target.value,
                        }));
                      }}
                      rows={5}
                      style={{resize: "none"}}
                      value={changedEvent.description}
                    />
                  </div>

                  <div className="col-12 md:col-6 field">
                    <label className="text-900 font-semibold" htmlFor="start">
                      Start Date
                    </label>
                    <PRCalendar
                      id="start"
                      maxDate={changedEvent.end as Date}
                      onChange={(e) => {
                        setChangedEvent((prevState) => ({
                          ...prevState,
                          start: e.value as DateInput | undefined,
                        }));
                      }}
                      required
                      showTime
                      value={changedEvent.start as Date}
                    />
                  </div>
                  <div className="col-12 md:col-6 field">
                    <label className="text-900 font-semibold" htmlFor="end">
                      End Date
                    </label>
                    <PRCalendar
                      id="end"
                      minDate={changedEvent.start as Date}
                      onChange={(e) => {
                        setChangedEvent((prevState) => ({
                          ...prevState,
                          end: e.value as DateInput,
                        }));
                      }}
                      required
                      showTime
                      value={changedEvent.end as Date}
                    />
                  </div>
                  <div className="col-12 field">
                    <label
                      className="text-900 font-semibold"
                      htmlFor="company-color"
                    >
                      Color
                    </label>
                    <Dropdown
                      inputId="company-color"
                      itemTemplate={itemOptionTemplate}
                      onChange={(e) => {
                        setChangedEvent((prevState) => ({
                          ...prevState,
                          tag: e.value as {name: string; color: string},
                        }));
                      }}
                      optionLabel="name"
                      options={tags}
                      placeholder="Select a Tag"
                      value={changedEvent.tag}
                      valueTemplate={selectedItemTemplate}
                    />
                  </div>
                </div>
              )}
            </>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
