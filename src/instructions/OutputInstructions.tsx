import React from "react";
import { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function OutputNumberInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "n";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      fishOutput,
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = [...stackStack];
    const value = stack.pop() ?? 0;

    const output = [...fishOutput];
    const lastLine = output.pop() ?? "";

    return moveCursorStandard({
      ...state,
      fishOutput: [...output, lastLine + value.toString()],
      stackSizes: [...sizes, size - 1],
      stackStack: stack,
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

function OutputCharacterInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "o";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      fishOutput,
      stackSizes,
      stackStack,
    } = state;
    if (stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    const stack = [...stackStack];
    const value = stack.pop() ?? 0;

    const output = [...fishOutput];
    const lastLine = output.pop() ?? "";

    return moveCursorStandard({
      ...state,
      fishOutput: [...output, lastLine + String.fromCharCode(Math.floor(value))],
      stackSizes: [...sizes, size - 1],
      stackStack: stack,
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
  OutputNumberInstruction,
  OutputCharacterInstruction,
};