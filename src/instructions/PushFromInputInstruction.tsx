import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function PushFromInputInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "i";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      inputQueue,
      inputIndex,
      stackSizes,
      stackStack,
    } = state;

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const nextInput = inputQueue[inputIndex] ?? -1;
    const dIndex = inputQueue[inputIndex] === undefined ? 0 : 1;

    return moveCursorStandard({
      ...state,
      inputIndex: inputIndex + dIndex,
      stackSizes: [...sizes, size + 1],
      stackStack: [...stackStack, nextInput],
    });
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

export default PushFromInputInstruction;