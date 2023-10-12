import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";

function RandomDirectionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "x";
  const instructionFunction = useCallback((state) => {
    const deltas = {
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
    };

    const directions = ["down", "left", "right", "up"];
    const newDirection = directions[Math.floor(Math.random() * 4)];
    const { dx, dy } = deltas[newDirection];

    return {
      ...state,
      cursorDirection: newDirection,
      cursorPosition: {
        x: (state.width + state.cursorPosition.x + dx) % state.width,
        y: (state.height + state.cursorPosition.y + dy) % state.height,
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

export default RandomDirectionInstruction;