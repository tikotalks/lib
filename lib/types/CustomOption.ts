import { Colors } from "./colors";
import { Icons } from "open-icon";

export interface CustomOption {
  id: string;
  color: Colors;
  icon: Icons;
  emoji: string;
  label: string;
  speech: string;
}


export interface CustomSet {
  id: string;
  name: string;
  items: CustomOption[];
}
