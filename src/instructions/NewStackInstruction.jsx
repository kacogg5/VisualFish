import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function NewStackInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "[";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      registerStack,
      stackCount,
      stackSizes,
      stackStack,
      width,
      height,
    } = state;
    if (stackSizes.slice(-1) < 1) {
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
    const newStackSize = stack.pop();
    if (newStackSize >= size) {
      return flagError(state);
    }

    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      registerStack: [...registerStack, false],
      stackCount: stackCount + 1,
      stackSizes: [...sizes, size - newStackSize - 1, newStackSize],
      stackStack: stack,
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

export default NewStackInstruction;