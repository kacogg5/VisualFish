const React = require("react");
const { default: BaseInstruction } = require("./BaseInstruction");

function instructionFunction(quoteType) {
  return (state) => {
    const {
      cursorDirection,
      cursorPosition,
      width,
      height,
    } = state;

    const directions = {
      left:   { dx: -1, dy:  0 },
      right:  { dx:  1, dy:  0 },
      up:     { dx:  0, dy: -1 },
      down:   { dx:  0, dy:  1 },
    };

    const { dx, dy } = directions[cursorDirection];
    console.log("quotation", quoteType);

    return {
      ...state,
      inQuotes: true,
      lastQuoteType: quoteType,
      cursorPosition: {
        x: (width + cursorPosition.x + dx) % width,
        y: (height + cursorPosition.y + dy) % height,
      },
    };
  };
}

function SingleQuoteInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "'";

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(instruction)}
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

function DoubleQuoteInstruction({
  x,
  y,
  isRaw,
  editorState,
  editorDispatch,
}) {
  const {
    fontSize,
  } = editorState;

  const instruction = "\"";

  return (
    <BaseInstruction
      instruction={instruction}
      instructionFunction={instructionFunction(instruction)}
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
  SingleQuoteInstruction,
  DoubleQuoteInstruction,
};