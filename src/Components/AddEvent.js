import React, {useState} from 'react';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';


const AddEvent = (props)=> {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    
    const handleAddEvent=(evt)=>{
       evt.preventDefault();
        //post data to mongoDB
      console.log("newEvent", newEvent);
       axios
       .post('http://localhost:5000/event/add', newEvent)
       .then(res=> {
        console.log("PostData", res.data)
       })
       .catch(error => {
         console.log("error:", error);
       })      
       //add data to state in app.js
        props.addEvent(newEvent)      
    }

    return (
        <div>
            <h4>Add new to do list:</h4>
                <label>Title:</label>
                <input type="text" placeholder="Add Title" 
                  style={{ width: "20%", marginRight: "10px" }} 
                  value={newEvent.title} onChange={(e) => 
                  setNewEvent({ ...newEvent, title: e.target.value,  id:uuidv4()})} /> <br/>

                <label>Start date:</label>
                 <input type="date" id="date" 
                    value={newEvent.start} 
                    onChange={(e) => 
                        setNewEvent({ ...newEvent, start: e.target.value })}/> <br />

                <label>End date:</label>
                <input type="date" id="date" 
                    value={newEvent.end} 
                    onChange={(e) => 
                        setNewEvent({ ...newEvent, end: e.target.value })}/> <br /> 


                <button stlye={{ marginTop: "10px" }} 
                  onClick={handleAddEvent}>
                    Add
                </button>
        </div>
    )
}

export default AddEvent

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