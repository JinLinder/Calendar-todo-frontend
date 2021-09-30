const GetEvent=(cd)=>{

    fetch("https://intense-sierra-98550.herokuapp.com/event") 
    .then(res => res.json())
    .then( data => {
      console.log("Fetched data: ", data);
      cd(data)
    });
};

export default GetEvent