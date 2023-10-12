import React from "react";
import { useCallback } from "react";
import BaseInstruction from "./BaseInstruction";

function mirrorFunction(directionMap, deltaMap, state) {
  const { dx, dy } = deltaMap[state.cursorDirection];

  return {
    ...state,
    cursorDirection: directionMap[state.cursorDirection],
    cursorPosition: {
      x: (state.width + state.cursorPosition.x + dx) % state.width,
      y: (state.height + state.cursorPosition.y + dy) % state.height,
    },
  };
}

function BackSlashMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "\\";
  const instructionFunction = useCallback((state) => {
    return mirrorFunction({
      left: "up",
      right: "down",
      up: "left",
      down: "right",
    }, {
      left: { dx: 0, dy: -1 },
      right: { dx: 0, dy: 1 },
      up: { dx: -1, dy: 0 },
      down: { dx: 1, dy: 0 },
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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

function ForwardSlashMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "/";
  const instructionFunction = useCallback((state) => {
    return mirrorFunction({
      left: "down",
      right: "up",
      up: "right",
      down: "left",
    }, {
      left: { dx: 0, dy: 1 },
      right: { dx: 0, dy: -1 },
      up: { dx: 1, dy: 0 },
      down: { dx: -1, dy: 0 },
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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

function HorizontalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "_";
  const instructionFunction = useCallback((state) => {
    return mirrorFunction({
      left: "left",
      right: "right",
      up: "down",
      down: "up",
    }, {
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
      up: { dx: 0, dy: 1 },
      down: { dx: 0, dy: -1 },
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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

function OmnidirectionalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "#";
  const instructionFunction = useCallback((state) => {
    return mirrorFunction({
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    }, {
      left: { dx: 1, dy: 0 },
      right: { dx: -1, dy: 0 },
      up: { dx: 0, dy: 1 },
      down: { dx: 0, dy: -1 },
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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

function VerticalMirrorInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "|";
  const instructionFunction = useCallback((state) => {
    return mirrorFunction({
      left: "right",
      right: "left",
      up: "up",
      down: "down",
    }, {
      left: { dx: 1, dy: 0 },
      right: { dx: -1, dy: 0 },
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
    }, state);
  }, []);

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction}
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

export {
  BackSlashMirrorInstruction,
  ForwardSlashMirrorInstruction,
  HorizontalMirrorInstruction,
  OmnidirectionalMirrorInstruction,
  VerticalMirrorInstruction,
};