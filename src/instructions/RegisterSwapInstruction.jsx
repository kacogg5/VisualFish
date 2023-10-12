import React, { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function RegisterSwapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "&";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      stackSizes,
      stackStack,
      registerStack,
      width,
      height,
    } = state;

    const rStack = [...registerStack];
    const registerValue = rStack.pop();
    if (registerValue === undefined && stackSizes.slice(-1) < 1) {
      return flagError(state);
    }

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };
    const { dx, dy } = directions[cursorDirection];

    const sizes = [...stackSizes];
    const size = sizes.pop();
  
    let dSize = 1;
    let stack = [...stackStack, registerValue];
    let rValue = undefined;
    if (registerValue === undefined) {
      dSize = -1;
      stack = [...stackStack];
      rValue = stack.pop();
    }

    return {
      ...state,
      stackSizes: [...sizes, size + dSize],
      stackStack: stack,
      registerStack: [...rStack, rValue],
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

export default RegisterSwapInstruction;