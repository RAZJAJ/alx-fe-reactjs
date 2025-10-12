import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
  expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText(/Add a todo/i);
  const addButton = screen.getByText(/Add/i);

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todoItem = screen.getByText(/Learn React/i);
  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const deleteButton = screen.getAllByText(/Delete/i)[0];
  fireEvent.click(deleteButton);
  expect(screen.queryByText(/Learn React/i)).not.toBeInTheDocument();
});
