import EditorState from "./EditorState";

export interface IInstructionProps {
    x: number,
    y: number,
    isRaw: boolean,
    editorState: EditorState,
    editorDispatch: any,
}