import React, { useState, useEffect } from "react";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const AddEvent = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [errorMsgTitle, setErrorMsgTitle] = useState("");
  const [errorMsgStart, setErrorMsgStart] = useState("");
  const [errorMsgEnd, setErrorMsgEnd] = useState("");
  const [errorMsgTime, setErrorMsgTime] = useState("");

  const CreateBtn = styled.button`
    background: #2c3e50;
    color: #fff;
    padding: 10px 20px;
    border-radius: 0.25em;
    border: none;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  `;
  const CreateDisable = styled.button`
    background: #2c3e50;
    color: #fff;
    opacity: 0.3;
    padding: 10px 20px;
    border-radius: 0.25em;
    border: none;
  `;

  const handleAddEvent = (evt) => {
    evt.preventDefault();
    //post data to mongoDB
    if (Date.parse(newEvent.start) > Date.parse(newEvent.end)) {
      setErrorMsgTime("Deadline can not be earlier than start date.");
    } else {
      setErrorMsgTime("");
      setNewEvent({ title: "", start: "", end: "" })
      axios
        .post("http://localhost:5000/event/add", newEvent)
        .then((res) => {
        })
        .catch((error) => {
        });
      //add data to state in app.js
      props.addEvent(newEvent);
    };
    
  };


  const disableDates = () => {
    var today, dd, mm, yyyy, hh;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    hh = today.getHours() + 1;
    return yyyy + "-" + mm + "-" + dd + "T" + hh + ":00:00";
  };

  const validation = (e) => {
    let name = e.target.name;
    if (e.target.value === "") {
      if (name === "title") {
        setErrorMsgTitle("Please fill in the title.");
      } else if (name === "start") {
        setErrorMsgStart("Please fill in the start time.");
      } else if (name === "end") {
        setErrorMsgEnd("Please fill in the deadline.");
      }
    } else {
      setErrorMsgTitle("");
      setErrorMsgStart("");
      setErrorMsgEnd("");
    }
  };

  const errorMsg = () => {
    if (errorMsgTitle) {
      return <p style ={{color:"red", margin:"0px"}}>{errorMsgTitle}</p>;
    } else if (errorMsgStart) {
      return <p style ={{color:"red", margin:"0px"}}>{errorMsgStart}</p>;
    } else if (errorMsgEnd) {
      return <p style ={{color:"red", margin:"0px"}}>{errorMsgEnd}</p>;
    } else if (errorMsgTime) {
      return <p style ={{color:"red", margin:"0px"}}>{errorMsgTime}</p>;
    }
  };
  var media = window.matchMedia("(max-width: 768px)");

  const useCurrentWidth = ()=>{
    let [width, setWidth] = useState(media.matches);

    useEffect(() => {
      const resizeListener = () => {
        setWidth(media.matches);
      };

      window.addEventListener("resize", resizeListener);
    }, []);
    return width;
  };

  let width = useCurrentWidth();


  return (
    <div>
      <h4>Add a new to do</h4>
      <div className="displayWrapper" style={{display:"flex",
       flexDirection: width ? "column" : "row", justifyContent:"center"}}>
        <div style={{padding:"5px"}} className="inputWrapper">
          <label>Title:</label>
          <span style={{ color: "red" }}>* </span>
          <input
            name="title"
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) => {
              setNewEvent({ ...newEvent, title: e.target.value, id: uuidv4() });
              validation(e);
            }}
          />
        </div>
        <div style={{padding:"5px"}}className="inputWrapper">
          <label>Start date:</label>
          <span style={{ color: "red" }}>* </span>
          <input
            type="datetime-local"
            id="date"
            name="start"
            min={disableDates()}
            value={newEvent.start}
            onChange={(e) => {
              setNewEvent({ ...newEvent, start: e.target.value });
              validation(e);
            }}
          />
        </div>
        <div style={{padding:"5px"}} className="inputWrapper">
          <label>End date:</label><span style={{ color: "red" }}>* </span>
          <input
            type="datetime-local"
            id="date"
            name="end"
            min={disableDates()}
            value={newEvent.end}
            onChange={(e) => {           
              setNewEvent({ ...newEvent, end: e.target.value });
              validation(e);
            }}
          />
        </div>
      </div>
      {errorMsg()}
      <br />
      {newEvent.title !== "" && newEvent.start !== "" && newEvent.end !== "" ? (
        <CreateBtn onClick={handleAddEvent}>Add</CreateBtn>
      ) : (
        <CreateDisable>Add </CreateDisable>
      )}
    </div>
  );
};

export default AddEvent;
