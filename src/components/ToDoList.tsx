import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { Task } from '../commonTypes';
import { testTasks } from '../testData';
import { Header } from './Header';
import { TaskList } from './TaskList';
import { AddSection } from './AddSection';
import { TaskBody } from '../commonTypes';

export const ToDoList: React.FC = () => {
  const [currentTasks, setCurrentTasks] = React.useState<Task[]>(testTasks);
  const [addSectionOpen, setAddSectionOpen] = React.useState(false);

  function openAddTaskSection() {
    setAddSectionOpen(true);
  }

  function closeAddTaskSection() {
    setAddSectionOpen(false);
  }

  function markTask(id: string, completed: boolean) {
    const taskToChange = currentTasks.find(function (task) {
      if (task.id === id) {
        return true;
      } else {
        return false;
      }
    });

    if (taskToChange === undefined) {
      return;
    }

    const newTask: Task = {
      id: taskToChange.id,
      name: taskToChange.name,
      completed: completed,
      deadline: taskToChange.deadline,
    };

    const taskToChangeIndex = currentTasks.indexOf(taskToChange);

    const newTasks = currentTasks.slice();
    newTasks.splice(taskToChangeIndex, 1, newTask);

    setCurrentTasks(newTasks);
  }

  function addTask(taskBody: TaskBody) {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskBody.name,
      completed: taskBody.completed,
      deadline: taskBody.deadline,
    };

    const newTasks = currentTasks.slice();
    newTasks.push(newTask);
    setCurrentTasks(newTasks);
  }

  function openEditTaskSection(id: string) {
    alert('Edit task');
  }

  return (
    <Container>
      <Header onAddTaskClick={openAddTaskSection} />
      <TaskList
        tasks={currentTasks}
        onTaskMarked={markTask}
        onEditTask={openEditTaskSection}
      />
      <AddSection
        open={addSectionOpen}
        onComplete={addTask}
        onClose={closeAddTaskSection}
      />
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
