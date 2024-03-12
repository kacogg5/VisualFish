import React, { useCallback } from "react";
import { flagError } from "../reducer/editorReducer";
import BaseInstruction, { moveCursorStandard } from "./BaseInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import EditorState from "../types/EditorState";

function RegisterSwapInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}: IInstructionProps) {
  const {
    fontSize,
  } = editorState;

  const instruction = "&";
  const instructionFunction = useCallback((state: EditorState) => {
    // console.log(state);
    const {
      stackSizes,
      stackStack,
      registerStack,
    } = state;

    const rStack = [...registerStack];
    const registerValue = rStack.pop();
    if (!registerValue && stackSizes.slice(-1)[0] < 1) {
      return flagError(state);
    }

    const sizes = [...stackSizes];
    const size = sizes.pop() ?? 0;
  
    let dSize = 1;
    let stack = [...stackStack, Number(registerValue)];
    let rValue: number | false = false;
    if (registerValue === undefined) {
      dSize = -1;
      stack = [...stackStack];
      rValue = stack.pop() ?? 0;
    }

    return moveCursorStandard({
      ...state,
      stackSizes: [...sizes, size + dSize],
      stackStack: stack,
      registerStack: [...rStack, rValue] as Array<number | false>,
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

export default RegisterSwapInstruction;