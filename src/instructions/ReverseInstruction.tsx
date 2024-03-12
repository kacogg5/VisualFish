import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function ReverseInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "r";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 1;

    const stack = [...stackStack];
    const topStack = stack.slice(-size).reverse();
    stack.splice(-size, size, ...topStack);

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size],
      stackStack: stack,
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

export default ReverseInstruction;