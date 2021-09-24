const autocompleteFeatures = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicnl1LWp1IiwiYSI6ImNrdHZpemdxbTBrcHEycG1td3VycjVudGQifQ.a-gbraL7LSdPmys8SqB_-w";
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    // types: "country,region,place,postcode,locality, address",
    countries: "fr",
    placeholder: "Address",
  });

  geocoder.addTo("#geocoder");

  // Get the geocoder results container.
  const results = document.getElementById("result");

  // Add geocoder result to container.
  geocoder.on("result", async (e) => {
    console.log(e.result);
    results.innerText = JSON.stringify(e.result, null, 2);
  });

  // Clear results container when search is cleared.
  geocoder.on("clear", () => {
    results.innerText = "";
  });
};

window.addEventListener("load", autocompleteFeatures);
