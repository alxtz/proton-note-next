import React from "react";
import marked from "marked";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store/types";
import {
  chooseNoteById,
  editNoteById,
  saveNote,
  deleteNoteById,
  updateEditingTitle,
  updateEditingMd
} from "~/store/notes/actions";
import {
  Container,
  Title,
  TitleInput,
  Render,
  EditTextarea,
  BottomBar,
  Button
} from "./style";

export default function DisplayNotePanel() {
  const dispatch = useDispatch();
  const {
    decryptedMd,
    notes,
    mode,
    currentNoteId,
    editingTitle,
    editingMd
  } = useSelector((state: RootState) => state.notes);

  const htmlStringFromMd = marked(decryptedMd);

  if (currentNoteId === null) {
    return null;
  }

  return (
    <Container>
      <Title>
        {mode === "edit" ? (
          <TitleInput
            value={editingTitle}
            onChange={e => dispatch(updateEditingTitle(e.target.value))}
            placeholder="Title"
          />
        ) : (
          notes[currentNoteId].title
        )}
      </Title>
      <Render>
        {mode === "edit" ? (
          <EditTextarea
            value={editingMd}
            onChange={e => dispatch(updateEditingMd(e.target.value))}
          />
        ) : (
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: htmlStringFromMd }}
          />
        )}
      </Render>
      <BottomBar>
        {mode === "edit" ? (
          <>
            <Button onClick={() => dispatch(chooseNoteById(currentNoteId))}>
              Cancel
            </Button>
            <Button onClick={() => dispatch(saveNote())}>Save</Button>
            <Button onClick={() => dispatch(deleteNoteById(currentNoteId))}>
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={() => dispatch(editNoteById(currentNoteId))}>
            Edit
          </Button>
        )}
      </BottomBar>
    </Container>
  );
}
