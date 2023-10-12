import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function TwoValueSwapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "$";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
      cursorDirection,
      cursorPosition,
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

    const stack = [...stackStack];
    const valueA = stack.pop();
    const valueB = stack.pop();
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      stackStack: [...stack, valueA, valueB],
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

function ThreeValueSwapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "@";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
      cursorDirection,
      cursorPosition,
      width,
      height,
    } = state;
    if (stackSizes.slice(-1) < 3) {
      return flagError(state);
    }

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };

    const stack = [...stackStack];
    const valueA = stack.pop();
    const valueB = stack.pop();
    const valueC = stack.pop();
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      stackStack: [...stack, valueA, valueC, valueB],
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

function RightShiftInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "}";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
      cursorDirection,
      cursorPosition,
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

    const stack = stackStack.slice(-size);
    const value = stack.pop();
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      stackSizes: [...sizes, size],
      stackStack: [value, ...stack],
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

function LeftShiftInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "{";
  const instructionFunction = useCallback((state) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
      cursorDirection,
      cursorPosition,
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

    const stack = stackStack.slice(-size);
    const value = stack.shift();
    const { dx, dy } = directions[cursorDirection];

    return {
      ...state,
      stackSizes: [...sizes, size],
      stackStack: [...stack, value],
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
  TwoValueSwapInstruction,
  ThreeValueSwapInstruction,
  RightShiftInstruction,
  LeftShiftInstruction,
};