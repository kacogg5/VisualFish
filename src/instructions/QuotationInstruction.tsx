import React from "react";
import EditorState from "../types/EditorState";
import { IInstructionProps } from "../types/IInstructionProps";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";

function instructionFunction(quoteType: string) {
  return (state: EditorState) => {
    return moveCursorStandard({
      ...state,
      inQuotes: true,
      lastQuoteType: quoteType,
    });
  };
}

function SingleQuoteInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "'";

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(instruction)}
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

function DoubleQuoteInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "\"";

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(instruction)}
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
  SingleQuoteInstruction,
  DoubleQuoteInstruction,
};