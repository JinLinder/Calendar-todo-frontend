import axios from 'axios'

const DeleteDb = (id)=> {
    axios.delete(`https://intense-sierra-98550.herokuapp.com/event/delete/${id}`)
        .then(()=>console.log("deleted"))
}

export default DeleteDb