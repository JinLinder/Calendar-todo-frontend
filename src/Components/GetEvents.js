const GetEvent=(cd)=>{

    fetch("http://localhost:5000/event") 
    .then(res => res.json())
    .then( data => {
      cd(data)
    });
};

export default GetEvent