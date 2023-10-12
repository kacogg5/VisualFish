import ConditionalTrampolineInstruction from "./ConditionalTrampolineInstruction";
import DownInstruction from "./DownInstruction";
import DuplicateInstruction from "./DuplicateInstruction";
import JumpInstruction from "./JumpInstruction";
import LeftInstruction from "./LeftInstruction";
import MergeStackInstruction from "./MergeStackInstruction";
import {
  BackSlashMirrorInstruction,
  ForwardSlashMirrorInstruction,
  HorizontalMirrorInstruction,
  OmnidirectionalMirrorInstruction,
  VerticalMirrorInstruction,
} from "./MirrorInstructions";
import NewStackInstruction from "./NewStackInstruction";
import {
  NumberLiteralInstructionMap,
} from "./NumberLiteralInstructions";
import {
  AdditionInstruction,
  DivisionInstruction,
  EqualsInstruction,
  GreaterThanInstruction,
  LessThanInstruction,
  ModuloInstruction,
  MultiplicationInstruction,
  SubtractionInstruction,
} from "./OperatorInstructions";
import { OutputCharacterInstruction, OutputNumberInstruction } from "./OutputInstructions";
import RegisterSwapInstruction from "./RegisterSwapInstruction";
import PushStackLengthInstruction from "./PushStackLengthInstruction";
import {
  DoubleQuoteInstruction,
  SingleQuoteInstruction,
} from "./QuotationInstruction";
import RandomDirectionInstruction from "./RandomDirectionInstruction";
import RemoveFromStackInstruction from "./RemoveFromStackInstruction";
import ReverseInstruction from "./ReverseInstruction";
import RightInstruction from "./RightInstruction";
import SpaceInstruction from "./SpaceInstruction";
import StopInstruction from "./StopInstruction";
import {
  LeftShiftInstruction,
  RightShiftInstruction,
  ThreeValueSwapInstruction,
  TwoValueSwapInstruction,
} from "./SwapInstructions";
import TakeFromInputInstruction from "./TakeFromInputInstruction";
import TrampolineInstruction from "./TrampolineInstruction";
import UpInstruction from "./UpInstruction";
import PushFromMapInstruction from "./PushFromMapInstruction";

const instructionMap = {
  /* Movement & execution */
  " ": SpaceInstruction,
  ";": StopInstruction,
  "v": DownInstruction,
  "<": LeftInstruction,
  ">": RightInstruction,
  "^": UpInstruction,
  "\\": BackSlashMirrorInstruction,
  "/": ForwardSlashMirrorInstruction,
  "_": HorizontalMirrorInstruction,
  "|": VerticalMirrorInstruction,
  "#": OmnidirectionalMirrorInstruction,
  "x": RandomDirectionInstruction,
  "!": TrampolineInstruction,
  "?": ConditionalTrampolineInstruction,
  ".": JumpInstruction,

  /* Literals and Operators */
  ...NumberLiteralInstructionMap,
  "+": AdditionInstruction,
  "-": SubtractionInstruction,
  "*": MultiplicationInstruction,
  ",": DivisionInstruction,
  "%": ModuloInstruction,
  "=": EqualsInstruction,
  ")": GreaterThanInstruction,
  "(": LessThanInstruction,
  "'": SingleQuoteInstruction,
  "\"": DoubleQuoteInstruction,

  /* Stack Manipulation */
  ":": DuplicateInstruction,
  "~": RemoveFromStackInstruction,
  "$": TwoValueSwapInstruction,
  "@": ThreeValueSwapInstruction,
  "{": LeftShiftInstruction,
  "}": RightShiftInstruction,
  "r": ReverseInstruction,
  "l": PushStackLengthInstruction,
  "[": NewStackInstruction,
  "]": MergeStackInstruction,

  /* Input & Output */
  "n": OutputNumberInstruction,
  "o": OutputCharacterInstruction,
  "i": TakeFromInputInstruction,

  /* Reflection / Miscellaneous */
  "&": RegisterSwapInstruction,
  "g": PushFromMapInstruction,
};

export default instructionMap;