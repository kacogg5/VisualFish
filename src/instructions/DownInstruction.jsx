import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import Icon from "../assets/down.png";

function DownInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "v";
  const instructionFunction = useCallback((state) => {
    clearInterval(state.intervalId);
    const { x: cursorX, y: cursorY } = state.cursorPosition;
    return {
      ...state,
      cursorDirection: "down",
      cursorPosition: {
        x: cursorX,
        y: (state.height + cursorY + 1) % state.height,
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

export default DownInstruction;