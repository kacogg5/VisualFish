import ConditionalTrampolineInstruction from "./ConditionalTrampolineInstruction";
import DuplicateInstruction from "./DuplicateInstruction";
import JumpInstruction from "./JumpInstruction";
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
import SpaceInstruction from "./SpaceInstruction";
import StopInstruction from "./StopInstruction";
import {
  LeftShiftInstruction,
  RightShiftInstruction,
  ThreeValueSwapInstruction,
  TwoValueSwapInstruction,
} from "./SwapInstructions";
import PushFromInputInstruction from "./PushFromInputInstruction";
import TrampolineInstruction from "./TrampolineInstruction";
import PushFromCodeboxInstruction from "./PushFromCodeboxInstruction";
import { IInstructionProps } from "../types/IInstructionProps";
import PlaceIntoCodeboxInstruction from "./PlaceIntoCodeboxInstruction";
import { DownInstruction, LeftInstruction, RightInstruction, UpInstruction } from "./ArrowInstructions";

const instructionMap: Record<string, ((props: IInstructionProps) => JSX.Element)> = {
  /* Movement & execution */
  " ": SpaceInstruction,
  "^": UpInstruction,
  "v": DownInstruction,
  "<": LeftInstruction,
  ">": RightInstruction,
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
  "i": PushFromInputInstruction,

  /* Reflection / Miscellaneous */
  "&": RegisterSwapInstruction,
  "g": PushFromCodeboxInstruction,
  "p": PlaceIntoCodeboxInstruction,
  ";": StopInstruction,
};

export default instructionMap;