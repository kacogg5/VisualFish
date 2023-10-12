import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import Icon from "../assets/right.png";

function RightInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = ">";
  const instructionFunction = useCallback((state) => {
    const { x: cursorX, y: cursorY } = state.cursorPosition;
    return {
      ...state,
      cursorDirection: "right",
      cursorPosition: {
        x: (state.width + cursorX + 1) % state.width,
        y: cursorY,
      },
    };
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      color="green"
      fontSize={fontSize}
      imgUrl={Icon}
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

export default RightInstruction;