import React from "react";
import { useCallback } from "react";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";
import { flagError } from "../reducer/editorReducer";

function PlaceIntoCodeboxInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "p";
  const instructionFunction = useCallback((state: EditorState) => {
    const {
      tempInstructions,
      stackSizes,
      stackStack,
      tempHeight,
      tempWidth
    } = state;
    if (stackSizes.slice(-1)[0] < 3) {
      return flagError(editorState);
    }

    const stack = [...stackStack];
    const iy = stack.pop() ?? 0;
    const ix = stack.pop() ?? 0;
    if (ix < 0 || iy < 0) {
      return flagError(editorState);
    }

    const ti = String.fromCharCode(Number(stack.pop()));
    let placed = false;

    const newTempInstructions = [];
    for (let { tempInstruction: ci, x: cx, y: cy } of tempInstructions) {
        if (cx === ix && cy === iy) {
            ci = ti
            placed = true;
        }
        newTempInstructions.push({
            tempInstruction: ci,
            x: cx,
            y: cy,
        });
    }

    if (!placed) {
        newTempInstructions.push({
            tempInstruction: ti,
            x: ix,
            y: iy,
        });
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size - 3],
      stackStack: stack,
      tempInstructions: newTempInstructions,
      tempWidth: Math.max(tempWidth, ix + 1),
      tempHeight: Math.max(tempHeight, iy + 1),
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

export default PlaceIntoCodeboxInstruction;