import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function NewStackInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}:IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "[";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      registerStack,
      stackCount,
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }


    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = [...stackStack];
    const newStackSize = stack.pop() ?? 0;
    if (newStackSize >= size) {
      return flagError(state);
    }

    return moveCursorStandard({
      ...state,
      registerStack: [...registerStack, false] as Array<number | false>,
      stackCount: stackCount + 1,
      stackSizes: [...sizes, size - newStackSize - 1, newStackSize],
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

export default NewStackInstruction;