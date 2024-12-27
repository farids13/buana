import {Avatar} from "primereact/avatar";
import {AvatarGroup} from "primereact/avatargroup";
import {Button} from "primereact/button";
import type {CheckboxChangeEvent} from "primereact/checkbox";
import {Checkbox} from "primereact/checkbox";
import {Menu} from "primereact/menu";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useContext, useRef, useState} from "react";
import {nanoid} from "nanoid";
import type {Demo} from "@/types/types";
import {TaskContext} from "./context/task-context";

interface TaskListProps {
  taskList: Demo.Task[];
  title: string;
}

export default function TaskList(props: TaskListProps): ReactElement {
  const [clickedTask, setClickedTask] = useState<Demo.Task>({});
  const {markAsCompleted, removeTask, onTaskSelect, showDialog} =
    useContext(TaskContext);
  const menu = useRef<Menu | null>(null);

  const menuItems = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        onEdit();
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        handleDelete();
      },
    },
  ];
  const onCheckboxChange = (
    event: CheckboxChangeEvent,
    task: Demo.Task
  ): void => {
    event.originalEvent?.stopPropagation();
    task.completed = event.checked;
    markAsCompleted(task);
  };

  const parseDate = (date: string): string => {
    const d = new Date(date);
    return d.toUTCString().split(" ").slice(1, 3).join(" ");
  };

  const handleDelete = (): void => {
    removeTask(clickedTask.id || -1);
  };

  const toggleMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    task: Demo.Task
  ): void => {
    setClickedTask(task);
    menu.current?.toggle(event);
  };

  const onEdit = (): void => {
    onTaskSelect(clickedTask);
    showDialog("Edit Task", false);
  };

  return (
    <div>
      <div className="text-900 font-semibold text-lg mt-5 mb-3 border-bottom-1 surface-border py-3">
        {props.title}
      </div>
      <ul className="list-none p-0 m-0">
        {props.taskList.map((task) => {
          return (
            <li
              className="flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border"
              key={nanoid()}
            >
              <div className="flex align-items-center flex-1">
                <Checkbox
                  checked={task.completed || false}
                  inputId={task.id?.toString()}
                  onChange={(event) => {
                    onCheckboxChange(event, task);
                  }}
                />
                <label
                  className={classNames(
                    "font-medium white-space-nowrap text-overflow-ellipsis overflow-hidden ml-2",
                    {
                      "line-through": task.completed,
                    }
                  )}
                  htmlFor={task.id?.toString()}
                  style={{maxWidth: "300px"}}
                >
                  {task.name}
                </label>
              </div>
              <div className="flex flex-1 gap-3 flex-column sm:flex-row sm:justify-content-between">
                <div className="flex align-items-center">
                  {task.comments ? (
                    <span className="flex align-items-center font-semibold mr-3">
                      <i className="pi pi-comment mr-2" />
                      {task.comments}
                    </span>
                  ) : null}
                  {task.attachments ? (
                    <span className="flex align-items-center font-semibold mr-3">
                      <i className="pi pi-paperclip mr-2" />
                      {task.attachments}
                    </span>
                  ) : null}
                  {task.startDate ? (
                    <span className="flex align-items-center font-semibold white-space-nowrap">
                      <i className="pi pi-clock mr-2" />
                      {parseDate(task.startDate)}
                    </span>
                  ) : null}
                </div>
                <div className="flex align-items-center sm:justify-content-end">
                  <AvatarGroup className="mr-3">
                    {task.members?.map((member) => {
                      return (
                        <Avatar
                          image={`/demo/images/avatar/${member.image}`}
                          key={nanoid()}
                          shape="circle"
                          size="large"
                        />
                      );
                    })}
                    {task.members && task.members.length > 4 ? (
                      <Avatar
                        image="/demo/images/avatar/amyelsner.png"
                        label={`+${task.members.length - 4}`}
                        shape="circle"
                        size="large"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#212121",
                          border: "2px solid var(--surface-border)",
                        }}
                      />
                    ) : null}
                  </AvatarGroup>
                  <Button
                    className="z-3 ml-auto sm:ml-0"
                    icon="pi pi-ellipsis-v"
                    onClick={(e) => {
                      toggleMenu(e, task);
                    }}
                    rounded
                    text
                    type="button"
                  />
                  <Menu className="w-8rem" model={menuItems} popup ref={menu} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
