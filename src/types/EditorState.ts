export default class EditorState {
    fileName = "New program"
    didDownload = false;
    fish: Array<string> = [" "];
    width = 1;
    height = 1;
    functionMap: Record<string, (state: EditorState) => any> = {};
    stackCount = 1;
    stackStack: Array<number> = [];
    stackSizes = [0];
    registerStack: Array<number | false> = [false];
    tempInstructions: Array<{
        tempInstruction: string,
        x: number,
        y: number,
    }> = [];
    tempWidth = 1;
    tempHeight = 1;
    cursorPosition = { x: 0, y: 0 };
    cursorDirection = "right";
    inQuotes = false;
    lastQuoteType = "";
    isRunning = false;
    isError = false;
    fishOutput: Array<string> = [];
    fontSize = 12;
    inputQueue: Array<number> = [];
    inputIndex = 0;
    isSelecting = false;
    selectionStart = { x: 0, y: 0 };
    selectionEnd = { x: 0, y: 0 };
    intervalId: number | undefined = undefined;
    editMode: "smart" | "excel" | "nomove" = "smart";
    editDirection = "right";
    editDirectionHistory: Array<string> = [];
    returnColumn = 0;
}