import axios from 'axios'

const DeleteDb = (id)=> {
    axios.delete(`https://calendar-back-heroku.herokuapp.com/event/delete/${id}`)
        .then(()=>console.log("deleted"))
}

export default DeleteDb