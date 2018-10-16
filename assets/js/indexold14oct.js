var timesRun = 0;

const doStuff = () => {
    var theDiv = document.querySelector('#the-div');
    var theList = document.querySelector('#the-list');
    // theList.innerHTML ='';

    var theStations = document.querySelector('#the-stations');
    //var justRan = false;

    //    justRan = true;
    //    timesRun += 1; 

    const handleSubmit = () => {
        console.log("handleSubmit works!");
        text.innerHTML='JavaScript is fun and blue.<br>Times run =' + timesRun;
        theDiv.style.backgroundColor= 'blue';

        //Presents list of stations
        
        axios.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {
              
               //var testStation = result.data.root.stations.station[0].name; 
               //console.log(testStation);
               
               var bartStations = result.data.root.stations.station; 

               //console.log(abbrStations);
               bartStations.forEach(element => { 
                var listStation = document.createElement('li');
                listStation.innerHTML = element.abbr + ": " + element.name;
                theStations.appendChild(listStation);
               
           })

        })
        

        //Presents list of each train and its times departing

        axios.get("http://api.bart.gov/api/etd.aspx?cmd=etd&orig=MONT&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {            
            var data = result.data.root.station[0].etd;
            console.log(data);
            
            data.forEach(element => { 
 
                var listItem = document.createElement('li');
                var theTimes = element.destination + ' departure times: ';
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
                listItem.innerHTML='';
                listItem.innerHTML = theTimes;
                theList.appendChild(listItem);
                //console.log(theTimes);
                //console.log(listItem.innerHTML);
            })
            
        })
           
    }
    var text = document.querySelector('#the-text');
    text.innerHTML='yayay';
    theDiv.addEventListener('submit', handleSubmit);
}
document.addEventListener('DOMContentLoaded', doStuff);


 