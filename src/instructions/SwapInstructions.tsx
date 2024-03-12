import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function TwoValueSwapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "$";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 2) {
      return flagError(state);
    }

    const stack = [...stackStack];
    const valueA = stack.pop() ?? 0;
    const valueB = stack.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackStack: [...stack, valueA, valueB],
    });
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "@";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 3) {
      return flagError(state);
    }

    const stack = [...stackStack];
    const valueA = stack.pop() ?? 0;
    const valueB = stack.pop() ?? 0;
    const valueC = stack.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackStack: [...stack, valueA, valueC, valueB],
    });
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "}";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = stackStack.slice(-size);
    const value = stack.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size],
      stackStack: [value, ...stack],
    });
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "{";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = stackStack.slice(-size);
    const value = stack.shift() ?? 0;

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size],
      stackStack: [...stack, value],
    });
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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