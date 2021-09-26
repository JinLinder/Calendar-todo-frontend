const GetEvent=(cd)=>{

    fetch("http://localhost:5000/event") 
    .then(res => res.json())
    .then( data => {
      console.log("Fetched data: ", data);
      cd(data)
    });
};

export default GetEvent