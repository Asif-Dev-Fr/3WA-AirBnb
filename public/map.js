// const mapboxgl  = require("mapbox-gl");
// const Estate = require("../src/models/Estate");

const initMap = async () => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [2.25978638521092, 46.79052544169729], // starting position [lng, lat]
    zoom: 4, // starting zoom
  });

  // Zoom option
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "bottom-right");

  const data = await fetch("http://localhost:3000/api/estates");
  const estates = await data.json();
  console.log(estates);

  // // Create a new marker.
  // const marker = new mapboxgl.Marker({
  //   color: "#000000",
  //   // draggable: true,
  // })
  //   .setLngLat([2.25978638521092, 46.79052544169729])
  //   .addTo(map);

  // set multiple markers :
  for (const { lat, lng } of estates) {
    // make a marker for each feature and add to the map
    new mapboxgl.Marker({ color: "#000000" }).setLngLat([lng, lat]).addTo(map);
  }
};

window.addEventListener("load", initMap);
