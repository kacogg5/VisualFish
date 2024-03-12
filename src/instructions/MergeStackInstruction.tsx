import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function MergeStackInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "]";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      registerStack,
      stackCount,
      stackSizes,
    } = state;
    if (stackCount < 2) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const sizeA = sizes.pop() ?? 0;
    const sizeB = sizes.pop() ?? 0;

    const registers = [...registerStack];
    registers.pop();

    return moveCursorStandard({
      ...state,
      registerStack: registers,
      stackCount: stackCount - 1,
      stackSizes: [...sizes, sizeA + sizeB],
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

export default MergeStackInstruction;