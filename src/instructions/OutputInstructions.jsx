import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function OutputNumberInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "n";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      fishOutput,
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
    const value = stack.pop();

    const output = [...fishOutput];
    const lastLine = output.pop() ?? "";
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      fishOutput: [...output, lastLine + value.toString()],
      stackSizes: [...sizes, size - 1],
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

function OutputCharacterInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "o";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      cursorDirection,
      cursorPosition,
      fishOutput,
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
    const value = stack.pop();

    const output = [...fishOutput];
    const lastLine = output.pop() ?? "";
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      fishOutput: [...output, lastLine + String.fromCharCode(Math.floor(value))],
      stackSizes: [...sizes, size - 1],
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

export {
  OutputNumberInstruction,
  OutputCharacterInstruction,
};