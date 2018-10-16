const showDepartures = () => {
    let theDiv = document.querySelector('#the-div');
    let theList = document.querySelector('#the-list');
    let stationAbbr = document.getElementById("station").value;
    let theStations = document.querySelector('#the-stations');
    let theText = document.querySelector('#the-text'); 

        //Presents list of each train and its times departing

        axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`).then(result => {            
            let data = result.data.root.station[0].etd;
            console.log(data);
            while (theList.hasChildNodes()) {
                theList.removeChild(theList.firstChild);
            }
            theText.innerHTML =
                    'As of ' + result.data.root.time 
                    + ', ' 
                    + 'trains are departing from '
                    + result.data.root.station[0].name  
                    + ' for:';

            data.forEach (element => { 
 
            let listItem = document.createElement('li');
            let theTimes = element.destination + ': \t ';
                
            for (let i=0; i<element.estimate.length; i++) {
                    
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
                        theTimes += " minutes from now.";
                    }
                }
            listItem.innerHTML = theTimes;
            theList.appendChild(listItem);

            })            
        })           
}

const doStuff = () => { 
    document.addEventListener('click', showDepartures);
} 
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let meridian = "AM"
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    newHour = convertTime(h);
    if (h>=12) {
        meridian = " PM";

    }
    document.getElementById('clock').innerHTML = "Time now is " + newHour + ":" + m + ":" + s + meridian + " PDT.";
    t = setTimeout('startTime()', 500);
  }
  
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function convertTime(x) {
    if (x > 12) {
      x = x - 12;
    }
    if (x == 0) {
      x = 12;
    }
    return x;
  }
document.addEventListener('DOMContentLoaded', doStuff);


 