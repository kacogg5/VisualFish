import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function JumpInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = ".";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      stackSizes,
      stackStack,
      width,
      height,
    } = state;
    if (stackSizes.slice(-1)[0] < 2) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = [...stackStack];
    const jumpY = stack.pop() ?? 0;
    const jumpX = stack.pop() ?? 0;

    if (jumpX < 0 || jumpX >= width ||
        jumpY < 0 || jumpY >= height) {
      return flagError(state);
    }

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size - 2],
      stackStack: stack,
      cursorPosition: { x: jumpX, y: jumpY },
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

export default JumpInstruction;