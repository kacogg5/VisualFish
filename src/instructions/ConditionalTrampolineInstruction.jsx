import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function ConditionalTrampolineInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "?";
  const instructionFunction = useCallback((state) => {
    const {
      cursorDirection,
      cursorPosition,
      height,
      stackSizes,
      stackStack,
      width,
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
    const size = sizes.pop() - 1;

    const stack = [...stackStack];
    const conditionalValue = stack.pop();
    const { dx, dy } = directions[cursorDirection];
    const multiplier = conditionalValue !== 0 ? 1 : 2;

    return {
      ...state,
      stackSizes: [...sizes, size],
      stackStack: stack,
      cursorPosition: {
        x: (width + cursorPosition.x + dx * multiplier) % width,
        y: (height + cursorPosition.y + dy * multiplier) % height,
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

export default ConditionalTrampolineInstruction;