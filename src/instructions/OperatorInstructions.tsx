import React, { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import EditorState from "../types/EditorState";
import { IInstructionProps } from "../types/IInstructionProps";

function instructionFunction(operatorFunction: (a: number, b: number) => number) {
  return (state: EditorState) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 2) {
      return flagError(state);
    }

    const stack = [...stackStack];
    const a = stack.pop() ?? 0;
    const b = stack.pop() ?? 0;

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;
    // console.log(operatorFunction(b, a));

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size - 1],
      stackStack: [...stack, operatorFunction(b, a)],
    });
  };
}

function AdditionInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "+";
  const operatorFunction = useCallback((a: number, b: number) => a + b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "-";
  const operatorFunction = useCallback((a: number, b: number) => a - b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "*";
  const operatorFunction = useCallback((a: number, b: number) => a * b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = ",";
  const operatorFunction = useCallback((a: number, b: number) => a / b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}:IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "%";
  const operatorFunction = useCallback((a: number, b: number) => a % b, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "=";
  const operatorFunction = useCallback((a: number, b: number) => Number(a === b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = ")";
  const operatorFunction = useCallback((a: number, b: number) => Number(a > b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "(";
  const operatorFunction = useCallback((a: number, b: number) => Number(a < b), []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(operatorFunction)}
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