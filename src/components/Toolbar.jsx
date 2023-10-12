import React, { useCallback, useEffect, useState } from "react";
import { 
  executeInstructionAction, markNotRunningAction, markRunningAction, resetRunStateAction,
} from "../reducer/editorReducer";
import Button from "./Button";

function Toolbar({
  editorState,
  editorDispatch,
}) {
  const {
    isRunning,
    isError,
  } = editorState;

  const [intervalId, setIntervalId] = useState(undefined);

  const onClickPlay = useCallback(() => {
    // console.log(editorState);
    if (intervalId !== undefined || isError) {
      return;
    }

    editorDispatch(markRunningAction());
    const localIntervalId = setInterval(() => {
      editorDispatch((currentState) => {
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
        background: "#eeeeee",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        userSelect: "none",
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