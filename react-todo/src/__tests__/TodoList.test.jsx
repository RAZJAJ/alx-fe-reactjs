import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');
  const button = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'Test new todo' } });
  fireEvent.click(button);

  expect(screen.getByText('Test new todo')).toBeInTheDocument();
});

test('toggles todo completion', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Learn React');
  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Build a Todo App');
  const deleteButton = screen.getAllByText('Delete')[1]; // second one
  fireEvent.click(deleteButton);
  expect(todoItem).not.toBeInTheDocument();
});
