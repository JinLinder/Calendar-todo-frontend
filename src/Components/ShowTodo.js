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
            <p> Title: {props.title};
                Deadline: {props.end} 
                <button onClick={onSubmit}>Finished</button>
            </p>
        </>
    )
}