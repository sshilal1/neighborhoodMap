var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var yelpKey = 'R9P1G_amYFdC5Uo14SeMHw';
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
}

var Poi = function(data) {
	this.city = ko.observable(data.city);
	this.state = ko.observable(data.state);
	this.street = ko.observable(data.street);
	this.num = ko.observable(data.num);
	this.title = ko.observable(data.title);
};

//https://api.yelp.com/v2/search/?term=food&location=San%20Francisco,%20CA&limit=10&category_filter=pizza

var ViewModel = function() {

/*
	var self = this;

	this.pointsOfInterest = ko.observableArray([]);

	locations.forEach(function(locInfo) {
		self.pointsOfInterest.push(new Poi(locInfo));
	});
*/
};




//ko.applyBindings(new ViewModel());