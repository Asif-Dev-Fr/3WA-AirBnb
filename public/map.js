const initMap = async () => {
  mapboxgl.accessToken = "pk.eyJ1Ijoicnl1LWp1IiwiYSI6ImNrdW1oNzFjeTBlZWcyb3BpN2Uyb20wY2UifQ.dk4555ZgzCde7ihZsIqktQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [2.25978638521092, 46.9952544169729], // starting position [lng, lat]
    zoom: 4.4, // starting zoom
  });

  // Zoom option
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "bottom-right");

  const data = await fetch("http://localhost:3000/api/estates");
  const estates = await data.json();
  for (const { lat, lng, name, address, zipCode, price, _id } of estates) {
    // make a marker for each feature and add to the map
    latitude = lat;
    longitude = lng
    const description = `<a style="color: black;" href="/estate/${_id}"><strong>${name}</strong> ${address} ${zipCode} ${price}€</a>`
    new mapboxgl.Marker({ color: "#000000" }).setLngLat([lng, lat]).setPopup(new mapboxgl.Popup().setHTML(description)).addTo(map);
  };


};

window.addEventListener("load", initMap);
