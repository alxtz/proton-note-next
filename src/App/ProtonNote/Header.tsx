import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";

import { addNewNote } from "~/store/notes/actions";
import { RootState } from "~/store/types";

export default function Header() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.notes);

  return (
    <Container>
      ProtonNote
      <NewNote
        disabled={mode === "edit"}
        onClick={() => dispatch(addNewNote())}
        data-test-id="new-button"
      >
        + New Note
      </NewNote>
    </Container>
  );
}

const Container = styled.div`
  background: #6a6f7c;
  padding: 20px;

  font-size: 22px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NewNote = styled.button`
  background: #657ee4;
  border: 1px solid #657ee4;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  padding: 5px 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: 0;

  &:hover {
    box-shadow: 0 0 0.3571428571em 0 rgba(0, 0, 0, 0.2);
  }

  &:active {
    text-shadow: 1px 1px 10px rgba(255, 255, 255, 0.3),
      -1px -1px 10px rgba(255, 255, 255, 0.3);
    box-shadow: none;
    background: #526ee0;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;
