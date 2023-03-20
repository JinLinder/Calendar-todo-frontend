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
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto auto;
  };
  .list{
    text-align:center;
    background-color: #e4e4e4;
  }
`;

function App() {
  const [allEvents, setAllEvents] = useState([]);

  //get all old events from mongoDB
  useEffect(() => {
    GetEvent((data) => {
      setAllEvents(data);
    });
  }, []);

  // add new event
  const addEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  //delete finished event
  const deleteEvent = (event) => {
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
            end={event.end}
            id={event._id}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    </Content>
  );
}

export default App;
