import React, { useCallback, useMemo, useState } from "react";
import { addToInputQueueAction } from "../reducer/editorReducer";
import Button from "./Button";

function FishInput({
  inputQueue,
  inputIndex,
  editorDispatch,
}: {
  inputQueue: Array<number>,
  inputIndex: number,
  editorDispatch: any,
}) {
  const [fishInput, setInput] = useState("");
  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }, []);

  const onClickAddAsText = useCallback(() => {
    const addArray: Array<number> = [];
    for (let i = 0; i < fishInput.length; i++) {
      addArray.push(fishInput.charCodeAt(i));
    }
    editorDispatch(addToInputQueueAction(addArray));
    setInput("");
  }, [editorDispatch, fishInput]);

  const onClickAddAsArray = useCallback(() => {
    const splitInput = fishInput.split(",");
    const addArray: Array<number> = [];
    for (let i = 0; i < splitInput.length; i++) {
      const element = +splitInput[i].trim();
      addArray.push(isNaN(element) ? 0 : element);
    }
    editorDispatch(addToInputQueueAction(addArray));
    setInput("");
  }, [editorDispatch, fishInput]);

  const inputArray = useMemo(() => inputQueue.map((value, index) => {
    const borderColor = index < inputIndex ? "#686872" :
        index == inputIndex ? "#ffffff" : "#0097ff";
    return (
      <div style={{
        border: `2px solid ${borderColor}`,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "white",
        opacity: index < inputIndex ? 0.5 : 1,
        textTransform: "unset",
      }}>
        <div style={{
          padding: "4px",
          backgroundColor: index < inputIndex ? "#686872" : "#6b6b76",
        }}>
          {value}
        </div>
        <div style={{
          padding: "4px",
          backgroundColor: index < inputIndex ? "#686872" : "#0097ff",
        }}>
          {String.fromCharCode(value)}
        </div>
      </div>
    );
  }), [inputIndex, inputQueue]);

  return (
    <div>
      <div style={{ padding: 6 }}>Input</div>
      <div style={{
        background: "#00000050",
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
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: 4,
          backgroundColor: "#ffffff80",
        }}
      >
        <input
          style={{
            border: "none",
            outline: "none",
            padding: 4,
            backgroundColor: "#00000080"
          }}
          onChange={onChangeInput}
          placeholder="<>< Input"
          value={fishInput}
        />
        <Button onClick={onClickAddAsText}>+A</Button>
        <Button onClick={onClickAddAsArray}>+#</Button>
      </div>
    </div>
  );
}

function StackStack({
  registers,
  stack,
  stackCount,
  stackSizes,
}: {
  registers: Array<number>,
  stack: Array<number> | ["Empty"],
  stackCount: number,
  stackSizes: Array<number>,
}) {
  let stackIndex = 0;
  return (
    <div>
      <div style={{ padding: 6 }}>Stack</div>
      <div style={{
        background: "#00000050",
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
            const borderColor = index < stackCount - 1 ? "#686872" : "#0097ff";
            return (
              <div
                key={`${index}-${size}`}
                style={{
                  padding: 4,
                  border: `2px solid ${borderColor}`,
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
}: {
  output: Array<string>,
}) {
  return (
    <div>
      <div style={{ padding: 6 }}>Output</div>
      <div style={{
        background: "#00000050",
        display: "flex",
        flexDirection: "row",
        userSelect: "none",
        minHeight: 20,
        padding: 6,
        textTransform: "none",
      }}>
        {output.join("\n")}
      </div>
    </div>
  );
}

function StateDisplay({
  editorState,
  editorDispatch,
}: {
  editorState: any,
  editorDispatch: any,
}) {
  return (
    <div style={{
      display: "grid",
      gap: "1em",
      gridTemplateColumns: "1fr",
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