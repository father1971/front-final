import React from 'react';
import styled from 'styled-components';
import { Task } from '../commonTypes';
import { TaskCard } from './TaskCard';

interface TaskListInterface {
  tasks: Task[];
  onTaskMarked: (id: string, completed: boolean) => void;
  onEditTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListInterface> = ({
  tasks,
  onTaskMarked,
  onEditTask,
}) => {
  return (
    <Container>
      {tasks.map(function (task) {
        return (
          <TaskCard
            task={task}
            onEditTask={onEditTask}
            onTaskMarked={onTaskMarked}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'auto',
});
