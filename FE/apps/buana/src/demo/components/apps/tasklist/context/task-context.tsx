import type {ReactElement} from "react";
import React, {useState, useEffect, createContext} from "react";
import type {Demo, TaskContextProps} from "@/types/types";

export const TaskContext = createContext({} as TaskContextProps);

interface TaskProviderProps {
  children: React.ReactNode;
}

interface DemoTasks {
  data: Demo.Task[];
}

interface DemoMembers {
  data: Demo.Member[];
}

export function TaskProvider(props: TaskProviderProps): ReactElement {
  const [tasks, setTasks] = useState<Demo.Task[]>([]);
  const [members, setMembers] = useState<Demo.Member[]>([]);
  const [selectedTask, setSelectedTask] = useState<Demo.Task | null>(null);
  const [dialogConfig, setDialogConfig] = useState<Demo.DialogConfig>({
    visible: false,
    header: "",
    newTask: false,
  });

  const getTasks = (): Promise<Demo.Task[]> => {
    return fetch("/demo/data/tasks.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: DemoTasks) => d.data);
  };

  const getMembers = (): Promise<Demo.Member[]> => {
    return fetch("/demo/data/members.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: DemoMembers) => d.data);
  };

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch(() => ({}));
    getMembers()
      .then((data) => {
        setMembers(data);
      })
      .catch(() => ({}));
  }, []);

  const addTask = (task: Demo.Task): void => {
    const _task: Demo.Task = {...task};
    _task.attachments = Math.floor(Math.random() * 10).toString();
    _task.comments = Math.floor(Math.random() * 10).toString();
    setTasks((prevState) => [...prevState, _task]);
  };

  const editTask = (task: Demo.Task): void => {
    const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(_tasks);
  };

  const removeTask = (id: number): void => {
    const _tasks = tasks.filter((t) => t.id !== id);
    setTasks(_tasks);
  };

  const onTaskSelect = (task: Demo.Task): void => {
    setSelectedTask(task);
  };

  const markAsCompleted = (task: Demo.Task): void => {
    const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(_tasks);
  };

  const showDialog = (header: string, newTask: boolean): void => {
    setDialogConfig({
      visible: true,
      header,
      newTask,
    });
  };

  const closeDialog = (): void => {
    setDialogConfig((prevState) => ({...prevState, visible: false}));
  };

  const value = {
    dialogConfig,
    selectedTask,
    tasks,
    members,
    setTasks,
    setMembers,
    setDialogConfig,
    setSelectedTask,
    getTasks,
    getMembers,
    addTask,
    editTask,
    removeTask,
    onTaskSelect,
    showDialog,
    closeDialog,
    markAsCompleted,
  };

  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
}
