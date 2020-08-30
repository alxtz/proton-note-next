export type NoteObject = {
  title: string;
  encryptedMd: string;
};

export type Mode = "edit" | "view";

export enum NOTES_ACTIONS {
  ADD_NEW_NOTE = "ADD_NEW_NOTE",
  CHOOSE_NOTE = "CHOOSE_NOTE",
  SET_LOADING = "SET_LOADING",
  EDIT_NOTE = "EDIT_NOTE",
  SAVE_NOTE = "SAVE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  UPDATE_EDITING_TITLE = "UPDATE_EDITING_TITLE",
  UPDATE_EDITING_MD = "UPDATE_EDITING_MD"
}

type AddNewNote = {
  type: typeof NOTES_ACTIONS.ADD_NEW_NOTE;
  newNoteId: string;
  title: string;
};

type ChooseNoteById = {
  type: typeof NOTES_ACTIONS.CHOOSE_NOTE;
  noteId: string;
  decryptedMd: string;
};

type SetLoading = {
  type: typeof NOTES_ACTIONS.SET_LOADING;
  loading: boolean;
};

type EditNoteById = {
  type: typeof NOTES_ACTIONS.EDIT_NOTE;
  editingTitle: string;
  editingMd: string;
};

type SaveNote = {
  type: typeof NOTES_ACTIONS.SAVE_NOTE;
  title: string;
  encryptedMd: string;
  decryptedMd: string;
};

type DeleteNoteById = {
  type: typeof NOTES_ACTIONS.DELETE_NOTE;
  noteId: string;
};

type UpdateEditingTitle = {
  type: typeof NOTES_ACTIONS.UPDATE_EDITING_TITLE;
  title: string;
};

type UpdateEditingMd = {
  type: typeof NOTES_ACTIONS.UPDATE_EDITING_MD;
  md: string;
};

export type ActionTypes =
  | AddNewNote
  | ChooseNoteById
  | SetLoading
  | EditNoteById
  | SaveNote
  | DeleteNoteById
  | UpdateEditingTitle
  | UpdateEditingMd;
