import TLabel from "@/types/label";
import { v4 as uuidv4 } from "uuid";

export function createNewLabel(labelName: string, color: string): TLabel {
  return {
    localId: uuidv4(),
    labelName: labelName,
    color: color,
  };
}
