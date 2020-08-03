import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성하기" done />
      <TodoItem text="리액트 마스터" done={false} />
      <TodoItem text="취업하기" done={false} />
      <TodoItem text="이력서 작성하기" done />
    </TodoListBlock>
  );
}

export default TodoList;
