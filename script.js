
window.addEventListener("load", function() { 
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (results) {
       const { name, image, moons, star, distance, diameter } =  pickPlanet(results);

       addDestinationInfo(document, name, diameter, star, distance, moons, image);
   }) ;

   const form = document.querySelector('form');
   const list = document.getElementById("faultyItems");
   list.style.visibility = 'hidden';
   
   form.addEventListener('submit', function(event) {
       event.preventDefault();

       const pilot = document.querySelector('input[name="pilotName"]').value;
       const copilot = document.querySelector('input[name="copilotName"]').value;
       const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
       const cargoMass = document.querySelector('input[name="cargoMass"]').value;
    
       formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass)
   })
});
