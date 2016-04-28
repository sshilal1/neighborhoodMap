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
		categories: ['fun','nature','animals'],
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
		categories: ['fun','nature'],
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
		categories: ['history'],
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
		categories: ['fun','history'],
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
		categories: ['fun','history','nature'],
		poiLat: 61.232818,
		poiLng: -149.717059,
		streetAddr: '8800 Heritage Center Dr',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://www.alaska.org/photos/gallery3/var/albums/anchorage-photos/anchorage-attractions/Alaska-Native-Heritage-Center/Alaska-Native-Heritage-Center-03-347796285.jpg?m=1385595257',
		entryNum: 4,
		gMarker: ko.observable(true)
	},
	{
		title: 'Alaska Center for the Performing Arts',
		categories: ['fun','history','music'],
		poiLat: 61.2172,
		poiLng: -149.8956,
		streetAddr: '621 W 6th Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://events-media.nationalgeographic.com/media/images/photos/AlaskaCenter2-dl_jpg_610x343_crop_upscale_q85.jpg',
		entryNum: 5,
		gMarker: ko.observable(true)
	}
]

var yelpResults;
var generateContentString = function (poiReturned) {

  var consumerKey = "R9P1G_amYFdC5Uo14SeMHw"; 
	var consumerSecret = "ca1mp3HeWZy2ZK-SkHxhMm_f8Wk";
	var accessToken = "CZzMTRD-t9h-PccH-2rVUCeaa-SetctZ";
	var accessTokenSecret = "yL7XOcZhr_148DFeoCVkRrIl6gA";

    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }

    var yelp_url = "http://api.yelp.com/v2/search/";

    var parameters = {
        oauth_consumer_key: consumerKey,
        oauth_token: accessToken,
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb',
        term: 'food',
        location: 'Anchorage,AK',
        sort: 2,
        limit: 20

    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerSecret, accessTokenSecret);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        success: function (results) {
        	for (i=0; i<results.businesses.length;i++) {

        		var foodCategories = ['food'];
        		for (j=0; j<results.businesses[i].categories.length;j++) {
        			foodCategories.push(results.businesses[i].categories[j][1]);
        		}
        		
        		var poi = {
        			title: results.businesses[i].name,
        			categories: foodCategories,
					poiLat: results.businesses[i].location.coordinate.latitude,
					poiLng: results.businesses[i].location.coordinate.longitude,
					streetAddr: results.businesses[i].location.address[0],
					cityAddr: 'Anchorage, AK ' + results.businesses[i].location.postal_code,
					imgSrc: results.businesses[i].image_url,
					entryNum: 6 + i,
					gMarker: ko.observable(true)
        		}
        		//pointsOfInterest.push(poi);
				if(typeof poiReturned !== "undefined") {
					poiReturned.push(poi);
				}
        	}
        	yelpResults = results;
        },
        error: function () {
            console.log("doesnt work");
        }
    };
    $.ajax(settings);
};

generateContentString();

var hoveredIcon = 'http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2'
var standardIcon = 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1'
var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';

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
	//setTimeout(function() {makeMarkers();},100);
	//makeMarkers()
	
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

function makeMarker(poi) {

	var latLongPos =  {lat: poi.poiLat, lng: poi.poiLng};

	var infoContent = '<div class="infoContentBlock">' +
		'<h2>' + poi.title +
		//'</div><div class=iWBlurp>' + pointsOfInterest[i].blurp +
		'</h2><img src="' + poi.imgSrc +
		'"</img></div>';

	var marker = new google.maps.Marker( {
		position: latLongPos,
		map: map,
		title: poi.title
	});

	marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
	
	marker.addListener('mouseover', function() {
        highlightMarker(poi.entryNum);
    });
	
	marker.addListener('mouseout', function() {
        unHighlightMarker(poi.entryNum);
    });

    poi.gMarker = marker;

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
	this.title = data.title;
	this.categories = data.categories;
	this.poiLat = data.poiLat;
	this.poiLng = data.poiLng;
	this.streetAddr = data.streetAddr;
	this.cityAddr = data.cityAddr;
	this.imgSrc = data.imgSrc;
	this.index = data.entryNum;
	this.gMarker = data.gMarker;
}

//setTimeout(function() {
	// The viewModel to be instantiated with knockout
	var ViewModel = function() {

		var self = this;
		
		this.mouseHovered = function(clickedPoi) {
			//highlightMarker(clickedPoi.index);
		}
		
	    this.mouseGone = function(clickedPoi) {
			//unHighlightMarker(clickedPoi.index);
		}

		// Necessary for first application of markers/list items
		//self.initialize = ko.observable(true);

		this.poiList = ko.observableArray();
		
		pointsOfInterest.forEach(function(locInfo) {
			self.poiList.push((locInfo));
		});

		self.poiReturned = ko.observableArray();

		generateContentString(self.poiReturned);
		
		this.mediatorList = ko.computed(function() {
			var newList = self.poiList().concat(self.poiReturned());
			return newList.sort(function (left,right) {
				return left.title == right.title ? 0 : (left.title < right.title ? -1 : 1)
			});
		},this);

		this.setPoi = function(clickedPoi) {
			setMapToPoi(clickedPoi);
		}

		this.searchFor = ko.observable('');

		// The final list of elements displayed, filtered by the search
		this.masterList = ko.computed(function() {
			var searchText = this.searchFor().toLowerCase();

			if (!searchText) {/*
				if (!self.initialize()) {
					//addMarkers();
				}
				self.initialize(false);*/
				return this.mediatorList();
			}

			else {
				return ko.utils.arrayFilter(this.mediatorList(), function(Poi) {
					for (i=0;i<Poi.categories.length;i++) { //
						if ((Poi.title.toLowerCase().indexOf(searchText) >= 0)||(Poi.categories[i].indexOf(searchText) >= 0)) {
							//addMarker(Poi.index);
							return Poi;
						}
						else {
							//removeMarker(Poi.index);
						}
					}
				});
			}
		}, this);
	}

	ko.applyBindings(new ViewModel());
//}, 1000);


//console.log(yelpResults);
