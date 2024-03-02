import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

interface HeaderInterface {
  onAddTaskClick: () => void;
}

export const Header: React.FC<HeaderInterface> = ({ onAddTaskClick }) => {
  return (
    <Container>
      Список задач команды
      <AddTaskButton onClick={onAddTaskClick}>+</AddTaskButton>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,

  width: '100%',
  height: 68,

  fontSize: '26px',
  lineHeight: '30px',

  paddingLeft: 16,
  paddingTop: 12,
  paddingRight: 16,
  paddingBottom: 12,

  backgroundColor: colors.header,
  color: colors.textHeader,
});

const AddTaskButton = styled.div({
  display: 'block',
  flexShrink: 0,

  backgroundColor: colors.button.positive,
  color: colors.lightText,

  height: 40,
  width: 40,
  borderRadius: 8,
  marginLeft: 8,

  fontSize: '36px',
  lineHeight: '40px',
  textAlign: 'center',

  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: colors.buttonHover.positive,
  },

  '&:active': {
    backgroundColor: colors.buttonActive.positive,
  },
});
