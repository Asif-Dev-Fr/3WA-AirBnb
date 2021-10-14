const initMap = async () => {
    mapboxgl.accessToken = "pk.eyJ1Ijoicnl1LWp1IiwiYSI6ImNrdW1oNzFjeTBlZWcyb3BpN2Uyb20wY2UifQ.dk4555ZgzCde7ihZsIqktQ";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [2.25978638521092, 46.79052544169729], // starting position [lng, lat]
      zoom: 7, // starting zoom
    });

    // Zoom option
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");

    const data = await fetch("http://localhost:3000/api/estates");
    const estates = await data.json();

    // Create a new marker.
    const marker = new mapboxgl.Marker({
      color: "#000000",
      // draggable: true,
    })
      .setLngLat([2.25978638521092, 46.79052544169729])
      .addTo(map);
  };

  window.addEventListener("load", initMap);
