import { moveCursorStandard } from "../instructions/BaseInstruction";
import EditorState from "../types/EditorState";
import { IEditorReducerAction } from "../types/IEditorReducerAction";
import { IPosition } from "../types/IPosition";

export const initialEditorState = new EditorState();

function stringPlaceInstruction(str: string, index: number, instruction: string) {
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

export const flagError = (state: EditorState): EditorState => ({
  ...state,
  isRunning: false,
  isError: true,
  fishOutput: [
    ...state.fishOutput,
    "Something smells fishy...",
  ],
});

type ActionFunction = (payload?: any) => IEditorReducerAction;

export const addToInputQueueAction: ActionFunction = (payload = undefined) => ({
  type: "addToInputQueue",
  payload,
});
export const backspaceAction: ActionFunction = (payload = undefined) => ({
  type: "backSpaceAction",
  payload,
});
export const copySelectionAction: ActionFunction = (payload = undefined) => ({
  type: "copySelection",
  payload,
});
export const downloadFishCodeAction: ActionFunction = (payload = undefined) => ({
  type: "downloadFishCode",
  payload
});
export const endSelectionAction: ActionFunction = (payload = undefined) => ({
  type: "endSelection",
  payload,
});
export const escapeSelectionAction: ActionFunction = (payload = undefined) => ({
  type: "escapeSelection",
  payload,
});
export const executeInstructionAction: ActionFunction = (payload = undefined) => ({
  type: "executeInstruction",
  payload,
});
export const expandSelectionAction: ActionFunction = (payload = undefined) => ({
  type: "expandSelection",
  payload,
});
export const insertInstructionAction: ActionFunction = (payload = undefined) => ({
  type: "insertInstruction",
  payload,
});
export const markNotRunningAction: ActionFunction = (payload = undefined) => ({
  type: "markNotRunning",
  payload,
});
export const markRunningAction: ActionFunction = (payload = undefined) => ({
  type: "markRunning",
  payload,
});
export const moveMouseAction: ActionFunction = (payload = undefined) => ({
  type: "moveMouse",
  payload,
});
export const pasteCodeAction: ActionFunction = (payload = undefined) => ({
  type: "pasteCode",
  payload,
});
export const registerInstructionAction: ActionFunction = (payload = undefined) => ({
  type: "registerInstruction",
  payload,
});
export const resetRunStateAction: ActionFunction = (payload = undefined) => ({
  type: "resetRunState",
  payload,
});
export const shiftSelectionAction: ActionFunction = (payload = undefined) => ({
  type: "shiftSelection",
  payload,
});
export const startSelectionAction: ActionFunction = (payload = undefined) => ({
  type: "startSelection",
  payload,
});

export function editorReducer(
  state: EditorState,
  action: IEditorReducerAction | ((state: EditorState) => IEditorReducerAction),
) {
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
        editMode,
        editDirection,
        editDirectionHistory,
      } = state;
      let { x: startX, y: startY } = selectionStart;
      let { x: endX, y: endY } = selectionEnd;

      const isBackspace = action.payload === true;
      const directions = [...editDirectionHistory];
      let newEditDirection = editDirection;
      if (isBackspace && editMode === "smart" &&
          startX === endX && startY === endY &&
          editDirectionHistory.length > 0) {
        const lastEditAction = directions.pop() ?? "";
        if (lastEditAction !== "jump") {
          newEditDirection = lastEditAction;
        }
        
        const reverseDeltas: Record<string, { dx: number, dy: number }> = {
          "up": { dx: 0, dy: 1 },
          "down": { dx: 0, dy: -1 },
          "left": { dx: 1, dy: 0 },
          "right": { dx: -1, dy: 0 },
        }
        const { dx: rdx, dy: rdy } = reverseDeltas[editDirection];
        const deltaMultiplier = lastEditAction === "jump" ? 2 : 1;
        startX = endX = startX + rdx * deltaMultiplier;
        if (startX >= width) {
          startX = endX = lastEditAction === "jump" ? startX - width : 0;
        }
        startY = endY = startY + rdy * deltaMultiplier;
        if (startY >= height) {
          startY = endY = lastEditAction === "jump" ? startY - height : 0;
        }
      }

      if (startX < 0 || startX >= width ||
          startY < 0 || startY >= height) {
        return state;
      }
      
      const newFish = [...fish];
      let newHeight = 0;
      let newWidth = 0;
      for (let i = 0; i < newFish.length; i++) {
        if (startY <= i && i <= endY) {
          continue;
        }
        const row = newFish[i];
        if (row.trimEnd().length > newWidth) {
          newWidth = row.trimEnd().length;
        }
        if (row.trimEnd().length > 0) {
          newHeight = i + 1;
        }
      }

      for (let i = startY; i <= endY; i++) {
        let row = newFish[i] ?? "";
        for (let j = startX; j <= endX; j++) {
          row = stringPlaceInstruction(row, j, " ");
        }
        newWidth = Math.max(newWidth, row.length);
        if (row.length > 0) {
          newHeight = Math.max(i + 1, newHeight);
        }
        newFish[i] = row;
      }

      // console.log(newFish, newHeight, newWidth);
      return {
        ...state,
        fish: newFish.slice(0, Math.max(newHeight, 1)),
        width: Math.max(newWidth, 1),
        height: Math.max(newHeight, 1),
        tempWidth: Math.max(newWidth, 1),
        tempHeight: Math.max(newHeight, 1),
        selectionStart: { x: startX, y: startY },
        selectionEnd: { x: endX, y: endY },
        editDirection: newEditDirection,
        editDirectionHistory: directions,
      };
    }
    case copySelectionAction().type: {
      if (state.selectionStart === undefined || state.selectionEnd === undefined) {
        navigator.clipboard.writeText(
          state.fish
            .map(line => line.trimEnd())
            .join("\n"),
        );
        return state;
      }

      if (
        state.selectionStart.x >= state.width
        || state.selectionStart.y >= state.height
      ) {
        return state;
      }

      const selectedFish = [];
      for (let i = state.selectionStart.y; i <= state.selectionEnd.y; i++) {
        selectedFish.push(
          state.fish[i]
            ?.substring(state.selectionStart.x, state.selectionEnd.x + 1)
            ?.trimEnd() ?? "",
        );
      }
      navigator.clipboard.writeText(selectedFish.join("\n"));

      return state;
    }
    case downloadFishCodeAction().type: {
      const fileName = action.payload as string;
      const downloadName = fileName.length > 0 ?
          fileName.replace(/[^A-Za-z0-9]+/gm, "-") : "_";
      const fileContent = state.fish.map(line => line.trimEnd()).join("\n");
      
      const element = document.createElement("a");
      const file = new Blob([fileContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${downloadName}.fish`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();

      return {
        ...state,
        fileName,
      };
    }
    case endSelectionAction().type: {
      // For editing purposes, ends the selection.
      if (!state.isSelecting) {
        return state;
      }

      const { x: x1, y: y1 } = action.payload as IPosition;
      const { x: x2, y: y2 } = state.selectionStart;

      let editChanges: any = {};
      if (x1 === x2 && y1 === y2) {
        switch (state.editMode) {
          case "smart": {
            editChanges.editDirection = "right";
            editChanges.editDirectionHistory = [];
            break;
          }
          case "excel": {
            editChanges.editDirection = "right";
            editChanges.returnColumn = x1;
            break;
          }
          default:
            break;
        }
      }
      return {
        ...state,
        isSelecting: false,
        ...editChanges,
      };
    }
    case escapeSelectionAction().type: {
      // Performs one of two actions:
      // If the selection contains an area greater than 1,
      // shrinks the selection to the highest left-most cell.
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
        editDirection: "right",
        editDirectionHistory: [],
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
          return moveCursorStandard({
            ...state,
            inQuotes: false,
          });
        }

        // console.log("pushed", instruction);
        const sizes = [...state.stackSizes];
        const size = sizes.pop() ?? 0;
        return moveCursorStandard({
          ...state,
          stackStack: [...state.stackStack, instruction.charCodeAt(0)],
          stackSizes: [...sizes, size + 1],
        });
      }

      const instructionFunction = state.functionMap[instruction];
      if (!instructionFunction) {
        return flagError(state);
      }
      try {
        return instructionFunction(state);
      } catch (e) {
        return flagError(state);
      }
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
      const {
        fish,
        width,
        height,
        tempWidth,
        tempHeight,
        selectionStart,
        selectionEnd,
        editMode,
        editDirection,
        editDirectionHistory,
      } = state;

      const {
        instruction,
      } = action.payload as {
        instruction: string,
      };

      // 1 - Modify fish code
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

      // 2 - Move selection accordingly
      const editChanges: any = {};
      if (selectionStart.x === selectionEnd.x
          && selectionStart.y === selectionEnd.y) {
        switch (editMode) {
          case "smart": {
            let effectiveEditDirection = editDirection;
            const directionMapMap: Record<string, Record<string, string>> = {
              "/": { up: "right", down: "left", right: "up", left: "down"},
              "\\": { up: "left", down: "right", right: "down", left: "up"},
              "|": { up: "up", down: "down", right: "left", left: "right"},
              "_": { up: "down", down: "up", right: "right", left: "down"},
              "#": { up: "down", down: "up", right: "left", left: "right"},
              ">": { up: "right", down: "right", right: "right", left: "right"},
              "<": { up: "left", down: "left", right: "left", left: "left"},
              "^": { up: "up", down: "up", right: "up", left: "up"},
              "v": { up: "down", down: "down", right: "down", left: "down"},
            };

            if (directionMapMap[instruction]) {
              effectiveEditDirection = directionMapMap[instruction][editDirection];
              editChanges.editDirection = effectiveEditDirection;
            }

            const deltaMap: Record<string, { dx: number, dy: number }> = {
              "up": { dx: 0, dy: -1 },
              "down": { dx: 0, dy: 1 },
              "left": { dx: -1, dy: 0 },
              "right": { dx: 1, dy: 0 },
            }

            const deltaMultiplier = instruction === "!" ? 2 : 1;

            const { dx: sdx, dy: sdy } = deltaMap[effectiveEditDirection];
            let newX = selectionStart.x + sdx * deltaMultiplier;
            if (newX < 0) {
              newX = instruction === "!" ? newX + width : width;
            }
            let newY = selectionStart.y + sdy * deltaMultiplier;
            if (newY < 0) {
              newY = instruction === "!" ? newY + height : height;
            }
            editChanges.selectionStart = { x: newX, y: newY };
            editChanges.selectionEnd = { x: newX, y: newY };

            editChanges.editDirectionHistory = [...editDirectionHistory];
            editChanges.editDirectionHistory.push(instruction === "!" ? "jump": editDirection);
            break;
          }
          default:
            break;
        }
      }

      // console.log(newFish);

      return {
        ...state,
        height: Math.max(selectionStart.y + 1, height),
        width: Math.max(selectionStart.x + 1, width),
        tempHeight: Math.max(selectionStart.y + 1, tempHeight),
        tempWidth: Math.max(selectionStart.x + 1, tempWidth),
        fish: newFish,
        ...editChanges,
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
    case moveMouseAction().type: {
      // If in selecting state, changes selection as the mouse moves.
      if (!state.isSelecting) {
        return state;
      }

      const { x: x1, y: y1 } = action.payload;
      const { x: x2, y: y2 } = state.selectionStart;
      const { x: x3, y: y3 } = state.selectionEnd;

      // console.log(x1, y1, x2, y2);
      return {
        ...state,
        selectionStart: {
          x: Math.min(x1, x2, x3),
          y: Math.min(y1, y2, y3),
        },
        selectionEnd: {
          x: Math.max(x1, x2, x3),
          y: Math.max(y1, y2, y3),
        },
      };
    }
    case pasteCodeAction().type: {
      // Pastes the passed payload text into the codebox at the selection.
      // If nothing is selected, the content to paste will replace the entire program.
      
      const {
        fish,
        selectionStart,
      } = state;

      const content = (action.payload as string).split("\n");
      const contentWidth = Math.max(...content.map(line => line.trimEnd().length));

      let pastePosition: IPosition = { x: 0, y: 0 };
      if (selectionStart) {
        pastePosition = selectionStart;
      }
      const { x: startX, y: startY } = pastePosition;
      const endY = startY + content.length - 1;

      const newFish = [...fish];
      let newHeight = 1;
      let newWidth = 1;
      // Step 1 - add unaltered rows of existing fish code to new fish
      for (let i = 0; i < newFish.length; i++) {
        if (startY <= i && i <= endY) {
          continue;
        }
        const row = newFish[i];
        if (row.trimEnd().length > newWidth) {
          newWidth = row.trimEnd().length;
        }
        if (row.trimEnd().length > 0) {
          newHeight = i + 1;
        }
      }

      // Step 2 - red fish blue fish, old fish new <><
      for (let i = 0; i < content.length; i++) {
        const contentRow = content[i];
        const fishRow = state.fish[startY + i] ?? "";

        let newFishRow: string;
        if (fishRow.length <= startX) {
          newFishRow = (fishRow + " ".repeat(startX - fishRow.length) + contentRow).trimEnd();
        } else {
          newFishRow = (
              fishRow.substring(0, startX)
              + contentRow.padEnd(contentWidth)
              + fishRow.substring(startX + contentWidth)
            ).trimEnd();
        }
        newWidth = Math.max(newWidth, newFishRow.length);
        newFish[startY + i] = newFishRow;
        if (newFishRow.trimEnd().length > 0) {
          newHeight = Math.max(newHeight, i + 1);
        }
      }

      return {
        ...state,
        fish: newFish,
        width: newWidth,
        height: newHeight,
        tempWidth: newWidth,
        tempHeight: newHeight,
      }
    }
    case registerInstructionAction().type: {
      // Registers a new instruction with its functionality
      const {
        instruction,
        instructionFunction,
      } = action.payload as {
        instruction: string,
        instructionFunction: (state: EditorState) => EditorState,
      };

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
        tempWidth: state.width,
        tempHeight: state.height,
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
      const direction = action.payload as "left" | "right" | "up" | "down";

      const {
        selectionStart,
        selectionEnd,
        editMode,
        editDirectionHistory,
      } = state;

      const directions: Record<string, { dx: number, dy: number }> = {
        left: { dx: -1, dy: 0 },
        right: { dx: 1, dy: 0 },
        up: { dx: 0, dy: -1 },
        down: { dx: 0, dy: 1 },
      };
  
      const { dx, dy } = directions[direction];

      if (selectionStart === undefined || selectionEnd === undefined) {
        return state;
      }

      let editChanges: any = {};
      if (selectionStart.x === selectionEnd.x && selectionStart.y === selectionEnd.y) {
        switch (editMode) {
          case "smart": {
            editChanges.editDirection = direction;
            editChanges.editDirectionHistory = [];
            break;
          }
          case "excel": {
            editChanges.returnColumn = selectionStart.x + dx;
            break;
          }
          default:
            break;
        }
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
        ...editChanges,
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