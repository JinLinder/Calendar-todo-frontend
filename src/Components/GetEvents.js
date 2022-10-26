const GetEvent=(cd)=>{

    fetch("https://calendar-back-heroku.herokuapp.com/event") 
    .then(res => res.json())
    .then( data => {
      console.log("Fetched data: ", data);
      cd(data)
    });
};

export default GetEvent