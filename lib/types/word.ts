export interface Word {
  id: string;
  text: string;
  plural?: string;
  emoji?: string;
  image?: string ;
  icon?: string;
  groupId: string[];
  tense?: string;
  children?: WordGroup['id'][]; // IDs of groups or words that can follow this word
}

export interface WordGroup {
  id: string;
  name: string;
  emoji?: string;
  image?: string | string[];
  icon?: string;
  items?: (WordGroup | Word)[];
}
