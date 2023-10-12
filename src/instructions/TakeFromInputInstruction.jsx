import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";

function TakeFromInputInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "i";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      inputQueue,
      inputIndex,
      stackSizes,
      stackStack,
      width,
      height,
    } = state;

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };

    const sizes = [...stackSizes];
    const size = sizes.pop();

    const nextInput = inputQueue[inputIndex] ?? -1;
    const dIndex = inputQueue[inputIndex] === undefined ? 0 : 1;

    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      inputIndex: inputIndex + dIndex,
      stackSizes: [...sizes, size + 1],
      stackStack: [...stackStack, nextInput],
      cursorPosition: {
        x: (width + cursorPosition.x + dx) % width,
        y: (height + cursorPosition.y + dy) % height,
      },
    };
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
      color="white"
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

export default TakeFromInputInstruction;