import {Tooltip} from "primereact/tooltip";
import {classNames} from "primereact/utils";
import type {ReactElement} from "react";
import React, {useRef, useState} from "react";

interface BlockViewerProps {
  header: string;
  code: string;
  new?: boolean;
  free?: boolean;
  containerClassName?: string;
  previewStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export default function BlockViewer(props: BlockViewerProps): ReactElement {
  const [blockView, setBlockView] = useState("PREVIEW");
  const actionCopyRef = useRef<HTMLAnchorElement>(null);

  const copyCode = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ): Promise<void> => {
    await navigator.clipboard.writeText(props.code);
    event.preventDefault();
  };

  return (
    <div className="block-section">
      <div className="block-header">
        <span className="block-title">
          <span>{props.header}</span>
          {props.new ? <span className="badge-new">New</span> : null}
          {props.free ? <span className="badge-free">Free</span> : null}
        </span>
        <div className="block-actions">
          <a
            className={classNames("p-link", {
              "block-action-active": blockView === "PREVIEW",
            })}
            onClick={() => {
              setBlockView("PREVIEW");
            }}
          >
            <span>Preview</span>
          </a>
          <a
            className={classNames("p-link", {
              "block-action-active": blockView === "CODE",
            })}
            onClick={() => {
              setBlockView("CODE");
            }}
          >
            <span>Code</span>
          </a>
          <a
            className="block-action-copy"
            onClick={(e) => {
              void copyCode(e);
            }}
            ref={actionCopyRef}
          >
            <i className="pi pi-copy m-0" />
          </a>
          <Tooltip
            content="Copied to clipboard"
            event="focus"
            position="bottom"
            target={actionCopyRef.current as HTMLElement}
          />
        </div>
      </div>
      <div className="block-content">
        {blockView === "PREVIEW" && (
          <div className={props.containerClassName} style={props.previewStyle}>
            {props.children}
          </div>
        )}

        {blockView === "CODE" && (
          <pre className="app-code">
            <code>{props.code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
