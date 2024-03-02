import React from 'react';
import styled from 'styled-components';
import { Task } from '../commonTypes';
import { colors } from '../colors';

interface TaskCardInterface {
  task: Task;
  onTaskMarked: (id: string, completed: boolean) => void;
  onEditTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardInterface> = ({
  task,
  onTaskMarked,
  onEditTask,
}) => {
  const deadline = new Date(task.deadline);
  const isLate = task.completed === false && deadline < new Date();

  function onTaskCompletedButtonClick() {
    onTaskMarked(task.id, false);
  }

  function onTaskNotCompletedButtonClick() {
    onTaskMarked(task.id, true);
  }

  function onChangeTaskButtonClick() {
    onEditTask(task.id);
  }

  return (
    <Container>
      <TaskInfo>
        <TaskName completed={task.completed}>{task.name}</TaskName>
        <TaskTime isLate={isLate}>{deadline.toLocaleString()}</TaskTime>
      </TaskInfo>
      {task.completed ? (
        <TaskCompletedButton onClick={onTaskCompletedButtonClick}>
          ✓
        </TaskCompletedButton>
      ) : (
        <TaskNotCompletedButton onClick={onTaskNotCompletedButtonClick} />
      )}
      <ChangeTaskButton onClick={onChangeTaskButtonClick}>⚙️</ChangeTaskButton>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  borderBottom: '1px solid gray',
  height: 56,
  paddingLeft: 16,
  paddingTop: 8,
  paddingRight: 16,
  paddingBottom: 8,
});

const TaskInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const TaskName = styled.div<{ completed: boolean }>(({ completed }) => {
  return {
    textAlign: 'start',
    color: colors.textTask,
    fontSize: '16px',
    lineHeight: '22px',
    textDecoration: completed ? 'line-through' : 'none',
    marginBottom: 2,
  };
});

const TaskTime = styled.div<{ isLate: boolean }>(({ isLate }) => {
  return {
    textAlign: 'start',
    color: isLate ? colors.redText : colors.text,
    fontSize: '14px',
    lineHeight: '18px',
  };
});

const TaskNotCompletedButton = styled.div({
  display: 'block',
  flexShrink: 0,

  height: 30,
  width: 30,
  backgroundColor: colors.button.darkNeutral,
  marginLeft: 8,

  borderRadius: 8,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.text,

  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: colors.buttonHover.darkNeutral,
  },

  '&:active': {
    backgroundColor: colors.buttonActive.darkNeutral,
  },
});

const TaskCompletedButton = styled.div({
  display: 'block',
  flexShrink: 0,

  height: 32,
  width: 32,
  backgroundColor: colors.button.positive,
  marginLeft: 8,

  borderRadius: 8,

  color: colors.lightText,
  fontSize: '28px',
  lineHeight: '32px',
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

const ChangeTaskButton = styled.div({
  display: 'block',
  flexShrink: 0,

  height: 32,
  width: 32,
  backgroundColor: colors.button.darkNeutral,
  marginLeft: 8,

  borderRadius: 8,

  color: colors.text,
  fontSize: '32px',
  lineHeight: '32px',
  textAlign: 'center',
  fontWeight: 'bold',

  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: colors.buttonHover.darkNeutral,
  },

  '&:active': {
    backgroundColor: colors.buttonActive.darkNeutral,
  },
});
