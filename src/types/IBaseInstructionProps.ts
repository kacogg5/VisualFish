import EditorState from "./EditorState";

export interface IBaseInstructionProps {
    /* Instruction Traits */
    instruction: string,
    instructionFunction: (state: EditorState) => EditorState,
    color?: string | undefined,
    fontSize: number,
    imgUrl: string,
    isRaw: boolean,
    /* Per-Instance Parameters */
    x: number,
    y: number,
    /* State-Related Parameters */
    editorState: EditorState,
    editorDispatch: any,
  }