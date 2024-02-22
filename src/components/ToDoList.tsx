import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { Task } from '../commonTypes';
import { testTasks } from '../testData';

export const ToDoList: React.FC = () => {
  const [currentTasks, setCurrentTasks] = React.useState<Task[]>(testTasks);

  return (
    <Container>
      {/* <Header/> */}
      {/* <TaskList/> */}
      {/* <AddTask/> */}
      {/* <AddTask/> */}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 600,
  height: '100vh',
  backgroundColor: colors.background,
});
