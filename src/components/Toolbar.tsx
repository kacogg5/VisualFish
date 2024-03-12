import React, { useCallback, useEffect, useState } from "react";
import { 
  executeInstructionAction, markNotRunningAction, markRunningAction, resetRunStateAction,
} from "../reducer/editorReducer";
import Button from "./Button";
import EditorState from "../types/EditorState";

function Toolbar({
  editorState,
  editorDispatch,
}: {
  editorState: EditorState,
  editorDispatch: any,
}) {
  const {
    isRunning,
    isError,
  } = editorState;

  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const onClickPlay = useCallback(() => {
    // console.log(editorState);
    if (intervalId !== undefined || isError) {
      return;
    }

    editorDispatch(markRunningAction());
    const localIntervalId = setInterval(() => {
      editorDispatch((currentState: EditorState) => {
        if (!currentState.isRunning || currentState.isError) {
          // console.log("Stopping...");
          clearInterval(localIntervalId);
          return markNotRunningAction();
        }
        
        return executeInstructionAction();
      });
    }, 300);
    setIntervalId(localIntervalId);
  }, [editorDispatch, intervalId, isError]);

  // console.log(editorState);
  const onClickStep = useCallback(() => {
    if (isRunning || isError) {
      return;
    };
    editorDispatch(executeInstructionAction());
  }, [editorDispatch, isError, isRunning]);

  const onClickPause = useCallback(() => {
    if (!isRunning) {
      return;
    }
    editorDispatch(markNotRunningAction());

    clearInterval(intervalId);
    setIntervalId(undefined);
  }, [editorDispatch, intervalId, isRunning]);

  const onClickReset = useCallback(() => {
    if (isRunning) {
      return;
    }

    editorDispatch(resetRunStateAction());
  }, [editorDispatch, isRunning]);

  useEffect(() => {
    if (intervalId !== undefined && !editorState.isRunning) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [editorState.isRunning, intervalId]);

  return (
    <div
      style={{
        padding: "0.25em",
        display: "flex",
        flexDirection: "row",
        userSelect: "none",
        gap: "0.25em",
        background: "#00000050",
      }}
    >
      <Button onClick={onClickPlay} disabled={isRunning || isError}>
        Play
      </Button>
      <Button onClick={onClickStep} disabled={isRunning || isError}>
        Step
      </Button>
      <Button onClick={onClickPause} disabled={!isRunning}>
        Pause
      </Button>
      <Button onClick={onClickReset} disabled={isRunning}>
        Reset
      </Button>
    </div>
  );
}

export default Toolbar;