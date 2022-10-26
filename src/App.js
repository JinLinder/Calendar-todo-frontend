import "./App.css";
import React, { useState, useEffect } from "react";
import Mycalendar from "./Components/Mycalendar";
import GetEvent from "./Components/GetEvents";
import AddEvent from "./Components/AddEvent";
import ShowTodo from "./Components/ShowTodo";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: auto auto;
  };
  .list{
    text-align:center;
    
  }
`;

function App() {
  const [allEvents, setAllEvents] = useState([]);

  //get all old events from mongoDB
  useEffect(() => {
    GetEvent((data) => {
      console.log("Get events from DB:  ", data);
      setAllEvents(data);
    });
  }, []);

  // add new event
  const addEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
    console.log("newEvent", newEvent);
  };

  //delete finished event
  const deleteEvent = (event) => {
    console.log("event from app.js", event);
    setAllEvents(allEvents.filter((i) => i !== event));
  };

  // sort events according to deadline(end)
  const todoList = allEvents.sort(function (a, b) {
    var c = new Date(a.end);
    var d = new Date(b.end);
    return c - d;
  });

  return (
    <Content className="App">
      <div className="calendar">
        <AddEvent addEvent={addEvent} />
        <Mycalendar allEvents={allEvents} />
      </div>
      <div className="list">
        <h4>My to do list:</h4>
        {todoList.map((event) => (
          <ShowTodo
            key={event.id}
            allEvents={allEvents}
            event={event}
            title={event.title}
            // end={Object.values(event.end)}
            id={event._id}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    </Content>
  );
}

export default App;
