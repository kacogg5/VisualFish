import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function PushStackLengthInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "l";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
    } = state;

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size + 1],
      stackStack: [...stackStack, size],
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

export default PushStackLengthInstruction;