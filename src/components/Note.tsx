import styled from "@emotion/styled";

export const Note = styled.div<{ disabled: boolean; current: boolean }>`
  background: white;
  border: 1px solid rgb(172, 176, 191);
  border-left: 0;
  border-right: 0;
  flex-grow: 1;
  display: flex;
  padding: 15px 20px;
  cursor: pointer;
  transition: 0.3s ease all;
  height: 49px;

  &:first-of-type {
    border-top: 0;
  }

  &:not(:last-child) {
    border-bottom: 0;
  }

  &:hover {
    background: rgb(230, 234, 240);
  }

  ${props =>
    props.disabled &&
    `
    opacity: 0.2;
    pointer-events: none;
    cursor: default;
  `}

  ${props =>
    props.current &&
    `
      border-left: 5px solid #9397cd;
      background: #828895;
      color: #fff;
      font-weight: 500;
      opacity: 1;

      &:hover {
        background: #828895;
      }
  `}
`;
