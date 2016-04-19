var pointsOfInterest = [
	{
		title: 'Alaska Zoo',
		poiLat: 61.123739,
		poiLng: -149.785815,
		address: '4731 O' + "'"+ 'Malley Rd, Anchorage, AK 99507',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Alaska_Zoo,_Anchorage.jpg/250px-Alaska_Zoo,_Anchorage.jpg'
	},
	{
		title: 'Tony Knowles Coastal Bicycle Trail',
		poiLat: 61.201475,
		poiLng: -149.954129,
		address: '810 W 2nd Ave, Anchorage, AK 99501',
		imgSrc: 'hh'
	}
]

var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var yelpKey = 'R9P1G_amYFdC5Uo14SeMHw';
var cityLatLng = {lat: 61.1881, lng: -149.90};

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: cityLatLng,
		zoom: 11
	});

	//makeMarkers(map);
	/*var marker = new google.maps.Marker( {
		position: cityLatLng,
		map: map,
		title: 'Anchorage'
	});*/
}

var Poi = function(data) {
	this.title = ko.observable(data.title);
}

//https://api.yelp.com/v2/search/?term=food&location=San%20Francisco,%20CA&limit=10&category_filter=pizza

var ViewModel = function() {

	var self = this;

	this.poiList = ko.observableArray([]);

	pointsOfInterest.forEach(function(locInfo) {
		self.poiList.push(new Poi(locInfo));
		//makeMarker(locInfo);
	});

	//makeMarkers();

}

ko.applyBindings(new ViewModel());

function makeMarker(locationInfo) {
	var latLongPos =  {lat: locationInfo.poiLat, lng: locationInfo.lng};
	locationInfo[0].holdMarker = new google.maps.Marker( {
		position: latLongPos,
		map: map,
		title: locationInfo.title
	}); 
}