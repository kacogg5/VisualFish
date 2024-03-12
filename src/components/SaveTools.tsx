import React, { useCallback, useEffect, useMemo, useState } from "react";
import EditorState from "../types/EditorState";
import { IEditorReducerAction } from "../types/IEditorReducerAction";
import { downloadFishCodeAction } from "../reducer/editorReducer";

function SaveTools({
  editorState,
  editorDispatch,
}: {
  editorState: EditorState,
  editorDispatch: React.Dispatch<IEditorReducerAction | ((state: EditorState) => IEditorReducerAction)>
}) {
  const [localFileName, setLocalFileName] = useState(editorState.fileName);
  const saveName = useMemo(() => localFileName.length > 0 ?
      localFileName.replace(/[^A-Za-z0-9]+/gm, "-") : "_", [localFileName]);

  const onChangeLocalFileName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFileName(event.target.value);
  }, []);

  const onBlurSaveTools = useCallback((event: React.FocusEvent<HTMLDivElement, HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setLocalFileName(editorState.fileName);
  }, [editorState.fileName]);

  const onClickSave = useCallback(async () => {
    const confirmResult = confirm("This will download a text file. Are you sure?");
    if (!confirmResult) {
      return;
    }
    const fileContent = editorState.fish.map(line => line.trimEnd()).join("\n");
    
    const element = document.createElement("a");
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${saveName}.fish`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }, [editorState.fish, saveName]);

  return (
    <div
      style={{
        backgroundColor: "#d4b662",
        color: "#0f1330",
      }}
      onBlur={onBlurSaveTools}
    >
      <div style={{
        backgroundColor: "#ffffff40",
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
      }}>
        <input
          style={{ backgroundColor: "transparent", outline: "none", border: "none", padding: "2px 4px" }}
          onChange={onChangeLocalFileName}
          value={localFileName}
        />
        <div style={{ cursor: "pointer" }} onClick={onClickSave}>
          <img alt="Save" src="./save100.png" style={{ height: 24, width: 24, margin: 3 }} />
        </div>
        <div style={{ cursor: "pointer" }}>
          <img alt="Load" src="./upload96.png" style={{ height: 24, width: 24, margin: 3 }} />
        </div>
      </div>
      <div style={{ padding: "2px 4px", textTransform: "none", fontSize: "10pt" }}>
        Will save as <span style={{ fontFamily: "monospace, monospace", fontSize: "10pt" }}>{saveName}.fish</span>
      </div>
    </div>
  );
}

export default SaveTools;