let map = new mapboxgl.Map({/* map options */});

// When a click event occurs near a place, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', 'places', function (e) {
    var clickedMarker = e.features[0];

    const mapDiv = document.getElementById('map');
    const containerDiv = mapDiv.parentElement;
  
    // Change the class of the container div to modify its width and position
    containerDiv.className = "grid-margin stretch-card";
    mapDiv.className = "small"; // This will apply the CSS defined above
});

// On close button click
closeBtn.addEventListener('click', function() {
    const mapDiv = document.getElementById('map');
    const containerDiv = mapDiv.parentElement;

    // Return the container div to its original width and position
    containerDiv.className = "col-lg-12 grid-margin stretch-card";
    mapDiv.className = ""; // This will remove the CSS defined above
});