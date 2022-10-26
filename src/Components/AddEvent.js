import React, { useState, useEffect } from "react";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AddEvent = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [errorMsgTitle, setErrorMsgTitle] = useState("");
  const [errorMsgStart, setErrorMsgStart] = useState("");
  const [errorMsgEnd, setErrorMsgEnd] = useState("");
  const [errorMsgTime, setErrorMsgTime] = useState("");

  const handleAddEvent = (evt) => {
    evt.preventDefault();
    //post data to mongoDB
    console.log("newEvent", newEvent);
    if (Date.parse(newEvent.start) > Date.parse(newEvent.end)) {
      console.log("wrong");
      setErrorMsgTime("Deadline can not be earlier than start date.")
    } else {
      console.log("Right");
    }
    // if (newEvent.title === "") {
    //   console.log("Please fill in title.");
    // } else if (newEvent.start === "") {
    //   console.log("Please fill in start time.");
    // } else if (newEvent.end === "") {
    //   console.log("Please fill in due time.");
    // } else if (
    //   newEvent.title !== "" &&
    //   newEvent.start !== "" &&
    //   newEvent.end !== ""
    // ) {
    //   console.log("Post success!");
    // }
    // axios
    //   .post("https://calendar-back-heroku.herokuapp.com/event/add", newEvent)
    //   .then((res) => {
    //     console.log("PostData", res.data);
    //   })
    //   .catch((error) => {
    //     console.log("error:", error);
    //   });
    // //add data to state in app.js
    // props.addEvent(newEvent);
  };
  useEffect(() => {
    if (errorMsgTime !== "") {
      console.log("POST");
    } else {console.log("CAN NOT POST");}
  }, [errorMsgTime]);

  // var date = new Date().toISOString().slice(0, 10);
  const disableDates = () => {
    var today, dd, mm, yyyy, hh;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    // tzo = new Date().getTimezoneOffset() / 60;
    hh = today.getHours() + 1;

    return yyyy + "-" + mm + "-" + dd + "T" + hh + ":00:00";
  };

  // const disableTime = () => {
  //   var tzo = new Date().getTimezoneOffset();
  //   return tzo;
  // };
  // console.log(disableDates());

  // console.log(new Date().toISOString());
  // console.log(new Date());
  const validation = (e) => {
    let name = e.target.name;
    if (e.target.value === "") {
      if (name === "title") {
        setErrorMsgTitle("Please fill in the title.");
        console.log("Please fill in the title.");
      } else if (name === "start") {
        setErrorMsgStart("Please fill in the start time.");
        console.log("Please fill in the start time.");
      } else if (name === "end") {
        setErrorMsgEnd("Please fill in the deadline.");
        console.log("Please fill in the deadline.");
      }
    } else if (Date.parse(newEvent.start) > Date.parse(newEvent.end)) {
      setErrorMsgTitle("");
      setErrorMsgStart("");
      setErrorMsgEnd("");
    }
  };
  return (
    <div>
      <h2>Add new to do list:</h2>
      <label>Title:</label>
      <input
        name="title"
        type="text"
        placeholder="Add Title"
        style={{ width: "20%", marginRight: "10px" }}
        value={newEvent.title}
        onChange={(e) => {
          validation(e);
          setNewEvent({ ...newEvent, title: e.target.value, id: uuidv4() });
        }}
      />
      {errorMsgTitle ? (
        <span style={{ color: "red" }}>{errorMsgTitle}</span>
      ) : (
        <span></span>
      )}
      <br />
      <label>Start date:</label>
      <input
        type="datetime-local"
        id="date"
        name="start"
        // min={disableDates()}
        min="2022-10-25T18:00:00"
        value={newEvent.start}
        onChange={(e) => {
          validation(e);
          setNewEvent({ ...newEvent, start: e.target.value });
        }}
      />
      {errorMsgTitle ? (
        <span style={{ color: "red" }}>{errorMsgStart}</span>
      ) : (
        <span></span>
      )}
      <br />
      <label>End date:</label>
      <input
        type="datetime-local"
        id="date"
        name="end"
        value={newEvent.end}
        onChange={(e) => {
          validation(e);
          setNewEvent({ ...newEvent, end: e.target.value });
        }}
      />
      {errorMsgTitle ? (
        <span style={{ color: "red" }}>{errorMsgEnd}</span>
      ) : (
        <span></span>
      )}
      <br />
      {newEvent.title !== "" && newEvent.start !== "" && newEvent.end !== "" ? (
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add
        </button>
      ) : (
        <button>Grey</button>
      )}
          {errorMsgTime ? 
        <span style={{ color: "red" }}>{errorMsgTime}</span>
       : 
        <span></span>
      }
    </div>
  );
};

export default AddEvent;

// useEffect(()=>{
//   GetEvent((data)=>{
//     console.log("GetEvent:  ", data);
//     setAllEvents([...allEvents, data]);
//
//   })
// }, [])

//Fetch:
// useEffect(()=>{
//   PostEvent((data) => {
//   console.log("PostEvent:  ", data);
//   })}, []
// )

//   useEffect(() => {

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'testEvent3', start:"2021-09-03", end: "2021-09-05" })
//     };
//     fetch('http://localhost:5000/event/add', requestOptions)
//         .then(response => response.json())
//         .then(data => setNewEvent([...newEvent, data]));

// }, []);
