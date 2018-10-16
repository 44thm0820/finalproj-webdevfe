const doStuff = () => {
    let theDiv = document.querySelector('#the-div');
    let theList = document.querySelector('#the-list');
    let theStations = document.querySelector('#the-stations');

    const handleClick = () => {
        
        text.innerHTML='JavaScript is fun and blue';
        theDiv.style.backgroundColor= 'blue';
        //http://api.bart.gov/docs/overview/examples.aspx
        //key is MW9S-E7SL-26DU-VV8V
       // axios.get("https://jsonplaceholder.typicode.com/users").then(result => {
           axios.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {
              /*
               let testStation = result.data.root.stations.station[0].name; 
               console.log(testStation);
               */
               let bartStations = result.data.root.stations.station; 
               console.log(bartStations);

               bartStations.forEach(element => { 
                let listStation = document.createElement('li');
                listStation.innerHTML = element.name;
                theStations.appendChild(listStation);


           })
        })




      axios.get("http://api.bart.gov/api/etd.aspx?cmd=etd&orig=MONT&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {            
            let data = result.data.root.station[0].etd;
            console.log(data);
            
            data.forEach(element => { 
                let listItem = document.createElement('li');
                let theTimes = element.destination + ' departure times: ';
                for (var i=0; i<element.estimate.length; i++) {
                    
                    if (element.estimate.length == 1) {
                        theTimes += element.estimate[i].minutes;
                    } else if (i < (element.estimate.length - 1)) {
                        theTimes += element.estimate[i].minutes;
                        theTimes += ", ";
                    } else {
                        theTimes += "and ";
                        theTimes += element.estimate[i].minutes;
                        theTimes += " minutes from now.";
                    }
                }
                listItem.innerHTML = theTimes;
                theList.appendChild(listItem);

            })
            
        })
    }
    let text = document.querySelector('#the-text');
    text.innerHTML='JavaScript is fun.<br>Click me to turn blue';
    //console.log('feelin good feelin great');

    theDiv.addEventListener('click', handleClick);
}    
document.addEventListener('DOMContentLoaded', doStuff);





   /*  
   function createListItem (station) {
    return `
      <li class="list-group-item">${station}</li>
    `
  }
  */

  /**
   * This handles the onsubmit on the form.
   * @param {Object} event 
   */
  /*
  function handleSubmit(event) {
    event.preventDefault();
    const make = document.getElementById('station').value;
    const models = document.getElementById("models");
    models.innerHTML = "";
    getStation(station);
  }*/
 /*   
  function getStation(station) {
    axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(results => {
            let data = result.data.root.station[0].etd;
            console.log(data);
            let des = data[1].destination;
            console.log(des);
            data.forEach(element => { 
                let listItem = document.createElement('li');
                let theTimes = element.destination + ' departure times: ';
                for (var i=0; i<element.estimate.length; i++) {
                    if (i < (element.estimate.length - 1)) {
                        theTimes += element.estimate[i].minutes;
                        theTimes += ", ";
                    } else {
                        theTimes += "and ";
                        theTimes += element.estimate[i].minutes;
                        theTimes += " minutes from now.";
                    }
                }
                listItem.innerHTML = theTimes;
                theList.appendChild(listItem);

            }) 
            
    
    })

}
}
getStation();  





*/ 


/*
           axios.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {
              
               let testStation = result.data.root.stations.station[0].name; 
               console.log(testStation);
               
              let bartStations = result.data.root.stations.station; 
              console.log(bartStations);

              bartStations.forEach(element => { 
               let listStation = document.createElement('li');
               listStation.innerHTML = element.name;
               theStations.appendChild(listStation);


          })
       })
       */