// Write your helper functions here!
try {
    require('isomorphic-fetch');
} catch(error) {
    console.error(error);
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const destination = document.getElementById("missionTarget");
   destination.innerHTML = `   
        <h2>Mission Destination</h2>
        <ol>
            <li>Name:${name} </li>
            <li>Diameter:${diameter} </li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance} </li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `   
}

function validateInput(testInput) {
    console.log('test input', testInput);
    if(!testInput.value) {

        window.alert(`${testInput.name} is required.`)
        return false;

    } else {
        if(testInput.name === 'fuelLevel' || 
            testInput.name === 'cargoMass') {
                if(isNaN(parseInt(testInput.value))) {
                    window.alert(`${testInput.name} needs to be a number.`)
                    return false;
                }

                if(testInput.name === 'fuelLevel') {
                    if (parseInt(testInput.value) < 10000) {
                        return true;                        
                    } 

                    return false;
                }
        }
    }

    return true;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {  
    let isNotEnough;  
    const allFields = !pilot.value && 
                    !copilot.value && 
                    !fuelLevel.value && 
                    !cargoLevel.value;

    if(allFields) {
        window.alert('All fields are required.');
    } else {
        validateInput(pilot);
        validateInput(copilot);
        validateInput(cargoLevel);
        isNotEnough = validateInput(fuelLevel);
    }
    
   
    const h1 = document.getElementById("launchStatus")   

   if(!isNaN(parseInt(fuelLevel.value))) {    
        
        const pilotDetails = document.getElementById("pilotStatus")
        const copilotDetails = document.getElementById("copilotStatus")
        const fuelStatus = document.getElementById("fuelStatus")
        const cargoStatus = document.getElementById("cargoStatus")

        pilotDetails.innerHTML = `${pilot.value} is ready for launch.`;
        copilotDetails.innerHTML = `${copilot.value} is ready for launch`;
        cargoStatus.innerHTML = 'Cargo mass low enough for launch.'
        list.style.visibility = "visible";
    
        if(isNotEnough) {
            h1.innerHTML = 'Shuttle Not Ready for Lauch.'
            h1.style.color = '#FF0000';
            fuelStatus.innerHTML = 'Fuel level too low for launch.'
        } else {
            h1.innerHTML = 'Shuttle is Ready for Lauch now.'
            h1.style.color = '#00FF00';
            fuelStatus.innerHTML = 'Fuel level is enough for launch.'
        }
    } else {
        list.style.visibility = "hidden";
        h1.innerHTML = 'Awaiting Information Before Launch.'
        h1.style.color = "#000000";
    }

     
}

async function myFetch() {
    let planetsReturned;
    const url = 'https://handlers.education.launchcode.org/static/planets.json'
    planetsReturned = await fetch(url).then(function(response) {
            return  response.json();
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    const index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

try {
    module.exports.addDestinationInfo = addDestinationInfo;
    module.exports.validateInput = validateInput;
    module.exports.formSubmission = formSubmission;
    module.exports.pickPlanet = pickPlanet; 
    module.exports.myFetch = myFetch;
} catch(e) {
    console.error(e)
}
