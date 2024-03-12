import React, { useCallback, useMemo, useState } from "react";
import BaseInstruction from "../instructions/BaseInstruction";
import instructionMap from "../instructions/instructionMap";
import {
  backspaceAction,
  copySelectionAction,
  escapeSelectionAction,
  expandSelectionAction,
  flagError,
  insertInstructionAction,
  pasteCodeAction,
  shiftSelectionAction,
} from "../reducer/editorReducer";
import EditorState from "../types/EditorState";
import { IInstructionProps } from "../types/IInstructionProps";

function EditorRow({
  line,
  y,
  editorState,
  editorDispatch,
  isRaw,
}: {
  line: string,
  y: number,
  editorState: EditorState,
  editorDispatch: any,
  isRaw: boolean,
}) {

  const {
    fontSize,
    tempWidth,
    tempHeight,
    selectionEnd,
  } = editorState;
  const paddedLine = line
    .padEnd(tempWidth)
    .padEnd(Math.max(
      tempWidth + 5,
      (selectionEnd?.x ?? 0) + 3,
    ), "\t");

  const lineMemo = useMemo(() => (
    [...paddedLine].map((instruction, x) => {
      for (let { x: tx, y: ty, tempInstruction } of editorState.tempInstructions) {
        if (tx === x && ty === y) {
          instruction = tempInstruction;
        }
      }
      const Instruction: (props: IInstructionProps & { key: string }) => JSX.Element
          = instructionMap[instruction];

      return (x >= tempWidth || y >= tempHeight || Instruction === undefined) ? (
        <BaseInstruction
          key={`${x}-${y}`+instruction}
          instruction={x >= tempWidth || y >= tempHeight ? "\t" : instruction}
          instructionFunction={flagError}
          color={x >= tempWidth || y >= tempHeight ? "transparent": "#606068"}
          fontSize={fontSize}
          imgUrl=""
          isRaw={isRaw}
          x={x}
          y={y}
          editorState={editorState}
          editorDispatch={editorDispatch}
        />
      ) : (
        <Instruction
          key={`${x}-${y}`+instruction}
          x={x}
          y={y}
          isRaw={isRaw}
          editorState={editorState}
          editorDispatch={editorDispatch}
        />
      );
    })
  ), [fontSize, isRaw, editorState.fish, editorState.selectionEnd, editorState.selectionStart,
    editorState.cursorPosition, editorState.tempInstructions, paddedLine, tempHeight, tempWidth]);
  
  return (
    <div
      key={`r${y}`}
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {lineMemo}
    </div>
  );
}

// <>< | Fish
function Editor({
  isRaw,
  editorState,
  editorDispatch,
}: {
  isRaw: boolean,
  editorState: EditorState,
  editorDispatch: any,
}) {
  // console.log(editorState);
  const {
    fish,
    tempWidth,
    tempHeight,
    fontSize,
    selectionEnd,
  } = editorState;

  const [keysPressed, setKeysPressed] = useState<Record<string, boolean | undefined>>({});
  const onKeyDown = useCallback(async (e: React.KeyboardEvent) => {
    e.preventDefault();
    // console.log(e.key);
    switch (e.key) {
      case "Alt":
      case "Control":
      case "Shift": {
        setKeysPressed({
          ...keysPressed,
          [e.key]: true,
        });
        break;
      }
      case "ArrowDown": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action("down"));

        break;
      }
      case "ArrowLeft": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action("left"));

        break;
      }
      case "ArrowRight": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action("right"));

        break;
      }
      case "ArrowUp": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action("up"));

        break;
      }
      case "Backspace":
      case "Delete":
      case "Space": {
        editorDispatch(backspaceAction(e.key === "Backspace"));
        break;
      }
      case "Escape": {
        editorDispatch(escapeSelectionAction());
        break;
      }
      case "C":
      case "c": {
        if (keysPressed["Control"]) {
          editorDispatch(copySelectionAction());
          break;
        }

        editorDispatch(insertInstructionAction({
          instruction: e.key,
        }));
        break;
      }
      case "V":
      case "v": {
        if (keysPressed["Control"]) {
          const content = await window.navigator.clipboard.readText();
          editorDispatch(pasteCodeAction(content));
          break;
        }

        editorDispatch(insertInstructionAction({
          instruction: e.key,
        }));
        break;
      }
      default:
        editorDispatch(insertInstructionAction({
          instruction: e.key,
        }));
        break;
    }
  }, [editorDispatch, keysPressed]);

  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Alt":
      case "Control":
      case "Shift": {
        setKeysPressed({
          ...keysPressed,
          [e.key]: false,
        });
        break;
      }
      default:
        break;
    }
  }, [keysPressed]);

  const effectiveFish = useMemo(() => {
    let localFish = [...fish];
    
    for (let i = localFish.length; i < tempHeight; i++) {
      localFish.push("");
    }

    return localFish;
  }, [fish, tempHeight, tempWidth]);

  const columnMarkers = useMemo(() => {
    let markers = [];
    for (let i = 0; i < tempWidth; i++) {
      markers.push((i + 1) % 5 === 0 ? <>|</> : <>&nbsp;</>);
    }
    return (<div>{markers}</div>);
  }, [tempWidth]);

  const rowMarkers = useMemo(() => {
    let markers = [];
    for (let i = 0; i < tempHeight; i++) {
      markers.push((i + 1) % 5 === 0 ? <>-<br/></> : <br/>);
    }
    return (<div>{markers}</div>);
  }, [tempHeight]);

  const editorMemo = useMemo(() => (
    [
      ...effectiveFish,
      ...new Array(Math.max(5, (selectionEnd?.y ?? 0) - tempHeight + 3))
        .fill("\t".repeat(tempWidth)),
    ].map((line, y) => (
      <EditorRow
        key={`r${y}`}
        line={line}
        y={y}
        editorState={editorState}
        editorDispatch={editorDispatch}
        isRaw={isRaw}
      />
    ))
  ), [effectiveFish, selectionEnd?.y, tempHeight, tempWidth, isRaw]);

  return (
    <div
      id="editor"
      style={{
        display: "grid",
        flexDirection: "row",
        fontFamily: "monospace",
        fontSize,
        userSelect: "none",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "auto 1fr",
        textTransform: "unset",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div style={{ color: "#ffef78", background: "#181820" }}>#</div>
      <div style={{ color: "#ffef78", background: "#181820" }}>{columnMarkers}</div>
      <div style={{ color: "#ffef78", background: "#181820", display: "grid", gridAutoRows: "1fr" }}>{rowMarkers}</div>
      <div className="editor-container">
        <div
          tabIndex={-1}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          style={{
            outline: "none",
            background: "#404048",
            width: "min-content",
            marginBottom: "1em",
          }}
        >
          {editorMemo}
        </div>
      </div>
    </div>
  );
}

export default Editor;