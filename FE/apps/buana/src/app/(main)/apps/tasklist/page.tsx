"use client";
import {Button} from "primereact/button";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useState} from "react";
import {TaskContext} from "@/src/demo/components/apps/tasklist/context/task-context";
import CreateTask from "@/src/demo/components/apps/tasklist/create-task";
import TaskList from "@/src/demo/components/apps/tasklist/task-list";
import type {Demo} from "@/types/types";

export default function TaskListDemo(): ReactElement {
  const [todo, setTodo] = useState<Demo.Task[]>([]);
  const [completed, setCompleted] = useState<Demo.Task[]>([]);
  const {showDialog, tasks} = useContext(TaskContext);

  useEffect(() => {
    setTodo(tasks.filter((t) => t.completed !== true));
    setCompleted(tasks.filter((t) => t.completed));
  }, [tasks]);

  return (
    <>
      <div className="card">
        <div className="flex justify-content-between align-items-center mb-5">
          <span className="text-900 text-xl font-semibold">Task List</span>
          <Button
            className="font-semibold"
            icon="pi pi-plus"
            label="Create Task"
            onClick={() => {
              showDialog("Create Task", true);
            }}
            outlined
          />
        </div>
        <TaskList taskList={todo} title="ToDo" />
        <TaskList taskList={completed} title="Completed" />
      </div>

      <CreateTask />
    </>
  );
}
