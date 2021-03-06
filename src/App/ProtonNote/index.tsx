import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { RootState } from "~/store/types";
import { chooseNoteById } from "~/store/notes/actions";
import loadingSvg from "~/assets/loading.svg";
import Header from "./Header";
import SelectNotes from "./SelectNotes";
import DisplayNote from "./DisplayNote";

export default function ProtonNote() {
  const dispatch = useDispatch();
  const { currentNoteId, loading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  /* select a default note */
  useEffect(() => {
    dispatch(chooseNoteById("note_id_0"));
  }, []);

  return (
    <>
      <Loading show={loading}>
        <img src={loadingSvg} />
      </Loading>
      <Container>
        <Header />
        <Main>
          <SelectNotes />
          {currentNoteId === null || notes[currentNoteId] === undefined ? (
            <Empty>No note selected</Empty>
          ) : (
            <DisplayNote />
          )}
        </Main>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex-grow: 1;
  display: flex;
  border-bottom: 1px solid rgb(172, 176, 191);
  border-right: 1px solid rgb(172, 176, 191);
  height: calc(100vh - 73px);
`;

const Empty = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div<{ show: boolean }>`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  flex-direction: column;
  background: rgba(160, 160, 160, 0.75);
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: none;

  ${props =>
    props.show &&
    `
      opacity: 1;
      display: flex;
  `}
`;
