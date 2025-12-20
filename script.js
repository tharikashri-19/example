let watchId;
let startLat, startLon;

function startTrip() {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        startLat = position.coords.latitude;
        startLon = position.coords.longitude;

        document.getElementById("lat").innerText = startLat.toFixed(5);
        document.getElementById("lon").innerText = startLon.toFixed(5);
      },
      (error) => alert("Location access denied"),
      { enableHighAccuracy: true }
    );
    alert("Trip Started 🚀");
  } else {
    alert("Geolocation not supported");
  }
}

function endTrip() {
  navigator.geolocation.clearWatch(watchId);
  document.getElementById("popup").style.display = "block";
}

function submitTrip() {
  const mode = document.getElementById("mode").value;
  const purpose = document.getElementById("purpose").value;
  const cost = document.getElementById("cost").value;

  console.log({
    latitude: startLat,
    longitude: startLon,
    mode,
    purpose,
    cost,
  });

  alert("Trip Data Submitted ✅");

  document.getElementById("popup").style.display = "none";
}
