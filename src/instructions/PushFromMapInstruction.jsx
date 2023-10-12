import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";
import { flagError } from "../reducer/editorReducer";

function PushFromMapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "g";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      fish,
      height,
      stackSizes,
      stackStack,
      tempInstructions,
      width,
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
    const x = stack.pop();
    const y = stack.pop();

    let value;
    if (
      (0 > y || y <= height) ||
      (0 > x || x <= fish[y].length)
    ) {
      value = 0;
    } else {
      value = fish[y].charCodeAt(x);
    }

    for (let i = 0; i < tempInstructions.length; i++) {
      const {
        x: tX, y: tY, tempInstruction,
      } = tempInstructions[i];
      if (y === tY && x === tX) {
        value = tempInstruction.charCodeAt(0);
      } else if (y === tY && x >= fish[y].length && x < tX) {
        value = 32;
      }
    }

    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      stackSizes: [...sizes, size - 1],
      stackStack: [...stackStack, value],
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

export default PushFromMapInstruction;