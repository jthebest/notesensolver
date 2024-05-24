import { Category } from "./category.model";

export interface Note {
  id?: number | null; // Make the id property nullable by adding `null` to the union type
  title: string;
  content: string;
  archived: boolean;
  category?: Category | null;
}
