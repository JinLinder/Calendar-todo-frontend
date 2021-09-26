import axios from 'axios'

const DeleteDb = (id)=> {
    axios.delete(`http://localhost:5000/event/delete/${id}`)
        .then(()=>console.log("deleted"))
}

export default DeleteDb