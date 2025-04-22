/**
 * part of KG6WXC meshmap
 * 2024 KG6WXC
 */
function createServiceList(list) {
	var serviceList ="";
	if(list.length === 0) {
		serviceList = "No Published Services";
	}
	for(var i = 0; i < list.length; i++) {
		serviceList += "<a href='" + list[i].link + "' target='_blank' rel='noopener'>" + list[i].name + "</a><br>";
	}
	return serviceList;
}

function createLinkList(list) {
	var def = "Links go here.";
	var linkList = "";
	if(list.length === 0) {
		linkList = "No Links?";
	}
	var objArray = Object.entries(list);  //z becomes an array like 0[0: IP, 1: all the link info], 1[0: IP, 1: all the link info], etc...etc...
	for(var i = 0; i < objArray.length; i++) {
		if(objArray[i][1].linkType == "RF") {
			var distance = "";
			if(mapInfo['kilometers']) {
				distance = " Distance " + objArray[i][1].distanceKM + "km (" + objArray[i][1].distanceMiles + "mi)";
			}else {
				distance = " Distance " + objArray[i][1].distanceMiles + "mi (" + objArray[i][1].distanceKM + "km)";
			}
			linkList += "<strong>" + objArray[i][1].hostname + "</strong>" +
				"<br> Type: " + objArray[i][1].linkType + distance + "<br>";
		}else {
			linkList += "<strong>" + objArray[i][1].hostname + "</strong>" +
                                "<br> Type: " + objArray[i][1].linkType + "<br>";
		}
//		var x = objArray[i][1].hostname;
//		var y = objArray[i][1].linkType;
	}
	return linkList;
}

function createDeviceMarkers(allDevices) {
	for(var i = 0; i < allDevices['900'].length; i++) {
		var band = "900";
		var localTime = new Date(allDevices[band][i].last_seen + " UTC");
		var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
			allDevices[band][i].node + ".local.mesh' target='_blank' rel='noopener'>" + allDevices[band][i].node + "</a></NodeTitle>" +
			"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br>" + allDevices[band][i].ssid +
			"<br>Channel: " + allDevices[band][i].channel + " (" + allDevices[band][i].freq + "MHz) , Bandwidth: " + allDevices[band][i].chanbw +
			"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
			"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
			"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
			"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
			"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
			"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
			"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
			"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
			"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
			"</div>";
		if(mapInfo['localnode'] == allDevices[band][i].node) {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
						icon: pulse9,
						title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(nineHundredMHzStations));
		}else {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: nineRadioCircle,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(nineHundredMHzStations));
		}
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, nineLinksTX, "txRate");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, nineLinksThp, "Tput");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, nineLinksSnR, "SnR");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, nineLinksCost, "cost");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, nineLinksQual, "qual");
	}
	for(var i = 0; i < allDevices['2ghz'].length; i++) {
		var band = "2ghz";
		var localTime = new Date(allDevices[band][i].last_seen + " UTC");
		var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
			allDevices[band][i].node + ".local.mesh' target='node'>" + allDevices[band][i].node + "</a></NodeTitle>" +
			"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br>" + allDevices[band][i].ssid +
			"<br>Channel: " + allDevices[band][i].channel + " (" + allDevices[band][i].freq + "MHz) , Bandwidth: " + allDevices[band][i].chanbw +
			"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
			"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
			"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
			"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
			"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
			"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
			"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
			"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
			"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
			"</div>";
		if(mapInfo['localnode'] == allDevices[band][i].node) {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: pulse2,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(twoGHzStations));
		}else {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: twoRadioCircle,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(twoGHzStations));
		}
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, twoLinksTX, "txRate");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, twoLinksThp, "Tput");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, twoLinksSnR, "SnR");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, twoLinksCost, "cost");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, twoLinksQual, "qual");
	}
	for(var i = 0; i < allDevices['3ghz'].length; i++) {
		var band = "3ghz";
		var localTime = new Date(allDevices[band][i].last_seen + " UTC");
		var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
			allDevices[band][i].node + ".local.mesh' target='node'>" + allDevices[band][i].node + "</a></NodeTitle>" +
			"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br>" + allDevices[band][i].ssid +
			"<br>Channel: " + allDevices[band][i].channel + " (" + allDevices[band][i].freq + "MHz) , Bandwidth: " + allDevices[band][i].chanbw +
			"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
			"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
			"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
			"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
			"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
			"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
			"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
			"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
			"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
			"</div>";
		if(mapInfo['localnode'] == allDevices[band][i].node) {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: pulse3,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(threeGHzStations));
		}else {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: threeRadioCircle,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(threeGHzStations));
		}
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, threeLinksTX, "txRate");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, threeLinksThp, "Tput");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, threeLinksSnR, "SnR");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, threeLinksCost, "cost");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, threeLinksQual, "qual");
	}
	for(var i = 0; i < allDevices['5ghz'].length; i++) {
		var band = "5ghz";
		var localTime = new Date(allDevices[band][i].last_seen + " UTC");
		var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
			allDevices[band][i].node + ".local.mesh' target='_blank' rel='noopener'>" + allDevices[band][i].node + "</a></NodeTitle>" +
			"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br><strong>SSID</strong>: " + allDevices[band][i].ssid +
			"<br><strong>Channel</strong>: " + allDevices[band][i].channel + " (" + allDevices[band][i].freq + "MHz) , Bandwidth: " + allDevices[band][i].chanbw +
			"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
			"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
			"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
			"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
			"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
			"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
			"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
			"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
			"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
			"</div>";
		if(mapInfo['localnode'] == allDevices[band][i].node) {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: pulse5,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(fiveGHzStations));
		}else {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: fiveRadioCircle,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(fiveGHzStations));
		}
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, fiveLinksTX, "txRate");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, fiveLinksThp, "Tput");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, fiveLinksSnR, "SnR");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, fiveLinksCost, "cost");
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, fiveLinksQual, "qual");
	}
	for(var i = 0; i < allDevices['noRF'].length; i++) {
		var band = "noRF";
		var localTime = new Date(allDevices[band][i].last_seen + " UTC");
		var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
			allDevices[band][i].node + ".local.mesh' target='node'>" + allDevices[band][i].node + "</a></NodeTitle>" +
			"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br>" + allDevices[band][i].ssid +
			"<br>Channel: " + allDevices[band][i].channel + ", Bandwidth: " + allDevices[band][i].chanbw +
			"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
			"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
			"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
			"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
			"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
			"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
			"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
			"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
			"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
			"</div>";
		if(mapInfo['localnode'] == allDevices[band][i].node) {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: pulseNon,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(noRFStations));
		}else {
			oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
				icon: noRFCircle,
				title: allDevices[band][i].node
			}).bindPopup(popup, {maxwidth: 500}).addTo(noRFStations));
		}
		createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, noRFLinks);
	}
	for(var i = 0; i < allDevices['supernode'].length; i++) {
			var band = "supernode";
			var localTime = new Date(allDevices[band][i].last_seen + " UTC");
			var popup = "<div class='popupTabs'><div class='popupTab' id='popupMain'><div class='popupTabContent'><NodeTitle><a href='http://" +
				allDevices[band][i].node + ".local.mesh' target='node'>" + allDevices[band][i].node + "</a></NodeTitle>" +
				"<br>" + allDevices[band][i].lat + ", " + allDevices[band][i].lon + "<br>" + allDevices[band][i].ssid +
				"<br>Channel: " + allDevices[band][i].channel + ", Bandwidth: " + allDevices[band][i].chanbw +
				"<br>" + allDevices[band][i].model + "<br>Firmware: " + allDevices[band][i].firmware_version +
				"<br>Antenna: " + allDevices[band][i].antDesc + " Gain: " + allDevices[band][i].antGain + " Beam: " + allDevices[band][i].antBeam + "&deg;" +
				"<br>Last Polled: " + localTime.toLocaleString() + "<br>Uptime: " + allDevices[band][i].uptime +
				"<br>Load Avg: 1min " + allDevices[band][i].loadavg[0] + ", 5min " + allDevices[band][i].loadavg[1] + ", 15min " + allDevices[band][i].loadavg[2] +
				"<br>" + allDevices[band][i].hopsAway + " hops away from map polling system</div></div>" +
				"<div class='popupTab' id='popupTab-Services'><div class='popupTabContent'><br>" + createServiceList(allDevices[band][i].services) + "</div></div>" +
				"<div class='popupTab' id='popupTab-Links'><div class='popupTabContent'><br>" + createLinkList(allDevices[band][i].link_info) + "</div></div>" +
				"<ul class='popupTabs-link'><li class='popupTab-link'><a href='#popupTab-Main'><span>Main</span></a></li><li class='popupTab-link'>" +
				"<a href='#popupTab-Services'><span>Services</span></a></li><li class='popupTab-link''><a href='#popupTab-Links'><span>Links</span></a></li></ul>" +
				"</div>";
			if(mapInfo['localnode'] == allDevices[band][i].node) {
				oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
					icon: pulseSuper,
					title: allDevices[band][i].node
				}).bindPopup(popup, {maxwidth: 500}).addTo(superNodeStations));
			}else {
				oms.addMarker(L.marker([allDevices[band][i].lat, allDevices[band][i].lon], {
					icon: superNode,
					title: allDevices[band][i].node
				}).bindPopup(popup, {maxwidth: 500}).addTo(superNodeStations));
			}
			createLinks(allDevices[band][i].node, allDevices[band][i].link_info, allDevices[band][i].lat, allDevices[band][i].lon, superNodeLinks, "supernode");
		}
}
