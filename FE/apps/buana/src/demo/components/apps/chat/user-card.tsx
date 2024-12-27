import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useState} from "react";
import type {Demo} from "@/types/types";
import {ChatContext} from "./context/chat-context";

interface UserCardProps {
  user: Demo.User;
}

export default function UserCard(props: UserCardProps): ReactElement {
  const [lastMessage, setLastMessage] = useState<Demo.Message | null>(null);

  const {changeActiveChat} = useContext(ChatContext);

  const changeView = (user: Demo.User): void => {
    changeActiveChat(user);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") changeView(props.user);
  };

  useEffect(() => {
    const filtered = props.user.messages.filter((m) => m.ownerId !== 123);
    setLastMessage(filtered[filtered.length - 1]);
  }, [props.user.messages]);

  return (
    <div
      className="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none
hover:surface-hover transition-colors transition-duration-150"
      onClick={() => {
        changeView(props.user);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="flex align-items-center">
        <div className="relative md:mr-3">
          <img
            alt="props.user"
            className="w-3rem h-3rem border-circle shadow-4"
            src={`/demo/images/avatar/${props.user.image}`}
          />
          <span
            className={classNames(
              "w-1rem h-1rem border-circle border-2 surface-border absolute",
              {
                "bg-green-400": props.user.status === "active",
                "bg-red-400": props.user.status === "busy",
                "bg-yellow-400": "away",
              }
            )}
            style={{bottom: "2px", right: "2px"}}
          />
        </div>
        <div className="flex-column hidden md:flex">
          <span className="text-900 font-semibold block">
            {props.user.name}
          </span>
          <span className="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">
            {lastMessage?.text}
          </span>
        </div>
      </div>
      <span className="text-700 font-semibold ml-auto hidden md:inline">
        {props.user.lastSeen}
      </span>
    </div>
  );
}
