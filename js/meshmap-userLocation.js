/*
* Part of meshmap - kg6wxc 2024
*
*/
function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			//success!
			usePosition,
			//error
			(err) => console.warn("Geolocation Error ({$err.code}): ${err.message}"),
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		);
	}
}

function usePosition(position) {
//	mapInfo['mapCenterCoords'][0] = position.coords.latitude;
//	mapInfo['mapCenterCoords'][1] = position.coords.longitude;
	youAreHereIconRef = L.marker([position.coords.latitude, position.coords.longitude], { icon: userLocationIcon }).addTo(map);
	youAreHereIconRef._icon.id = "youAreHere";
	map.panTo([position.coords.latitude, position.coords.longitude]);
}
