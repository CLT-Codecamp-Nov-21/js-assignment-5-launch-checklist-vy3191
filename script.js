
window.addEventListener("load", function() { 
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (results) {
       const { name, image, moons, star, distance, diameter } =  pickPlanet(results);

       addDestinationInfo(document, name, diameter, star, distance, moons, image);
   }) ;

   const form = document.querySelector('form');
   
   form.addEventListener('submit', function(event) {
       event.preventDefault();

       const list = document.getElementById("faultyItems")
       const pilot = document.querySelector('input[name="pilotName"]');
       const copilot = document.querySelector('input[name="copilotName"]');
       const fuelLevel = document.querySelector('input[name="fuelLevel"]');
       const cargoLevel = document.querySelector('input[name="cargoMass"]');
    
       formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel)
   })
});
