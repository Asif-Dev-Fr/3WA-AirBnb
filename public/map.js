const initMap = async () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicnl1LWp1IiwiYSI6ImNrdW1oNzFjeTBlZWcyb3BpN2Uyb20wY2UifQ.dk4555ZgzCde7ihZsIqktQ";

  const id = document.getElementById("estateId");

  if (id && id.dataset && id.dataset.estateLng && id.dataset.estateLng) {
    const lat = id.dataset.estateLat;
    const lng = id.dataset.estateLng;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // Create a new marker.
    new mapboxgl.Marker({
      color: "#000000",
      // draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map);
      
    // Zoom option
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
  } else {
    // Homepage with all estate
    const data = await fetch("http://localhost:3000/api/estates");
    const estates = await data.json();

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [2.25978638521092, 46.9952544169729], // starting position [lng, lat]
      zoom: 4.4, // starting zoom
    });

    // set multiple markers :
    let latitude;
    let longitude;
    for (const { lat, lng, name, address, zipCode, price, _id } of estates) {
      // make a marker for each feature and add to the map
      latitude = lat;
      longitude = lng;
      const description = `<a style="color: black;" href="/estate/${_id}"><strong>${name}</strong> ${address} ${zipCode} ${price}€</a>`;
      new mapboxgl.Marker({ color: "#000000" })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(description))
        .addTo(map);
      // const description = { name, address, zipCode, price };
      // new mapboxgl.Popup()
      // .setLngLat([lng, lat])
      // .setHTML(description)
      // .addTo(map);
    }
    // Zoom option
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
  }

  
};

window.addEventListener("load", initMap);
