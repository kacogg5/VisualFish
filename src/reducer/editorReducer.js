export const initialEditorState = {
  fish: [""],
  width: 4,
  height: 3,
  functionMap: {},
  selectionStart: { x: 0, y: 0 },
  selectionEnd: { x: 0, y: 0 },
  isSelecting: false,
  stackCount: 1,
  stackStack: [],
  stackSizes: [0],
  registerStack: [false],
  tempInstructions: [],
  cursorPosition: {
    x: 0,
    y: 0,
  },
  cursorDirection: "right",
  inQuotes: false,
  lastQuoteType: "",
  isRunning: false,
  isError: false,
  fishOutput: [],
  fontSize: 12,
  inputQueue: [],
  inputIndex: 0,
};

function stringPlaceInstruction(str, index, instruction) {
  let returnString;
  if (index < 0) {
    return str.trimEnd();
  }
  
  if (index < str.length) {
    returnString = str.substring(0, index) + instruction[0] + str.substring(index + 1);
  } else if (index === str.length) {
    returnString = str + instruction[0];
  } else {
    returnString = str.padEnd(index) + instruction[0];
  }
  
  return returnString.trimEnd();
}

export const flagError = (state) => ({
  ...state,
  isRunning: false,
  isError: true,
  fishOutput: [
    ...state.fishOutput,
    "Something smells fishy...",
  ],
}); 

export const addToInputQueueAction = (payload = undefined) => ({
  type: "addToInputQueue",
  payload,
});
export const backspaceAction = (payload = undefined) => ({
  type: "backSpaceAction",
  payload,
});
export const endSelectionAction = (payload = undefined) => ({
  type: "endSelection",
  payload,
});
export const escapeSelectionAction = (payload = undefined) => ({
  type: "escapeSelection",
  payload,
});
export const executeInstructionAction = (payload = undefined) => ({
  type: "executeInstruction",
  payload,
});
export const expandSelectionAction = (payload = undefined) => ({
  type: "expandSelection",
  payload,
});
export const insertInstructionAction = (payload = undefined) => ({
  type: "insertInstruction",
  payload,
});
export const markNotRunningAction = (payload = undefined) => ({
  type: "markNotRunning",
  payload,
});
export const markRunningAction = (payload = undefined) => ({
  type: "markRunning",
  payload,
});
export const registerInstructionAction = (payload = undefined) => ({
  type: "registerInstruction",
  payload,
});
export const resetRunStateAction = (payload = undefined) => ({
  type: "resetRunState",
  payload,
});
export const shiftSelectionAction = (payload = undefined) => ({
  type: "shiftSelection",
  payload,
});
export const startSelectionAction = (payload = undefined) => ({
  type: "startSelection",
  payload,
});

export function editorReducer(state, action) {
  if (typeof(action) === "function") {
    action = action(state);
  }

  switch (action.type) {
    case addToInputQueueAction().type: {
      // Adds given payload to the input queue. If payload is an
      // array, each element is added separately
      const {
        inputQueue,
      } = state;

      const input = [...inputQueue];
      let addArray;
      if (Array.isArray(action.payload)) {
        addArray = action.payload;
      } else if (typeof action.payload === "number") {
        addArray = [action.payload];
      } else {
        addArray = [0];
      }
      input.push(...addArray);

      return {
        ...state,
        inputQueue: input,
      };
    }
    case backspaceAction().type: {
      // Sets the selected area as whitespace, then reduces the program
      // dimensions as necessary.
      const {
        fish,
        width,
        height,
        selectionEnd,
        selectionStart,
      } = state;
      const { x: startX, y: startY } = selectionStart;
      const { x: endX, y: endY } = selectionEnd;

      if (startX >= width || startY >= height) {
        return state;
      }
      
      const newFish = [...fish];
      let newHeight = endY + 1 >= height ? startY : height;
      let newWidth = Math.max(
        ...newFish.slice(0, startY).map(l => l.trimEnd().length),
        ...newFish.slice(endY+1).map(l => l.trimEnd().length),
      );
      for (let i = startY; i <= endY; i++) {
        let row = newFish[i] ?? "";
        for (let j = startX; j <= endX; j++) {
          row = stringPlaceInstruction(row, j, " ");
        }
        newWidth = Math.max(newWidth, row.length);
        if (endY + 1 >= height && row !== "") { newHeight = i + 1; }
        newFish[i] = row;
      }

      // console.log(newFish, newHeight, newWidth);
      return {
        ...state,
        fish: newFish.slice(0, newHeight),
        width: Math.max(newWidth, 1),
        height: Math.max(newHeight, 1),
      };
    }
    case endSelectionAction().type: {
      // For editing purposes, ends the selection.
      if (!state.isSelecting) {
        return state;
      }

      const { x: x1, y: y1 } = action.payload;
      const { x: x2, y: y2 } = state.selectionStart;
      return {
        ...state,
        isSelecting: false,
        selectionStart: {
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
        },
        selectionEnd: {
          x: Math.max(x1, x2),
          y: Math.max(y1, y2),
        },
      };
    }
    case escapeSelectionAction().type: {
      // Performs one of two actions:
      // If the selection contains an area greater than 1, shrinks
      // the selection to the highest left-most cell.
      // Otherwise, releases the selection.
      const {
        selectionStart,
        selectionEnd,
      } = state;

      if (selectionStart === undefined || selectionEnd === undefined) {
        return state;
      }

      if (selectionStart.x === selectionEnd.x && selectionStart.y === selectionEnd.y) {
        return {
          ...state,
          selectionStart: undefined,
          selectionEnd: undefined,
        };
      }
      
      return {
        ...state,
        selectionEnd: selectionStart,
      };
    }
    case executeInstructionAction().type: {
      // Executes the instruction at location of the cursor.
      // If a quote instruction has been encountered, instruction
      // functionality will be ignored and the instruction's ASCII
      // code added to the current stack, until a matching quote
      // instruction is encountered.
      const { x: cursorX, y: cursorY } = state.cursorPosition;

      let instruction = state.fish[cursorY][cursorX] ?? " ";
      state.tempInstructions.forEach(({
        tempInstruction, x, y,
      }) => {
        if (x === cursorX && y === cursorY) {
          instruction = tempInstruction;
        }
      });

      if (state.inQuotes) {
        if (instruction === state.lastQuoteType) {
          return state.functionMap[" "]({
            ...state,
            inQuotes: false,
          });
        }

        // console.log("pushed", instruction);
        const sizes = [...state.stackSizes];
        const size = sizes.pop() ?? 0;
        return state.functionMap[" "]({
          ...state,
          stackStack: [...state.stackStack, instruction.charCodeAt(0)],
          stackSizes: [...sizes, size + 1],
        });
      }

      const instructionFunction = state.functionMap[instruction];
      return instructionFunction(state);
    }
    case expandSelectionAction().type: {
      // Expands the selection in the given direction by a single unit
      const {
        direction,
      } = action.payload;

      const {
        selectionStart,
        selectionEnd,
      } = state;

      if (selectionStart === undefined || selectionEnd === undefined) {
        return state;
      }

      return {
        ...state,
        selectionStart: {
          x: Math.max(0, selectionStart.x - Number(direction === "left")),
          y: Math.max(0, selectionStart.y - Number(direction === "up")),
        },
        selectionEnd: {
          x: Math.max(0, selectionEnd.x + Number(direction === "right")),
          y: Math.max(0, selectionEnd.y + Number(direction === "down")),
        },
      };
    }
    case insertInstructionAction().type: {
      // 
      const {
        fish,
        width,
        height,
        selectionStart,
      } = state;

      const {
        instruction,
      } = action.payload;

      const newFish = [...fish];
      for (let i = height; i < selectionStart.y; i++) {
        newFish[i] = "";
      }

      let initialString = "";
      if (selectionStart.y < height) {
        initialString = fish[selectionStart.y];
      }
      newFish[selectionStart.y] = stringPlaceInstruction(
        initialString, selectionStart.x, instruction,
      );

      // console.log(newFish);

      return {
        ...state,
        height: Math.max(selectionStart.y + 1, height),
        width: Math.max(selectionStart.x + 1, width),
        fish: newFish,
      };
    }
    case markNotRunningAction().type: {
      // marks the progam as paused
      return {
        ...state,
        isRunning: false,
      };
    }
    case markRunningAction().type: {
      // Marks the program as running
      return {
        ...state,
        isRunning: true,
      };
    }
    case registerInstructionAction().type: {
      // Registers a new instruction with its functionality
      const {
        instruction,
        instructionFunction,
      } = action.payload;

      state.functionMap[instruction] = instructionFunction;
      return state;
    }
    case resetRunStateAction().type: {
      // Resets the program to be run again
      return {
        ...state,
        stackCount: 1,
        stackStack: [],
        stackSizes: [0],
        registerStack: [false],
        tempInstructions: [],
        cursorPosition: {
          x: 0,
          y: 0,
        },
        cursorDirection: "right",
        inQuotes: false,
        lastQuoteType: "",
        fishOutput: [],
        isRunning: false,
        isError: false,
        inputIndex: 0,
      };
    }
    case shiftSelectionAction().type: {
      // Nudges the entire selection (leaving instructions) in the given direction by 1 space
      const {
        direction,
      } = action.payload;

      const {
        selectionStart,
        selectionEnd,
      } = state;

      const directions = {
        left: { dx: -1, dy: 0 },
        right: { dx: 1, dy: 0 },
        up: { dx: 0, dy: -1 },
        down: { dx: 0, dy: 1 },
      };
  
      const { dx, dy } = directions[direction];

      if (selectionStart === undefined || selectionEnd === undefined) {
        return state;
      }

      return {
        ...state,
        selectionStart: {
          x: Math.max(0, selectionStart.x + dx),
          y: Math.max(0, selectionStart.y + dy),
        },
        selectionEnd: {
          x: Math.max(0, selectionEnd.x + dx),
          y: Math.max(0, selectionEnd.y + dy),
        },
      };
    }
    case startSelectionAction().type: {
      // For editing purposes, start a selection
      return {
        ...state,
        isSelecting: true,
        selectionStart: action.payload,
        selectionEnd: action.payload,
      };
    }
    default:
      return state;
  }
}