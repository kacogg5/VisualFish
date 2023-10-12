import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function JumpInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = ".";
  const instructionFunction = useCallback((state) => {
    const {
      stackSizes,
      stackStack,
      cursorDirection,
      width,
      height,
    } = state;
    if (stackSizes.slice(-1) < 2) {
      return flagError(state);
    }

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };

    const sizes = [...stackSizes];
    const size = sizes.pop();

    const stack = [...stackStack];
    const jumpY = stack.pop();
    const jumpX = stack.pop();
    const { dx, dy } = directions[cursorDirection];

    if (jumpX < 0 || jumpX >= width ||
        jumpY < 0 || jumpY >= height) {
      return flagError(state);
    }

    return {
      ...state,
      stackSizes: [...sizes, size - 2],
      stackStack: stack,
      cursorPosition: {
        x: (width + jumpX + dx) % width,
        y: (height + jumpY + dy) % height,
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

export default JumpInstruction;