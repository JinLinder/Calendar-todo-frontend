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
        < >
            <p> <strong>Title:</strong>  {props.title} <strong>Deadline:</strong>  {props.end} <button onClick={onSubmit}>Finished</button></p>
                
            
        </>
    )
}