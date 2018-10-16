const showDepartures = () => {
    var theDiv = document.querySelector('#the-div');
    var theList = document.querySelector('#the-list');

    var stationAbbr = document.getElementById("station").value;
    //document.getElementById("the-text").innerHTML = x;


    // theList.innerHTML ='';

    var theStations = document.querySelector('#the-stations');
    //var justRan = false;

    //    justRan = true;
    //    timesRun += 1; 


        var theText = document.querySelector('#the-text'); 


/*  
        //Presents list of stations
      
        axios.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y").then(result => {
              
               var testStation = result.data.root.stations.station[0].name; 
               console.log(testStation);
               
               var bartStations = result.data.root.stations.station; 

               //console.log(abbrStations);
               bartStations.forEach(element => { 
                var listStation = document.createElement('li');
                listStation.innerHTML = element.abbr + ": " + element.name;
                theStations.appendChild(listStation);
               
           })

        })
        
*/
        //Presents list of each train and its times departing

        axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`).then(result => {            
            var data = result.data.root.station[0].etd;
            console.log(data);
            while (theList.hasChildNodes()) {
                theList.removeChild(theList.firstChild);
            }
                theText.innerHTML =
                    'As of ' + result.data.root.time 
                    //+ ' ' + result.data.root.date 
                    + ', ' 
                    + 'trains are departing from '
                    + result.data.root.station[0].name  
                    + ' for:';

            // result.data.root.station[0].name 
            data.forEach (element => { 
 
                var listItem = document.createElement('li');
                var theTimes = element.destination + ': \t ';
                
                for (var i=0; i<element.estimate.length; i++) {
                    
                    if (element.estimate.length == 1 && element.estimate[i].minutes == 'Leaving') {
                        theTimes += element.estimate[i].minutes;
                        theTimes += " now.";
                    } else if (element.estimate.length == 1) {
                        theTimes += element.estimate[i].minutes;
                        theTimes += " minutes from now.";
                    } else if (i < (element.estimate.length - 1)) {
                        theTimes += element.estimate[i].minutes;
                        theTimes += ", ";
                    } else {
                        theTimes += "and ";
                        theTimes += element.estimate[i].minutes;
                        //theTimes += "."
                        theTimes += " minutes from now.";
                    }
                }
                
                //listItem.innerHTML='';
                listItem.innerHTML = theTimes;
                theList.appendChild(listItem);
                //console.log(theTimes);
                //console.log(listItem.innerHTML);
            })
            
        })
           
    
  
    //theText.innerHTML='yayay';

}
const doStuff = () => { 
    document.addEventListener('click', showDepartures);

}
document.addEventListener('DOMContentLoaded', doStuff);


 