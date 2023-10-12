import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function MergeStackInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "]";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      registerStack,
      stackCount,
      stackSizes,
      width,
      height,
    } = state;
    if (stackCount < 2) {
      return flagError(state);
    }

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };

    const sizes = [...stackSizes];
    const sizeA = sizes.pop();
    const sizeB = sizes.pop();

    const registers = [...registerStack];
    registers.pop();

    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      registerStack: registers,
      stackCount: stackCount - 1,
      stackSizes: [...sizes, sizeA + sizeB],
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

export default MergeStackInstruction;