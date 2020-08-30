import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import marked from "marked";
import { RootState } from "~/store/types";
import {
  chooseNoteById,
  editNoteById,
  saveNote,
  deleteNoteById,
  updateEditingTitle,
  updateEditingMd
} from "~/store/notes/actions";

type Props = {
  title: string;
};

export default function DisplayNotePanel({ title }: Props) {
  const dispatch = useDispatch();
  const {
    decryptedMd,
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
          title
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

const Container = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 0px 14px;
  font-weight: 500;
  font-size: 24px;
  border-bottom: 1px solid rgb(172, 176, 191);
  flex-basis: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
  background-color: #fafbfc;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0366d6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
    background: white;
  }
`;

const Render = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 10px;
  overflow: auto;
`;

const EditTextarea = styled.textarea`
  display: block;
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0366d6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
    background: white;
  }
`;

const BottomBar = styled.div`
  padding: 10px 20px;
  font-weight: bold;
  border-top: 1px solid rgb(172, 176, 191);
  background: #e6eaf0;
`;

const Button = styled.button`
  outline: 0;
  border: 1px solid #657ee4;
  border-radius: 3px;
  color: #657ee4;
  background-color: #fff;
  padding: 5px 16px;
  line-height: 21px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease all;
  margin-right: 10px;

  &:hover {
    color: #526ee0;
    box-shadow: 0 0 0.3571428571em 0 rgba(0, 0, 0, 0.2);
    border-color: #526ee0;
  }
`;
