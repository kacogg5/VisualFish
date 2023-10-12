import React, { useCallback, useState } from "react";
import BaseInstruction from "../instructions/BaseInstruction";
import instructionMap from "../instructions/instructionMap";
import {
  backspaceAction,
  escapeSelectionAction,
  expandSelectionAction,
  flagError,
  insertInstructionAction,
  shiftSelectionAction,
} from "../reducer/editorReducer";

function EditorRow({
  line,
  y,
  editorState,
  editorDispatch,
  isRaw,
}) {

  const {
    fontSize,
    width,
    height,
    selectionEnd,
  } = editorState;
  const paddedLine = line
    .padEnd(width)
    .padEnd(Math.max(
      width+5,
      (selectionEnd?.x ?? 0) + 3,
    ), "\t");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {
        [...paddedLine].map((instruction, x) => {
          const Instruction = instructionMap[instruction];
          return (x >= width || y >= height || Instruction === undefined) ? (
            <BaseInstruction
              key={`${x}-${y}`+instruction}
              instruction={x >= width || y >= height ? "\t" : instruction}
              instructionFunction={flagError}
              color="#eeeeee"
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
      }
    </div>
  );
}

// <>< | Fish
function Editor({
  isRaw,
  editorState,
  editorDispatch,
}) {
  // console.log(editorState);
  const {
    fish,
    width,
    height,
    fontSize,
    selectionEnd,
  } = editorState;

  const [keysPressed, setKeysPressed] = useState({});
  const onKeyDown = useCallback((e) => {
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

        editorDispatch(action({
          direction: "down",
        }));

        break;
      }
      case "ArrowLeft": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action({
          direction: "left",
        }));

        break;
      }
      case "ArrowRight": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action({
          direction: "right",
        }));

        break;
      }
      case "ArrowUp": {
        let action = shiftSelectionAction;

        if (keysPressed["Shift"]) { action = expandSelectionAction; }

        editorDispatch(action({
          direction: "up",
        }));

        break;
      }
      case "Backspace":
      case "Delete":
      case "Space": {
        editorDispatch(backspaceAction());
        break;
      }
      case "Escape": {
        editorDispatch(escapeSelectionAction());
        break;
      }
      default:
        editorDispatch(insertInstructionAction({
          instruction: e.key,
        }));
        break;
    }
  }, [editorDispatch, keysPressed]);

  const onKeyUp = useCallback((e) => {
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

  return (
    <div
      id="editor"
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
        fontSize,
        userSelect: "none",
      }}
    >
      <div>&gt;</div>
      <div
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        style={{
          border: "1px solid black",
        }}
      >
        {
          [
            ...fish,
            ...new Array(Math.max(5, (selectionEnd?.y ?? 0) - height + 3))
              .fill("\t".repeat(width)),
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
        }
      </div>
    </div>
  );
}

export default Editor;