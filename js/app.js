/* ----------Neighborhood Map
------------ Udacity Project Num 7
------------ This project creates a map of Anchorage Alaska, and gives information
------------ on surrouding activities/ recreation.
----------------------------------------------------
------------ Developed by: Stephen Shilale
------------ 4/21/2016
*/

// Runs the 'startUp' function on window load
window.onload = startUp;

// Made the map script creation here instead of in the html
function startUp() {
	var mapScript = document.createElement('script');
	mapScript.type = 'text/javascript';
	mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q&callback=initMap';
	document.body.appendChild(mapScript);
}

// Main variable housing information on the various points of interest
// Information per POI is: Title of laoction, lat and long, address, an image, the index number, and the marker attached to the location
var pointsOfInterest = [
	{
		title: 'Alaska Zoo',
		poiLat: 61.123739,
		poiLng: -149.791815,
		streetAddr: '4731 OMalley Rd',
		cityAddr: 'Anchorage, AK 99507',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Alaska_Zoo,_Anchorage.jpg/250px-Alaska_Zoo,_Anchorage.jpg',
		entryNum: 0,
		gMarker: ko.observable(true)
	},
	{
		title: 'Tony Knowles Coastal Bicycle Trail',
		poiLat: 61.201475,
		poiLng: -149.954129,
		streetAddr: '810 W 2nd Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Tony_Knowles_Coastal_Trail.jpg',
		entryNum: 1,
		gMarker: ko.observable(true)
	},
	{
		title: 'Alaska Railroad Depot',
		poiLat: 61.221696,
		poiLng: -149.89019,
		streetAddr: '411 W. 1st Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://c2.staticflickr.com/4/3294/2850221419_32d4858871.jpg',
		entryNum: 2,
		gMarker: ko.observable(true)
	},
	{
		title: 'Anchorage Museam at Rasmuson Center',
		poiLat: 61.216093,
		poiLng: -149.884613,
		streetAddr: '625 C Street',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://affiliations.si.edu/media_images/data/Anchorage%20Museum.jpg',
		entryNum: 3,
		gMarker: ko.observable(true)
	},
	{
		title: 'Alaska Native Heritage Center',
		poiLat: 61.232818,
		poiLng: -149.717059,
		streetAddr: '8800 Heritage Center Dr',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://www.alaska.org/photos/gallery3/var/albums/anchorage-photos/anchorage-attractions/Alaska-Native-Heritage-Center/Alaska-Native-Heritage-Center-03-347796285.jpg?m=1385595257',
		entryNum: 4,
		gMarker: ko.observable(true)
	},
	{
		title: 'Alaska Center for the Permorming Arts',
		poiLat: 61.2172,
		poiLng: -149.8956,
		streetAddr: '621 W 6th Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://www.alaska.org/photos/gallery3/var/albums/anchorage-photos/anchorage-attractions/Alaska-Native-Heritage-Center/Alaska-Native-Heritage-Center-03-347796285.jpg?m=1385595257',
		entryNum: 5,
		gMarker: ko.observable(true)
	}
]

var hoveredIcon = 'http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2'
var standardIcon = 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1'
var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var yelpKey = 'R9P1G_amYFdC5Uo14SeMHw';
var cityLatLng = {lat: 61.1881, lng: -149.90};

// Creates the map. called in the Startup function
function initMap() {

	// New map centered on Anchorage
	map = new google.maps.Map(document.getElementById('map'), {
		center: cityLatLng,
		zoom: 12
	});

	// General creation of infoWindow
	infowindow = new google.maps.InfoWindow();

	// Call to instantiate the markers
	makeMarkers();
}

// This function makes the markers
function makeMarkers() {
	
	for (i=0; i< pointsOfInterest.length; i++) {

		var latLongPos =  {lat: pointsOfInterest[i].poiLat, lng: pointsOfInterest[i].poiLng};

		var infoContent = '<div class="infoContentBlock">' +
			'<h2>' + pointsOfInterest[i].title +
			//'</div><div class=iWBlurp>' + pointsOfInterest[i].blurp +
			'</h2><img src="' + pointsOfInterest[i].imgSrc +
			'"</img></div>';

		var marker = new google.maps.Marker( {
			position: latLongPos,
			map: map,
			title: pointsOfInterest[i].title
		});

		bindInfoWindow(marker, map, infowindow, infoContent, i);
	}
}

// This function creates an info window, binds it to the marker, and then sets the gMarker object as the built marker
function bindInfoWindow(marker, map, infowindow, html, i) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
	
	marker.addListener('mouseover', function() {
        highlightMarker(pointsOfInterest[i].entryNum);
    });
	
	marker.addListener('mouseout', function() {
        unHighlightMarker(pointsOfInterest[i].entryNum);
    });

    // Need this to call trigger events on the marker
    pointsOfInterest[i].gMarker = marker;
}

// This function is called when a user clicks on the list view object
// Sets the view onto the selected location, and opens the info window
function setMapToPoi(poi) {
	map.setCenter( {
		lat : poi.poiLat,
		lng : poi.poiLng
	});
	map.setZoom(17);
	google.maps.event.trigger(pointsOfInterest[poi.index].gMarker, 'click');
}

function highlightMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setIcon(hoveredIcon);
}

function unHighlightMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setIcon(standardIcon);
}

function resetMapZoom() {
	map.setCenter(cityLatLng);
	map.setZoom(11);
}

function removeMarkers() {
	for (i = 0; i < pointsOfInterest.length; i++) {
		pointsOfInterest[i].gMarker.setVisible(false);
	}
}

function addMarkers() {
	if (pointsOfInterest[0].gMarker != null) {
		for (i = 0; i < pointsOfInterest.length; i++) {
			pointsOfInterest[i].gMarker.setVisible(true);
		}
	}
}

function removeMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setVisible(false);
}

function addMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setVisible(true);
}

// A POI object created from the array pointsOfInterest
var Poi = function(data) {
	this.title = ko.observable(data.title);
	this.streetAddr = ko.observable(data.streetAddr);
	this.poiLat = data.poiLat;
	this.poiLng = data.poiLng;
	this.index = data.entryNum;
	this.marker = ko.observable(data.gMarker);
}

// http://jsfiddle.net/Lvuvh2pc/33/
// The viewModel to be instantiated with knockout
var ViewModel = function() {

	var self = this;
	
	this.mouseHovered = function(clickedPoi) {
		highlightMarker(clickedPoi.index);
	}
	
    this.mouseGone = function(clickedPoi) {
		unHighlightMarker(clickedPoi.index);
	}

	// Necessary for first application of markers/list items
	self.initialize = ko.observable(true);

	this.poiList = ko.observableArray([]);

	pointsOfInterest.forEach(function(locInfo) {
		self.poiList.push(new Poi(locInfo));
	});

	this.setPoi = function(clickedPoi) {
		setMapToPoi(clickedPoi);
	}
	
	this.poiList.sort(function (left,right) {
		return left.title() == right.title() ? 0 : (left.title() < right.title() ? -1 : 1)
	});

	this.searchFor = ko.observable('');

	// The final list of elements displayed, filtered by the search
	this.masterList = ko.computed(function() {
		var searchText = this.searchFor().toLowerCase();

		if (!searchText) {
			if (!self.initialize()) {
				addMarkers();
			}
			self.initialize(false);
			return this.poiList();
		}

		else {
			return ko.utils.arrayFilter(this.poiList(), function(Poi) {
				if (Poi.title().toLowerCase().indexOf(searchText) >= 0) {
					addMarker(Poi.index);
					return Poi;
				}
				else {
					removeMarker(Poi.index);
				}
			});
		}
	}, this);
}

ko.applyBindings(new ViewModel());
