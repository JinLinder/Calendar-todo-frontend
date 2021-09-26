import './App.css';
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Mycalendar from './Components/Mycalendar';
import GetEvent from './Components/GetEvents';
import AddEvent from './Components/AddEvent';
import ShowTodo from './Components/ShowTodo';

// import DeleteDb from './Components/DeleteDb'

Modal.setAppElement('#root');
function App() {

  const [allEvents, setAllEvents] = useState([
    // { title: 'event 1', start: '2021-09-01', end: '2021-09-03' },
    // { title: 'event 2', start: '2021-09-01', end: '2021-09-03' }
  ]);

  //const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})

    //get all old events from mongoDB
    useEffect(()=>{
      GetEvent((data)=>{
        console.log("Get events from DB:  ", data);
        setAllEvents(data);
        
      })
    }, [])

    // add new event 
    // useEffect(()=>{
      
    // })
    const addEvent = (newEvent) =>{
      setAllEvents([...allEvents, newEvent]);
      console.log("newEvent", newEvent);
  }

    //delete finished event
    const deleteEvent = (event)=>{
      console.log("event from app.js", event)      
      setAllEvents(allEvents.filter(i => i !== event ))
    }

  return (
    <div className="App">
      <h3>My to do list:</h3>
      {allEvents.map((event)=><ShowTodo key={event.title}
              allEvents={allEvents}
              event={event}
              title={event.title} 
              end={Object.values(event.end)}
              id={event._id}
              deleteEvent={deleteEvent}
              /> )}
      <AddEvent addEvent={addEvent}/>
      <h1>Calendar</h1>
      <Mycalendar allEvents={allEvents}/>
      
      
        
    </div>
  );
}

export default App;
