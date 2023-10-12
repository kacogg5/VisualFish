import React, { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction from "./BaseInstruction";

function instructionFunction(operatorFunction) {
  return (state) => {
    console.log(state);
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
    const a = stack.pop();
    const b = stack.pop();

    const sizes = [...stackSizes];
    const size = sizes.pop();
    const { dx, dy } = directions[cursorDirection];
    // console.log(operatorFunction(b, a));

    return {
      ...state,
      stackSizes: [...sizes, size - 1],
      stackStack: [...stack, operatorFunction(b, a)],
      cursorPosition: {
        x: (width + cursorPosition.x + dx) % width,
        y: (height + cursorPosition.y + dy) % height,
      },
    };
  };
}

function AdditionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "+";
  const operatorFunction = useCallback((a, b) => a + b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function SubtractionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "-";
  const operatorFunction = useCallback((a, b) => a - b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function MultiplicationInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "*";
  const operatorFunction = useCallback((a, b) => a * b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function DivisionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = ",";
  const operatorFunction = useCallback((a, b) => a / b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function ModuloInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "%";
  const operatorFunction = useCallback((a, b) => a % b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function EqualsInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "=";
  const operatorFunction = useCallback((a, b) => Number(a === b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function GreaterThanInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = ")";
  const operatorFunction = useCallback((a, b) => Number(a > b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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

function LessThanInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "(";
  const operatorFunction = useCallback((a, b) => Number(a < b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
  AdditionInstruction,
  SubtractionInstruction,
  MultiplicationInstruction,
  DivisionInstruction,
  ModuloInstruction,
  EqualsInstruction,
  GreaterThanInstruction,
  LessThanInstruction,
};