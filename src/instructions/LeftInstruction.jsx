import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import Icon from "../assets/left.png";

function LeftInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "<";
  const instructionFunction = useCallback((state) => {
    clearInterval(state.intervalId);
    const { x: cursorX, y: cursorY } = state.cursorPosition;
    return {
      ...state,
      cursorDirection: "left",
      cursorPosition: {
        x: (state.width + cursorX - 1) % state.width,
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

export default LeftInstruction;