function startUp() {
	var mapScript = document.createElement('script');
	mapScript.type = 'text/javascript';
	mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q&callback=initMap';
	document.body.appendChild(mapScript);
}

window.onload = startUp;

var pointsOfInterest = [
	{
		title: 'Alaska Zoo',
		poiLat: 61.123739,
		poiLng: -149.785815,
		streetAddr: '4731 OMalley Rd',
		cityAddr: 'Anchorage, AK 99507',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Alaska_Zoo,_Anchorage.jpg/250px-Alaska_Zoo,_Anchorage.jpg'
	},
	{
		title: 'Tony Knowles Coastal Bicycle Trail',
		poiLat: 61.201475,
		poiLng: -149.954129,
		streetAddr: '810 W 2nd Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Tony_Knowles_Coastal_Trail.jpg'
	},
	{
		title: 'Alaska Railroad Depot',
		poiLat: 61.221696,
		poiLng: -149.89019,
		streetAddr: '411 W. 1st Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://c2.staticflickr.com/4/3294/2850221419_32d4858871.jpg'
	},
	{
		title: 'Anchorage Museam at Rasmuson Center',
		poiLat: 61.216093,
		poiLng: -149.884613,
		streetAddr: '625 C Street',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://affiliations.si.edu/media_images/data/Anchorage%20Museum.jpg'
	}
]

var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var yelpKey = 'R9P1G_amYFdC5Uo14SeMHw';
var cityLatLng = {lat: 61.1881, lng: -149.90};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: cityLatLng,
		zoom: 11
	});

	infowindow = new google.maps.InfoWindow();

	makeMarkers();
}

function makeMarkers() {
	
	for (i=0; i< pointsOfInterest.length; i++) {

		var latLongPos =  {lat: pointsOfInterest[i].poiLat, lng: pointsOfInterest[i].poiLng};

		var infoContent = '<div class="infoContentBlock">' +
			'<div class="iWTitle">' + pointsOfInterest[i].title +
			//'</div><div class=iWBlurp>' + pointsOfInterest[i].blurp +
			'</div><img src="' + pointsOfInterest[i].imgSrc +
			'"</img></div>';

		var marker = new google.maps.Marker( {
			position: latLongPos,
			map: map,
			title: pointsOfInterest[i].title
		});

		google.maps.event.addListener(marker, 'click', (function (marker) {
			return function () {
				infowindow.setContent(infoContent);
				infowindow.open(map, marker);
			}
		})(marker));
/*
		marker.infowindow = new google.maps.InfoWindow({
    		content: infoContent
		});

		google.maps.event.addListener(marker,'click', function(marker) {
			marker.infowindow.open(map, marker);
		});
*/
	}
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
	});
}

ko.applyBindings(new ViewModel());
