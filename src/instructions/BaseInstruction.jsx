import React, { useCallback, useEffect } from "react";
import { endSelectionAction, registerInstructionAction, startSelectionAction } from "../reducer/editorReducer";

function BaseInstruction({
  /* Instruction Traits */
  instruction,
  instructionFunction,
  color,
  fontSize,
  imgUrl,
  isRaw,
  /* Per-Instance Parameters */
  x,
  y,
  /* State-Related Parameters */
  editorState,
  editorDispatch,
}) {
  const {
    selectionStart,
    selectionEnd,
    cursorPosition,
  } = editorState;

  const isFocused = (selectionStart !== undefined && selectionEnd !== undefined) &&
    (selectionStart.x <= x && x <= selectionEnd.x) &&
    (selectionStart.y <= y && y <= selectionEnd.y);
  const hasCursor = cursorPosition.x === x && cursorPosition.y === y;

  const onMouseDown = useCallback(() => {
    editorDispatch(startSelectionAction({ x, y }));
  }, [editorDispatch, x, y]);

  const onMouseUp = useCallback(() => {
    editorDispatch(endSelectionAction({ x, y }))
  }, [editorDispatch, x, y]);

  useEffect(() => {
    if (editorState.functionMap[instruction] === undefined) {
      editorDispatch(registerInstructionAction({
        instruction,
        instructionFunction,
      }));
    } 
  }, [editorDispatch, editorState.functionMap, instruction, instructionFunction]);

  return (
    <div
      key={`instr${x}-${y}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        zIndex: isFocused ? 1: 0,
      }}
    >
      {isRaw ? (
        <div style={{
          fontSize,
          backgroundColor: hasCursor ? "#0000bb40" :
            instruction === "\t" ? color : "transparent",
          outline: isFocused ? "1px solid blue" : "none",
          borderTop: `1px solid ${hasCursor ? "#0000bb40" : "transparent"}`,
          borderLeft: `1px solid ${hasCursor ? "#0000bb40" : "transparent"}`,
          fontFamily: "monospace",
        }}>
          {instruction === " " || instruction === "\t" ? (<>&nbsp;</>) : instruction}
        </div>
      ) : (
        <div style={{
          fontSize,
          backgroundColor: hasCursor ? "#0000bb40" : color,
          backgroundImage: imgUrl,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderTop: `1px solid ${hasCursor ? "#0000bb40" : color}`,
          borderLeft: `1px solid ${hasCursor ? "#0000bb40" : color}`,
        }}>&nbsp;</div>
      )}
    </div>
  );
}

export default BaseInstruction;