import DeleteDb from "./DeleteDb";
import React from "react";
import { Trash } from "react-bootstrap-icons";
import styled from "styled-components";

const TodoItem = styled.p`
background-color: #c0ccd7;
 padding: 10px 5px;
border-radius:5px;
 width: 95%;
 margin: 10px auto;
  .delIcon {
    display: none;
    padding-left: 5px;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  &:hover {
    cursor: pointer;
    .delIcon {
      display: inline;
    }
  }
`;


export default function ShowTodo(props) {
  const onSubmit = (evt) => {
    evt.preventDefault();
    DeleteDb(props.id);
    props.deleteEvent(props.event);
    console.log("props.id", props.id);
  };
  const date = props.end.slice(0, 10);
  console.log(date);
  const time = props.end.slice(11, 16);
  console.log(time);
  console.log(props.end);
  return (
    <TodoItem className="todoItem">
      {props.title}<br/> Due: {date} at {time}
      <Trash className="delIcon" onClick={onSubmit} />
    </TodoItem>
  );
}
