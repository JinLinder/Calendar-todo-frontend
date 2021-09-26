import DeleteDb from './DeleteDb';
import React from 'react'


export default function ShowTodo(props) {
 

    const onSubmit = (evt) => {
        evt.preventDefault();
         DeleteDb(props.id);
        props.deleteEvent(props.event)
        console.log("props.id", props.id); 
        

    }

    return (
        <div >
            <p>Title: {props.title}</p>
            <p>ID: {props.id}</p>
            <p>Deadline: {props.end} <button onClick={onSubmit}>Finished</button></p>
        </div>
    )
}