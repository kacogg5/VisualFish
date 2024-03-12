import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function NumberLiteralInstruction({
  instruction,
}: {
  instruction: string,
}) {
  return ({
    x,
    y,
    isRaw,
    editorState,
    editorDispatch,
  }: IInstructionProps) => (
    <BaseNumberLiteralInstruction
      instruction={instruction}
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function BaseNumberLiteralInstruction({
  instruction,
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps & {
  instruction: string,
}) {
  const {
    fontSize,
  } = editorState;

  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const value = Number.parseInt(instruction, 16);

    const sizes = [...state.stackSizes];
    const size = sizes.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size + 1],
      stackStack: [...state.stackStack, value],
    });
  }, [instruction]);

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

export const NumberLiteralInstructionMap =
  [...new Array(16).keys()].reduce((m, value) => ({
    ...m,
    [value.toString(16)]: NumberLiteralInstruction({
      instruction: value.toString(16),
    }),
  }), {});