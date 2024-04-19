import React, { useCallback, useEffect, useMemo } from "react";
import { endSelectionAction, moveMouseAction, registerInstructionAction, startSelectionAction } from "../reducer/editorReducer";
import { IBaseInstructionProps } from "../types/IBaseInstructionProps";
import EditorState from "../types/EditorState";

export function moveCursorStandard(state: EditorState, direction?: string | undefined) {
  const {
    tempWidth,
    tempHeight,
    cursorPosition,
    cursorDirection,
  } = state;
  direction = direction ?? cursorDirection;

  const directions: Record<string, { dx: number, dy: number }> = {
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
  };

  const { dx, dy } = directions[direction];
  return {
    ...state,
    cursorDirection: direction,
    cursorPosition: {
      x: (tempWidth + cursorPosition.x + dx) % tempWidth,
      y: (tempHeight + cursorPosition.y + dy) % tempHeight,
    },
  };
}

function BaseInstruction({
  /* Instruction Traits */
  instruction,
  instructionFunction,
  color = undefined,
  fontSize,
  imgUrl,
  isRaw,
  /* Per-Instance Parameters */
  x,
  y,
  /* State-Related Parameters */
  editorState,
  editorDispatch,
}: IBaseInstructionProps) {
  const {
    selectionStart,
    selectionEnd,
    cursorPosition,
  } = editorState;

  const hasCursor = useMemo(
    () => cursorPosition.x === x && cursorPosition.y === y,
    [cursorPosition],
  );
  color = color ?? "#606068";

  const borders = useMemo(() => {
    if (!selectionStart || !selectionEnd) {
      return ({ left: "none", right: "none", top: "none", bottom: "none" });
    }
    const borderColor = "#ffef78";
    const withinY = selectionStart.y <= y && y <= selectionEnd.y;
    const withinX = selectionStart.x <= x && x <= selectionEnd.x;
    return ({
      left: (withinY && selectionStart.x === x) ? `1px solid ${borderColor}` : "none",
      right: (withinY && selectionEnd.x === x) ? `1px solid ${borderColor}` : "none",
      top: (withinX && selectionStart.y === y) ? `1px solid ${borderColor}` : "none",
      bottom: (withinX && selectionEnd.y === y) ? `1px solid ${borderColor}` : "none",
    });
  }, [selectionStart, selectionEnd]);

  const rawInstruction = useMemo(() => {
    return (
      <div style={{
        fontSize,
        backgroundColor: color,
        fontFamily: "monospace",
      }}>
        {instruction === "\t" || instruction === " " ? <>&nbsp;</> : instruction}
      </div>
    )
  }, [instruction, color]);

  const onMouseDown = useCallback(() => {
    editorDispatch(startSelectionAction({ x, y }));
  }, [editorDispatch, x, y]);

  const onMouseMove = useCallback(() => {
    editorDispatch(moveMouseAction({ x, y }));
  }, []);

  const onMouseUp = useCallback(() => {
    editorDispatch(endSelectionAction({ x, y }));
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
      onMouseEnter={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        position: "relative",
        textTransform: "none",
      }}
    >
      {isRaw ? rawInstruction : (
        <div style={{
          fontSize,
          backgroundColor: color,
          backgroundImage: imgUrl,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>&nbsp;</div>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: hasCursor ? "#0000ff40" : "transparent",
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          borderLeft: borders.left,
          borderRight: borders.right,
          borderTop: borders.top,
          borderBottom: borders.bottom,
          color: "red",
          fontSize: fontSize * 0.8,
        }}
      />
    </div>
  );
}

export default BaseInstruction;