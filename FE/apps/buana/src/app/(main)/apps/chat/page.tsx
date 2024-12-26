"use client";
import type {ReactElement} from "react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {OverlayPanel} from "primereact/overlaypanel";
import {classNames} from "primereact/utils";
import {nanoid} from "nanoid";
import UserCard from "@/src/demo/components/apps/chat/user-card";
import type {Demo} from "@/types/types";
import {ChatContext} from "@/src/demo/components/apps/chat/context/chat-context";

function ChatSidebar(): ReactElement {
  const [filteredUsers, setFilteredUsers] = useState<Demo.User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const {getChatData, users, setUsers} = useContext(ChatContext);

  const filter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filtered: Demo.User[] = [];
    setSearchValue(e.target.value);
    for (const user of users) {
      if (user.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
        filtered.push(user);
      }
    }

    if (e.target.value === "") {
      setFilteredUsers(users);
    } else setFilteredUsers([...filtered]);
  };

  useEffect(() => {
    getChatData()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() => ({}));
  }, [getChatData, setUsers]);

  return (
    <>
      <div className="flex flex-column align-items-center border-bottom-1 surface-border p-6">
        <img
          alt="Asiya Javayant"
          className="w-6rem h-6rem border-circle shadow-4"
          src="/demo/images/avatar/circle/avatar-f-1@2x.png"
        />
        <span className="text-900 text-xl font-semibold mt-4">
          Asiya Javayant
        </span>
      </div>
      <div className="w-full flex row-gap-4 flex-column surface-border p-4">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText
            className="w-full"
            id="search"
            onChange={filter}
            placeholder="Search"
            type="text"
            value={searchValue}
          />
        </span>
        {filteredUsers.length > 0 ? (
          <div className="flex flex-row gap-4 md:flex-column overflow-auto">
            {filteredUsers.map((user) => {
              return <UserCard key={nanoid()} user={user} />;
            })}
          </div>
        ) : (
          <span>No User Found.</span>
        )}
      </div>
    </>
  );
}

interface ChatBoxProps {
  user: Demo.User;
}

function ChatBox(props: ChatBoxProps): ReactElement {
  const [textContent, setTextContent] = useState("");
  const {sendMessage, users} = useContext(ChatContext);
  const op = useRef<OverlayPanel>(null);
  const chatWindow = useRef<HTMLDivElement>(null);
  const user = props.user;
  const defaultUserId = 123;
  //prettier-ignore
  const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
        '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
        '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
    ];

  const _sendMessage = (): void => {
    if (!(textContent === "" || textContent === " ")) {
      const message = {
        text: textContent,
        ownerId: 123,
        createdAt: new Date().getTime(),
      };

      sendMessage(message);
      setTextContent("");
    }
  };

  const handleInputTextKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") _sendMessage();
  };

  const onEmojiSelect = (emoji: string): void => {
    setTextContent((prevState: string) => prevState + emoji);
  };

  const parseDate = (timestamp: number): string => {
    return new Date(timestamp).toTimeString().split(":").slice(0, 2).join(":");
  };

  useEffect(() => {
    if (chatWindow.current) {
      chatWindow.current.addEventListener("DOMNodeInserted", (event) => {
        const target = event.currentTarget as HTMLDivElement | null;
        if (target) {
          target.scroll({top: target.scrollHeight});
        }
      });
    }
  }, [users]);

  return (
    <>
      <div className="flex flex-column h-full">
        <div className="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
          <div className="relative flex align-items-center mr-3">
            <img
              alt={props.user.name}
              className="w-4rem h-4rem border-circle shadow-4"
              src={`/demo/images/avatar/${props.user.image}`}
            />
            <span
              className={classNames(
                "w-1rem h-1rem border-circle border-2 surface-border absolute bottom-0 right-0",
                {
                  "bg-green-400": props.user.status === "active",
                  "bg-red-400": props.user.status === "busy",
                  "bg-yellow-400": props.user.status === "away",
                }
              )}
            />
          </div>
          <div className="mr-2">
            <span className="text-900 font-semibold block">
              {props.user.name}
            </span>
            <span className="text-700">Last active 1 hour ago</span>
          </div>
          <div className="flex align-items-center ml-auto">
            <Button
              className="mr-3"
              icon="pi pi-phone"
              outlined
              rounded
              severity="secondary"
              type="button"
            />
            <Button
              icon="pi pi-ellipsis-v"
              outlined
              rounded
              severity="secondary"
              type="button"
            />
          </div>
        </div>
        <div
          className="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto"
          ref={chatWindow}
          style={{maxHeight: "53vh"}}
        >
          {props.user.messages.map((message) => {
            return (
              <div key={nanoid()}>
                {message.ownerId === defaultUserId ? (
                  <div className="grid grid-nogutter mb-4">
                    <div className="col mt-3 text-right">
                      <span
                        className="inline-block text-left font-medium border-1 surface-border bg-primary-100 text-primary-900 p-3 white-space-normal border-round"
                        style={{wordBreak: "break-word", maxWidth: "80%"}}
                      >
                        {message.text}
                      </span>
                      <p className="text-700 mt-3">
                        {parseDate(message.createdAt)}{" "}
                        <i className="pi pi-check ml-2 text-green-400" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-nogutter mb-4">
                    <div className="mr-3 mt-1">
                      <img
                        alt={user.name}
                        className="w-3rem h-3rem border-circle shadow-4"
                        src={`/demo/images/avatar/${user.image}`}
                      />
                    </div>
                    <div className="col mt-3">
                      <p className="text-900 font-semibold mb-3">{user.name}</p>
                      <span
                        className="text-700 inline-block font-medium border-1 surface-border p-3 white-space-normal border-round"
                        style={{wordBreak: "break-word", maxWidth: "80%"}}
                      >
                        {message.text}
                      </span>
                      <p className="text-700 mt-3">
                        {parseDate(message.createdAt)}
                        <i className="pi pi-check ml-2 text-green-400" />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="p-3 md:p-4 lg:p-6 flex flex-column sm:flex-row align-items-center mt-auto border-top-1 surface-border gap-3">
          <InputText
            className="flex-1 w-full sm:w-auto border-round"
            id="message"
            onChange={(e) => {
              setTextContent(e.target.value);
            }}
            onKeyDown={handleInputTextKeyDown}
            placeholder="Type a message"
            type="text"
            value={textContent}
          />
          <div className="flex w-full sm:w-auto gap-3">
            <Button
              className="w-full sm:w-auto justify-content-center text-xl"
              onClick={(event) => op.current?.toggle(event)}
              security="secondary"
            >
              😀
            </Button>
            <Button
              className="w-full sm:w-auto"
              icon="pi pi-send"
              label="Send"
              onClick={() => {
                _sendMessage();
              }}
            />
          </div>
        </div>
      </div>

      <OverlayPanel className="w-full sm:w-30rem" ref={op}>
        {emojis.map((emoji) => {
          return (
            <Button
              className="p-2 text-2xl"
              key={nanoid()}
              label={emoji}
              onClick={() => {
                op.current?.hide();
                onEmojiSelect(emoji);
              }}
              text
              type="button"
            />
          );
        })}
      </OverlayPanel>
    </>
  );
}

export default function Chat(): ReactElement {
  const {activeUser} = useContext(ChatContext);
  return (
    <div
      className="flex flex-column md:flex-row gap-5"
      style={{minHeight: "81vh"}}
    >
      <div className="md:w-25rem card p-0">
        <ChatSidebar />
      </div>
      <div className="flex-1 card p-0">
        <ChatBox user={activeUser} />
      </div>
    </div>
  );
}
