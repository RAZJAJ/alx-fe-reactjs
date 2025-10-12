import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from '../components/TodoList'

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />)
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument()
    expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument()
    expect(screen.getByText(/Write Tests/i)).toBeInTheDocument()
  })

  test('adds a new todo', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/Add new todo/i)
    const addButton = screen.getByText(/Add/i)

    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)

    expect(screen.getByText(/New Todo/i)).toBeInTheDocument()
  })

  test('toggles a todo', () => {
    render(<TodoList />)
    const todo = screen.getByText(/Learn React/i)

    fireEvent.click(todo)
    expect(todo).toHaveStyle('text-decoration: line-through')

    fireEvent.click(todo)
    expect(todo).not.toHaveStyle('text-decoration: line-through')
  })

  test('deletes a todo', () => {
    render(<TodoList />)
    const deleteButton = screen.getByTestId(/delete-1/i)

    fireEvent.click(deleteButton)
    expect(screen.queryByText(/Learn React/i)).not.toBeInTheDocument()
  })
})
