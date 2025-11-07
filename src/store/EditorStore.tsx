import { create } from "zustand";

export interface EditorState {
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: "",
  setContent: (content) => set({ content }),
  title: "",
  setTitle: (title) => set({ title }),
}));