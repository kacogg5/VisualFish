import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import EditorState from "../types/EditorState";
import { IInstructionProps } from "../types/IInstructionProps";

function mirrorFunction(
  directionMap: Record<string, string>,
  state: EditorState,
) {
  return moveCursorStandard({
    ...state,
    cursorDirection: directionMap[state.cursorDirection],
  }, directionMap[state.cursorDirection]);
}

function BackSlashMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "\\";
  const instructionFunction = useCallback((state: EditorState) => {
    return mirrorFunction({
      left: "up",
      right: "down",
      up: "left",
      down: "right",
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      fontSize={fontSize}
      imgUrl=""
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function ForwardSlashMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "/";
  const instructionFunction = useCallback((state: EditorState) => {
    return mirrorFunction({
      left: "down",
      right: "up",
      up: "right",
      down: "left",
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      fontSize={fontSize}
      imgUrl=""
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function HorizontalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "_";
  const instructionFunction = useCallback((state: EditorState) => {
    return mirrorFunction({
      left: "left",
      right: "right",
      up: "down",
      down: "up",
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      fontSize={fontSize}
      imgUrl=""
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function OmnidirectionalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "#";
  const instructionFunction = useCallback((state: EditorState) => {
    return mirrorFunction({
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      fontSize={fontSize}
      imgUrl=""
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function VerticalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "|";
  const instructionFunction = useCallback((state: EditorState) => {
    return mirrorFunction({
      left: "right",
      right: "left",
      up: "up",
      down: "down",
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      fontSize={fontSize}
      imgUrl=""
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

export {
  BackSlashMirrorInstruction,
  ForwardSlashMirrorInstruction,
  HorizontalMirrorInstruction,
  OmnidirectionalMirrorInstruction,
  VerticalMirrorInstruction,
};