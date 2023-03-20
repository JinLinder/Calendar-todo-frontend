import axios from "axios";

const DeleteDb = (id) => {
  axios
    .delete(`http://localhost:5000/event/delete/${id}`)
};

export default DeleteDb;
