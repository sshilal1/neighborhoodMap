var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var cityLatLng = {lat: 61.1981, lng: -149.90};

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: cityLatLng,
		zoom: 13
	});

	var marker = new google.maps.Marker( {
		position: cityLatLng,
		map: map,
		title: 'Anchorage'
	});
};

var Model = function() {

	
};

var ViewModel = function() {

/*
	var self = this;

	this.pointsOfInterest = ko.observableArray([]);

	locations.forEach(function(locInfo) {
		self.pointsOfInterest.push(new poi(locInfo));
	});
*/
};




//ko.applyBindings(new ViewModel());