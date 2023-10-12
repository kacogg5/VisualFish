import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";

function NumberLiteralInstruction({ instruction }) {
  return ({
    x,
    y,
    isRaw,
    editorState,
    editorDispatch,
  }) => (
    <BaseNumberLiteralInstruction
      instruction={instruction}
      x={x}
      y={y}
      isRaw={isRaw}
      editorState={editorState}
      editorDispatch={editorDispatch}
    />
  );
}

function BaseNumberLiteralInstruction({
  instruction,
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const value = Number.parseInt(instruction, 16);

    const directions = {
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
    };

    const sizes = [...state.stackSizes];
    const size = sizes.pop();
    const { dx, dy } = directions[state.cursorDirection];

    return {
      ...state,
      stackSizes: [...sizes, size + 1],
      stackStack: [...state.stackStack, value],
      cursorPosition: {
        x: (state.width + state.cursorPosition.x + dx) % state.width,
        y: (state.height + state.cursorPosition.y + dy) % state.height,
      },
    };
  }, [instruction]);

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

export const NumberLiteralInstructionMap =
  [...new Array(16).keys()].reduce((m, value) => ({
    ...m,
    [value.toString(16)]: NumberLiteralInstruction({
      instruction: value.toString(16),
    }),
  }), {});