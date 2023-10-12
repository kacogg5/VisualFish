import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import Icon from "../assets/up.png";

function UpInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "^";
  const instructionFunction = useCallback((state) => {
    const { x: cursorX, y: cursorY } = state.cursorPosition;
    return {
      ...state,
      cursorDirection: "up",
      cursorPosition: {
        x: cursorX,
        y: (state.height + cursorY - 1) % state.height,
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
  )
}

export default UpInstruction;