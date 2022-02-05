import styled from "styled-components";

function Button({ disabled, children }) {
  return <StyledButton disabled={disabled}>{children}</StyledButton>;
}

const StyledButton = styled.button`

  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 15px 20px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color, #fffff);
  border: 2px solid #3BA0D6;
  color: var(--button-color, #3BA0D6);

  &:active,
  &:hover,
  &:focus {
    color: var(--button-color, #ffffff);
    background: var(--button-hover-bg-color, #3BA0D6);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #3BA0D6);
  }
`;

export default Button;