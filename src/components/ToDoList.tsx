import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { Task } from '../commonTypes';
import { testTasks } from '../testData';
import { Header } from './Header';
import { TaskList } from './TaskList';
import { AddSection } from './AddSection';
import { TaskBody } from '../commonTypes';
import { EditSection } from './EditSection';

export const ToDoList: React.FC = () => {
  const [currentTasks, setCurrentTasks] = React.useState<Task[]>(testTasks);
  const [addSectionOpen, setAddSectionOpen] = React.useState(false);
  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  React.useEffect(function () {
    fetch(`${BASE_URL}/tasks/`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data: Task[]) {
        setCurrentTasks(data);
      });
  }, []);

  function openAddTaskSection() {
    setAddSectionOpen(true);
  }

  function closeAddTaskSection() {
    setAddSectionOpen(false);
  }

  function markTask(id: string, completed: boolean) {
    const taskBody: Partial<TaskBody> = {
      completed: completed,
    };

    fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskBody),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: Task[]) {
        setCurrentTasks(data);
      });
  }

  function addTask(taskBody: TaskBody) {
    fetch(`${BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskBody),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: Task[]) {
        setCurrentTasks(data);
      });
  }

  function openEditTaskSection(id: string) {
    const taskToChange = currentTasks.find(function (task) {
      if (task.id === id) {
        return true;
      } else {
        return false;
      }
    });

    setTaskToEdit(taskToChange);
  }

  function editTask(taskBody: TaskBody) {
    if (taskToEdit === undefined) {
      return;
    }

    fetch(`${BASE_URL}/tasks/${taskToEdit.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskBody),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: Task[]) {
        setCurrentTasks(data);
      });
  }

  function deleteTask(id: string) {
    fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: Task[]) {
        setCurrentTasks(data);
      });
  }

  function closeEditTaskSection() {
    setTaskToEdit(undefined);
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
      {taskToEdit !== undefined ? (
        <EditSection
          taskToEdit={taskToEdit}
          onComplete={editTask}
          onDelete={deleteTask}
          onClose={closeEditTaskSection}
        />
      ) : undefined}
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
