import React, { useReducer } from "react";
// import "./App.css";
import Editor from "./components/Editor";
import StateDisplay from "./components/StateDisplay";
import Toolbar from "./components/Toolbar";
import { editorReducer, initialEditorState } from "./reducer/editorReducer";
import SaveTools from "./components/SaveTools";

function App() {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "400px 1fr",
        background: "#303032",
        height: "100vh",
        color: "#e4e4ed",
        fontFamily: "monospace",
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          // backgroundImage: "url(\"./swirl.jpg\")",
          backgroundColor: "#1850a0",
          display: "grid",
        }}
      >
        <div
          style={{
            marginLeft: "8px",
            overflow: "hidden",
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* file save & load */}
          <SaveTools editorState={state} editorDispatch={dispatch} />
          {/* toolbar */}
          <Toolbar editorState={state} editorDispatch={dispatch} />
          {/* output */}
          <StateDisplay editorState={state} editorDispatch={dispatch} />
        </div>
      </div>
      <div>
        {/* editor */}
        <Editor isRaw={true} editorState={state} editorDispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
