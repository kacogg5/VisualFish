import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { flagError } from "../reducer/editorReducer";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function PushFromCodeboxInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "g";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      fish,
      height,
      stackSizes,
      stackStack,
      tempInstructions,
    } = state;

    if (stackSizes.slice(-1)[0] < 2) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = [...stackStack];
    const y = stack.pop() ?? 0;
    const x = stack.pop() ?? 0;

    let value;
    if (
      (y < 0 || height <= y ) ||
      (x < 0 || fish[y].length <= x)
    ) {
      value = 0;
    } else {
      value = fish[y].charCodeAt(x);
    }

    for (let i = 0; i < tempInstructions.length; i++) {
      const {
        x: tX, y: tY, tempInstruction,
      } = tempInstructions[i];
      if (y === tY && x === tX) {
        value = tempInstruction.charCodeAt(0);
      }
    }

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size - 1],
      stackStack: [...stack, value],
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

export default PushFromCodeboxInstruction;