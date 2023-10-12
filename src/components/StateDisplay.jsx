import React, { useCallback, useMemo, useState } from "react";
import { addToInputQueueAction } from "../reducer/editorReducer";
import Button from "./Button";

function FishInput({
  inputQueue,
  inputIndex,
  editorDispatch,
}) {
  const [fishInput, setInput] = useState("");
  const onChangeInput = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const onClickAddAsText = useCallback(() => {
    const addArray = [];
    for (let i = 0; i < fishInput.length; i++) {
      addArray.push(fishInput.charCodeAt(i));
    }
    editorDispatch(addToInputQueueAction(addArray));
    setInput("");
  }, [editorDispatch, fishInput]);

  const onClickAddAsArray = useCallback(() => {
    const splitInput = fishInput.split(",");
    const addArray = [];
    for (let i = 0; i < splitInput.length; i++) {
      const element = +splitInput[i].trim();
      addArray.push(isNaN(element) ? 0 : element);
    }
    editorDispatch(addToInputQueueAction(addArray));
    setInput("");
  }, [editorDispatch, fishInput]);

  const inputArray = useMemo(
    () => inputQueue.map((value, index) => (
      <div style={{
        color: index < inputIndex ? "grey" : "black",
      }}>
        {value}
      </div>
    )),
    [inputIndex, inputQueue],
  );

  return (
    <div>
      <div style={{ padding: 6 }}>Input</div>
      <div style={{
        background: "#eeeeee",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        userSelect: "none",
        minHeight: 20,
        padding: 6,
        gap: 6,
      }}>
        {inputArray}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Button onClick={onClickAddAsText}>Add as Text</Button>
        <Button onClick={onClickAddAsArray}>Add as Array</Button>
      </div>
      <input
        onChange={onChangeInput}
        placeholder="<>< Input"
        value={fishInput}
      />
    </div>
  );
}

function StackStack({
  registers,
  stack,
  stackCount,
  stackSizes,
}) {
  let stackIndex = 0;
  return (
    <div>
      <div style={{ padding: 6 }}>Stack</div>
      <div style={{
        background: "#eeeeee",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        fontSize: 9,
        gap: 4,
        padding: 6,
        userSelect: "none",
      }}>
        {
          stackSizes.map((size, index) => {
            let currentStack = stack.slice(stackIndex, stackIndex + size);
            if (currentStack.length === 0) {
              currentStack = ["Empty"];
            }
            stackIndex += size;
            const currentRegister = registers[index];
            return (
              <div
                key={`${index}-${size}`}
                style={{
                  backgroundColor: index !== stackCount - 1 ? "#dddddd" : "transparent",
                  padding: 4,
                  border: "1px solid grey",
                  borderRadius: 4,
                  textAlign: "right",
                }}
              >
                <div>
                  {currentStack.join(" ")}
                </div>
                <div>
                  {currentRegister ? currentRegister : "Empty"}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

function FishOutput({
  output,
}) {
  return (
    <div>
      <div style={{ padding: 6 }}>Output</div>
      <div style={{
        background: "#eeeeee",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        userSelect: "none",
        minHeight: 20,
        padding: 6,
      }}>
        {output.join("\n")}
      </div>
    </div>
  );
}

function StateDisplay({
  editorState,
  editorDispatch,
}) {
  return (
    <div style={{
      display: "grid",
      gap: "1em",
      gridTemplateColumns: "1fr 1fr",
    }}>
      <FishInput
        editorDispatch={editorDispatch}
        inputQueue={editorState.inputQueue}
        inputIndex={editorState.inputIndex}
      />
      <StackStack
        stack={editorState.stackStack}
        stackCount={editorState.stackCount}
        stackSizes={editorState.stackSizes}
        registers={editorState.registerStack}
      />
      <FishOutput output={editorState.fishOutput} />
    </div>
  );
}

export default StateDisplay;