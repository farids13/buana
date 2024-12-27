import type {
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dialog} from "primereact/dialog";
import {Editor} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useRef, useState} from "react";
import type {Demo} from "@/types/types";
import {TaskContext} from "./context/task-context";

export default function CreateTask(): ReactElement {
  const [task, setTask] = useState<Demo.Task | null>(null);
  const [filteredMembers, setFilteredMembers] = useState<Demo.Member[]>([]);
  const toast = useRef<Toast | null>(null);
  const {addTask, editTask, closeDialog, dialogConfig, selectedTask, members} =
    useContext(TaskContext);

  const filterMembers = (event: AutoCompleteCompleteEvent): void => {
    const filtered: Demo.Member[] = [];
    const query = event.query;

    for (const member of members) {
      if (member.name.toLowerCase().startsWith(query.toLowerCase())) {
        filtered.push(member);
      }
    }
    setFilteredMembers(filtered);
  };

  const onMemberChange = (e: AutoCompleteChangeEvent): void => {
    setTask((prevState) => ({
      ...prevState,
      members: [...(e.value as Demo.Member[])],
    }));
  };
  const save = (): void => {
    if (!task) return;

    if (dialogConfig.newTask) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: `Task "${task.name}" created successfully.`,
      });
      addTask(task);
    } else if (
      selectedTask &&
      JSON.stringify(selectedTask) !== JSON.stringify(task)
    ) {
      toast.current?.show({
        severity: "success",
        summary: "Edited",
        detail: `Task "${selectedTask.name}" edited successfully.`,
      });
      editTask(task);
    }
    closeDialog();
  };

  const resetTask = (): void => {
    const taskId = Math.floor(Math.random() * 1000).toString();
    setTask({
      id: parseFloat(taskId),
      name: "",
      description: "",
      status: "Waiting",
    });
  };

  const itemTemplate = (member: Demo.Member): ReactElement => {
    return (
      <div className="flex align-items-center border-round">
        <img
          alt={member.name}
          className="h-2rem w-2rem mr-2"
          src={`/demo/images/avatar/${member.image}`}
        />
        <span className="text-900 font-medium">{member.name}</span>
      </div>
    );
  };
  const selectedItemTemplate = (member: Demo.Member): ReactElement => {
    return (
      <div className="flex align-items-center">
        <img
          alt={member.name}
          className="h-2rem w-2rem mr-2"
          src={`/demo/images/avatar/${member.image}`}
        />
        <span className="text-900 font-medium">{member.name}</span>
      </div>
    );
  };

  useEffect(() => {
    resetTask();
  }, []);

  useEffect(() => {
    if (!dialogConfig.newTask) setTask(selectedTask);
    if (dialogConfig.newTask) resetTask();
  }, [dialogConfig, selectedTask]);

  return (
    <>
      <Toast key="Task Toast" ref={toast} />
      <Dialog
        className="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6"
        contentClassName="border-round-bottom border-top-1 surface-border p-0"
        dismissableMask
        header={dialogConfig.header || ""}
        modal
        onHide={closeDialog}
        visible={dialogConfig.visible}
      >
        <div className="p-4">
          <div className="grid p-fluid formgrid">
            <div className="col-12 field">
              <label className="text-900 font-semibold" htmlFor="name">
                Task Name
              </label>
              <InputText
                id="name"
                onChange={(e) => {
                  setTask((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
                placeholder="Title"
                type="text"
                value={task?.name}
              />
            </div>
            <div className="col-12 field">
              <label className="text-900 font-semibold" htmlFor="description">
                Description
              </label>
              <Editor
                onTextChange={(e) => {
                  setTask((prevState) => ({
                    ...prevState,
                    description: e.textValue,
                  }));
                }}
                style={{height: "150px"}}
                value={task?.description}
              />
            </div>
            <div className="col-6 field mt-0">
              <label className="text-900 font-semibold" htmlFor="start">
                Start Date
              </label>
              {/* <Calendar
                dateFormat="yy-mm-dd"
                inputId="start"
                onChange={(e) => {
                  setTask((prevState) => ({
                    ...prevState,
                    startDate: e.value as string,
                  }));
                }}
                placeholder="Start Date"
                showTime={false}
                value={task?.startDate}
              /> */}
            </div>
            <div className="col-6 field mt-0">
              <label className="text-900 font-semibold" htmlFor="end">
                Due Date
              </label>
              {/* <Calendar
                dateFormat="yy-mm-dd"
                inputId="end"
                onChange={(e) => {
                  setTask((prevState) => ({
                    ...prevState,
                    endDate: e.value as string,
                  }));
                }}
                placeholder="End Date"
                showTime={false}
                value={task?.endDate}
              /> */}
            </div>
            <div className="col-12 field">
              <label className="text-900 font-semibold" htmlFor="members">
                Add Team Member
              </label>
              <AutoComplete
                aria-label="Members"
                completeMethod={filterMembers}
                dropdownAriaLabel="Members"
                field="name"
                id="autocomplete"
                inputId="members"
                inputStyle={{height: "2.5rem"}}
                itemTemplate={itemTemplate}
                multiple
                onChange={onMemberChange}
                placeholder="Choose team members"
                selectedItemTemplate={selectedItemTemplate}
                suggestions={filteredMembers}
                value={task?.members}
              />
            </div>
            <div className="col-12 flex justify-content-end mt-4">
              <Button
                className="w-8rem mr-3"
                icon="pi pi-times"
                label="Cancel"
                onClick={closeDialog}
                outlined
              />
              <Button
                className="w-8rem"
                icon="pi pi-check"
                label="Save"
                onClick={() => {
                  save();
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
