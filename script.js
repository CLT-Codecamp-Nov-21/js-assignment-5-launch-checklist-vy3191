
window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let targetPlanet = pickPlanet(listedPlanets);
       const { name, image, moons, star, distance, diameter } = targetPlanet;
       addDestinationInfo(document, name, diameter, star, distance, moons, image)

       console.log('targetPlanet>>>', targetPlanet)

   })
   
});