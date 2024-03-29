import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import styled from "styled-components";

const CalendarWrapper = styled.div`
  @media screen and (min-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
  @media screen and (min-width: 1024px) {
    margin: 50px;
  }
  @media screen and (max-width: 425px) {
    transform: scale(0.90);
    padding: 0px;
    margin: 10px 0 0;
  }
  padding: 10px;
  margin: 10px;
`;

export default function Mycalendar(props) {
  return (
    <CalendarWrapper className="calendarWrapper">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={props.allEvents}
      />
    </CalendarWrapper>
  );
}
