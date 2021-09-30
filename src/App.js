import './App.css';
import React, { useState, useEffect } from "react";
import Mycalendar from './Components/Mycalendar';
import GetEvent from './Components/GetEvents';
import AddEvent from './Components/AddEvent';
import ShowTodo from './Components/ShowTodo';

function App() {

  const [allEvents, setAllEvents] = useState([]);

    //get all old events from mongoDB
    useEffect(()=>{
      GetEvent((data)=>{
        console.log("Get events from DB:  ", data);
        setAllEvents(data);
        
      })
    }, [])

    // add new event 
    const addEvent = (newEvent) =>{
      setAllEvents([...allEvents, newEvent]);
      console.log("newEvent", newEvent);
  }

    //delete finished event
    const deleteEvent = (event)=>{
      console.log("event from app.js", event)      
      setAllEvents(allEvents.filter(i => i !== event ))
    }

     // sort events according to deadline(end)
     const todoList = allEvents.sort(function (a, b){
      var c = new Date(a.end);
      var d = new Date(b.end);
      return c-d;
      })

  return (
    <div className="App">
      <h4>My to do list:</h4>
        {todoList.map((event)=><ShowTodo key={event.id}
            allEvents={allEvents}
            event={event}
            title={event.title} 
            end={Object.values(event.end)}
            id={event.id}
            deleteEvent={deleteEvent}
        /> )}
      <AddEvent addEvent={addEvent}/>
      <h1>Calendar</h1>
      <Mycalendar allEvents={allEvents}/>      
    </div>
  );
}

export default App;
