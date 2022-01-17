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
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {  

    const allEmpty = !pilot && !copilot && !fuelLevel && !cargoMass;
    const launchStatus = document.getElementById("launchStatus");
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");


    if(allEmpty) {
        alert("All fields are required!");
        return;
    }  

    if(validateInput(pilot) !== 'Not a Number' || 
        validateInput(copilot) !== 'Not a Number' || 
        validateInput(fuelLevel) === 'Not a Number' || 
        validateInput(cargoMass) === 'Not a Number') {
            alert("Make sure to enter valid information for each field!");

    }

    const isValidFuel = validateInput(fuelLevel);
    const isValidCargo = validateInput(cargoMass);
    const isValidPilot= validateInput(pilot);
    const isValidCopilot = validateInput(copilot);
    let isFuelCheckDone, cargoCheckDone, isPilotReady, isCopilotReady;

    if(isValidPilot !== 'Empty' && isValidPilot === 'Not a Number') {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        isPilotReady = true;
    }
    
    if(isValidCopilot !== 'Empty' && isValidCopilot === 'Not a Number') {
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        isCopilotReady = true;
    }

    if(isValidFuel === 'Is a Number') {
        if(fuelLevel < 10000) {
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            fuelStatus.innerHTML= "Fuel level too low for launch"
        } else {
            fuelStatus.innerHTML= "Fuel level high enough for launch";
            isFuelCheckDone = true;
        }
    }


    if(isValidCargo === 'Is a Number') {
        if(cargoMass > 10000) {
            cargoStatus.innerHTML = "Cargo mass too heavy for launch"
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            cargoCheckDone = true;
        }
    }

    if(isPilotReady && isCopilotReady && isFuelCheckDone && cargoCheckDone) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "rgb(65, 159, 106)";
    }    

    list.style.visibility = 'visible';
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
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
    // console.log(e)
}
