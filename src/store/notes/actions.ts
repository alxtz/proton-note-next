import { v4 } from "uuid";
import { Dispatch, GetState } from "~/store/types";
import { encrypt, decrypt } from "~/shared/utils";
import { ActionTypes, NOTES_ACTIONS } from "./types";

export const addNewNote = () => (dispatch: Dispatch<ActionTypes>) => {
  const newNoteId = v4();

  dispatch({
    type: NOTES_ACTIONS.ADD_NEW_NOTE,
    newNoteId,
    title: `New untitled note ${new Date().toLocaleTimeString()}`
  });

  dispatch(chooseNoteById(newNoteId));
  dispatch(editNoteById(newNoteId));
};

export const chooseNoteById = (noteId: string) => async (
  dispatch: Dispatch<ActionTypes>,
  getState: GetState
) => {
  dispatch({
    type: NOTES_ACTIONS.SET_LOADING,
    loading: true
  });

  const { notes } = getState().notes;
  const decrypted = await decrypt(notes[noteId].encryptedMd);

  dispatch({
    type: NOTES_ACTIONS.CHOOSE_NOTE,
    noteId,
    decryptedMd: decrypted
  });
};

export const editNoteById = (noteId: string) => async (
  dispatch: Dispatch<ActionTypes>,
  getState: GetState
) => {
  dispatch({
    type: NOTES_ACTIONS.SET_LOADING,
    loading: true
  });

  const { notes } = getState().notes;
  const decrypted = await decrypt(notes[noteId].encryptedMd);

  dispatch({
    type: NOTES_ACTIONS.EDIT_NOTE,
    editingTitle: notes[noteId].title,
    editingMd: decrypted
  });
};

export const saveNote = () => async (
  dispatch: Dispatch<ActionTypes>,
  getState: GetState
) => {
  dispatch({
    type: NOTES_ACTIONS.SET_LOADING,
    loading: true
  });

  const { editingMd, editingTitle } = getState().notes;
  const encrypted = await encrypt(editingMd);

  dispatch({
    type: NOTES_ACTIONS.SAVE_NOTE,
    title: editingTitle,
    encryptedMd: encrypted,
    decryptedMd: editingMd
  });
};

export const deleteNoteById = (noteId: string) => async (
  dispatch: Dispatch<ActionTypes>,
  getState: GetState
) => {
  // const deleteNote = (noteId: string) => {
  //   setCurrentNoteId(null);
  //   setMode("view");
  //
  //   const newNoteItems = {
  //     ...noteItems
  //   };
  //
  //   delete newNoteItems[noteId];
  //
  //   setNoteItems(newNoteItems);
  // };
};

export const updateEditingTitle = (title: string) => (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch({
    type: NOTES_ACTIONS.UPDATE_EDITING_TITLE,
    title
  });
};

export const updateEditingMd = (md: string) => (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch({
    type: NOTES_ACTIONS.UPDATE_EDITING_MD,
    md
  });
};
