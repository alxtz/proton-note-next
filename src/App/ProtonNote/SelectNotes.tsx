import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";

import { Note } from "~/components/Note";
import { RootState } from "~/store/types";
import { chooseNoteById } from "~/store/notes/actions";

export default function SelectNotes() {
  const dispatch = useDispatch();
  const { notes, currentNoteId, mode, editingTitle } = useSelector(
    (state: RootState) => state.notes
  );

  return (
    <ChooseNotePanel>
      {Object.entries(notes).map(([id, item]) => (
        <Note
          key={id}
          onClick={() => dispatch(chooseNoteById(id))}
          disabled={mode === "edit"}
          current={currentNoteId === id}
        >
          {mode === "edit" && currentNoteId === id ? editingTitle : item.title}
        </Note>
      ))}
    </ChooseNotePanel>
  );
}

const ChooseNotePanel = styled.div`
  border: 1px solid rgb(172, 176, 191);
  border-bottom: 0;
  border-top: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 400px;
  max-width: 30vw;
  background: #e6eaf0;
`;
