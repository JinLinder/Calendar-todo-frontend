import DeleteDb from "./DeleteDb";
import React from "react";
import { Trash } from "react-bootstrap-icons";

export default function ShowTodo(props) {
  const onSubmit = (evt) => {
    evt.preventDefault();
    DeleteDb(props.id);
    props.deleteEvent(props.event);
    console.log("props.id", props.id);
  };
  // const date=props.end.slice(0, 10)
  // console.log(date)
  // const time= props.end.slice(11, 16)
  // console.log(time)
  return (
      <p>
        {props.title}
        {/* {props.title}; <strong>Due time:</strong> {date} cl.{time}
   <Trash onClick={onSubmit}/>
        <button onClick={onSubmit}>Finished</button> */}
      </p>
  );
}
