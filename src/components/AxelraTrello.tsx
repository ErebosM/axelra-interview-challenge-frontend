import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { __GRAY_SCALE } from "../layout/Theme";
import { getDomain } from "../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../helpers/FetchOptions";
import { Todo, ToggleTodo, AddTodo, TodoAdd, DeleteTodo } from "../model/Todo"
import { TodoList } from "./TodoList"
import { AddTodoForm } from "./AddTodoForm"

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

export const AxelraTrello = () => {
  const TodoArray: Array<Todo> = [];

  const [todos, setTodos] = useState<Array<Todo>>(TodoArray);

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo;
    })
    setTodos(newTodos);
  }

  const addTodo: AddTodo = newTodo => {
    fetch(`${getDomain()}/addtodo`, { ...HTTP_OPTIONS(PROTOCOL_METHOD.POST), body: JSON.stringify(newTodo) })
      .then(response => response.json())
      .then(response => {
        if (!response.success) {
          console.error(response);
        }
      })
      .catch(error => {
        console.error("Some error occured", error);
      });
    fetchListItems();
  }

  const deleteTodo: DeleteTodo = todoid => {
    fetch(`${getDomain()}/deletetodo/${todoid}`, { ...HTTP_OPTIONS(PROTOCOL_METHOD.DELETE), body: todoid })
      .then(response => response.json())
      .then(response => {
        if (!response.success) {
          console.error(response);
        }
      })
      .catch(error => {
        console.error("Some error occured", error);
      });
    fetchListItems();
  }

  const sendAddTodo = (newTodo: Todo) => {

  }

  const fetchListItems = () => {
    fetch(`${getDomain()}/getalltodos`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          setTodos(response.data.dbQueryResult);
        }
      })
      .catch(error => {
        console.error("Some error occured", error);
      });
  }

  useEffect(fetchListItems, []);
  return (
    <>
      <Title>Axelra Trello Challenge</Title>
      {
        todos.length ?
          <Container>
            <h1>In Progress</h1>
            <React.Fragment>
              <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
              <AddTodoForm addTodo={addTodo} />
            </React.Fragment>
          </Container> :
          <p>Loading...</p>
      }
    </>
  );
};

export default AxelraTrello;
