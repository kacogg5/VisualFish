import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import StopIcon from "../assets/stop.png";

function StopInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = ";";
  const instructionFunction = useCallback((state) => {
    return {
      ...state,
      isRunning: false,
    };
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      color="red"
      fontSize={fontSize}
      imgUrl={StopIcon}
      isRaw={isRaw}
      x={x}
      y={y}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

export default StopInstruction;