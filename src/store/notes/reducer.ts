import { Reducer } from "redux";
import defaultNotes from "~/assets/defaultNotes.json";
import { ActionTypes, NOTES_ACTIONS, NoteObject, Mode } from "./types";

const initialState: State = {
  notes: defaultNotes,
  mode: "view",
  currentNoteId: null,
  loading: false,
  decryptedMd: "",
  editingTitle: "",
  editingMd: ""
};

type State = {
  notes: { [key: string]: NoteObject };
  mode: Mode;
  currentNoteId: string | null;
  loading: boolean;
  decryptedMd: string;
  editingTitle: string;
  editingMd: string;
};

export const notes: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NOTES_ACTIONS.ADD_NEW_NOTE: {
      return {
        ...state,
        currentNoteId: null,
        notes: {
          ...state.notes,
          [action.newNoteId]: {
            title: action.title,
            encryptedMd: "### Newly created note!"
          }
        }
      };
    }

    case NOTES_ACTIONS.CHOOSE_NOTE: {
      return {
        ...state,
        mode: "view",
        currentNoteId: action.noteId,
        decryptedMd: action.decryptedMd,
        loading: false
      };
    }

    case NOTES_ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: action.loading
      };
    }

    case NOTES_ACTIONS.EDIT_NOTE: {
      return {
        ...state,
        editingTitle: action.editingTitle,
        editingMd: action.editingMd,
        mode: "edit",
        loading: false
      };
    }

    case NOTES_ACTIONS.SAVE_NOTE: {
      return {
        ...state,
        notes: {
          ...state.notes,
          [state.currentNoteId as string]: {
            title: action.title,
            encryptedMd: action.encryptedMd
          }
        },
        mode: "view",
        loading: false,
        decryptedMd: action.decryptedMd
      };
    }

    case NOTES_ACTIONS.UPDATE_EDITING_TITLE: {
      return {
        ...state,
        editingTitle: action.title
      };
    }

    case NOTES_ACTIONS.UPDATE_EDITING_MD: {
      return {
        ...state,
        editingMd: action.md
      };
    }

    default:
      return state;
  }
};
