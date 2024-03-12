import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function RandomDirectionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "x";
  const instructionFunction = useCallback((state: EditorState) => {
    const directions = ["down", "left", "right", "up"];
    const newDirection = directions[Math.floor(Math.random() * 4)];

    return moveCursorStandard({
      ...state,
      cursorDirection: newDirection,
    }, newDirection);
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

export default RandomDirectionInstruction;