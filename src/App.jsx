import React, { useReducer } from "react";
import "./App.css";
import Editor from "./components/Editor";
import StateDisplay from "./components/StateDisplay";
import Toolbar from "./components/Toolbar";
import { editorReducer, initialEditorState } from "./reducer/editorReducer";

function App() {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);

  return (
    <div
      style={{
        display: "grid",
        margin: "1em",
        gap: "1em",
      }}
    >
      {/* toolbar */}
      <Toolbar editorState={state} editorDispatch={dispatch} />
      {/* editor */}
      <Editor isRaw={true} editorState={state} editorDispatch={dispatch} />
      {/* output */}
      <StateDisplay editorState={state} editorDispatch={dispatch} />
    </div>
  );
}

export default App;
