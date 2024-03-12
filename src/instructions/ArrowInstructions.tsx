import React, { useCallback } from "react";
import EditorState from "../types/EditorState";
import UpIcon from "../assets/up.png";
import { IInstructionProps } from "../types/IInstructionProps";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";

function ArrowInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
  instruction,
  direction,
  imgUrl,
}: IInstructionProps & {
  instruction: string,
  direction: "up" | "down" | "left" | "right",
  imgUrl: string,
}) {
  const {
    fontSize,
  } = editorState;

  const instructionFunction = useCallback((state: EditorState) => {
    clearInterval(state.intervalId);
    return moveCursorStandard({
      ...state,
      cursorDirection: direction,
    }, direction);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      color="green"
      fontSize={fontSize}
      imgUrl={imgUrl}
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

export function UpInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  return (
    <ArrowInstruction
      instruction="^"
      direction="up"
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
      imgUrl={UpIcon}
    />
  );
}

export function DownInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  return (
    <ArrowInstruction
      instruction="v"
      direction="down"
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
      imgUrl={UpIcon}
    />
  );
}

export function LeftInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  return (
    <ArrowInstruction
      instruction="<"
      direction="left"
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
      imgUrl={UpIcon}
    />
  );
}

export function RightInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  return (
    <ArrowInstruction
      instruction=">"
      direction="right"
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
      imgUrl={UpIcon}
    />
  );
}