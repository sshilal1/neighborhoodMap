/* ----------Neighborhood Map
------------ Udacity Project Num 7
------------ This project creates a map of Anchorage Alaska, and gives information
------------ on surrouding activities/ recreation.
----------------------------------------------------
------------ Developed by: Stephen Shilale
------------ 4/28/2016
*/

// Made the map script creation here instead of in the html
function buildMap() {
	var mapScript = document.createElement('script');
	mapScript.type = 'text/javascript';
	mapScript.async = true;
	mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q&callback=initMap';
	mapScript.onerror = function() {
		console.log("error loading google maps API");
		alert("error loading google maps API");
	}
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
		blurb: 'The zoo has the widest variety of animals native to the state of Alaska as well as some exotics such as Amur tigers, Bactrian camels, and yaks',
		index: 0,
		gMarker: {}
	},
	{
		title: 'Tony Knowles Coastal Bicycle Trail',
		categories: ['fun','nature'],
		poiLat: 61.201475,
		poiLng: -149.954129,
		streetAddr: '810 W 2nd Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Tony_Knowles_Coastal_Trail.jpg',
		blurb: 'The Tony Knowles Coastal Trail is an 11-mile long trail along the coast of Anchorage, Alaska designated for non-motorized use',
		index: 1,
		gMarker: {}
	},
	{
		title: 'Alaska Railroad Depot',
		categories: ['history'],
		poiLat: 61.221696,
		poiLng: -149.89019,
		streetAddr: '411 W. 1st Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://c2.staticflickr.com/4/3294/2850221419_32d4858871.jpg',
		blurb: 'Anchorage Depot is the railroad station at the center of the Alaska Railroad system. It serves as the starting point for many tourists traveling on the luxury trains.',
		index: 2,
		gMarker: {}
	},
	{
		title: 'Anchorage Museam at Rasmuson Center',
		categories: ['fun','history'],
		poiLat: 61.216093,
		poiLng: -149.884613,
		streetAddr: '625 C Street',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'https://affiliations.si.edu/media_images/data/Anchorage%20Museum.jpg',
		blurb: 'The Anchorage Museum is a large art, history, ethnography, ecology and science museum. It is dedicated to studying and exploring the land, peoples, art and history of Alaska.',
		index: 3,
		gMarker: {}
	},
	{
		title: 'Alaska Native Heritage Center',
		categories: ['fun','history','nature'],
		poiLat: 61.232818,
		poiLng: -149.717059,
		streetAddr: '8800 Heritage Center Dr',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://www.alaska.org/photos/gallery3/var/albums/anchorage-photos/anchorage-attractions/Alaska-Native-Heritage-Center/Alaska-Native-Heritage-Center-03-347796285.jpg?m=1385595257',
		blurb: 'The Alaska Native Heritage Center is an educational and cultural institution for all Alaskans. The Alaska Native Heritage Center shares the heritage of Alaskas 11 major cultural groups',
		index: 4,
		gMarker: {}
	},
	{
		title: 'Alaska Center for the Performing Arts',
		categories: ['fun','history','music'],
		poiLat: 61.2172,
		poiLng: -149.8956,
		streetAddr: '621 W 6th Ave',
		cityAddr: 'Anchorage, AK 99501',
		imgSrc: 'http://events-media.nationalgeographic.com/media/images/photos/AlaskaCenter2-dl_jpg_610x343_crop_upscale_q85.jpg',
		blurb: 'The Alaska Center for the Performing Arts is a performance venue in downtown Anchorage, Alaska. Opened in 1988, it entertains over 200,000 patrons annually, and consists of three theaters',
		index: 5,
		gMarker: {}
	}
];

// Gloabal info for infoWindow
var infoWIndowIndex = 0;

// GLoabal info on viewport
var viewport = {
    width  : $(window).width(),
    height : $(window).height()
};

$(document).ready(function () {
	$("#toggle").click(function () {
		if ($(this).data('name') == 'show') {
			$("#searchMenu").animate({width: 0},500);
			setTimeout(function() {$("#searchMenu").hide();}, 500); 
			$(this).data('name', 'hide');
			$(this).html("&#8680;");
		} else {
			$("#searchMenu").animate({
				width: '100%'
			},500).show();
			$(this).data('name', 'show');
			$(this).html("&#8678;");
		}
	});
});

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

        	for (i=0, len=results.businesses.length; i<len;i++) {

        		var foodCategories = ['food'];
        		for (j=0;j<results.businesses[i].categories.length;j++) {
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
					blurb: results.businesses[i].snippet_text,
					index: 6 + i,
					gMarker: {}
        		};


				poiReturned.push(poi);
				pointsOfInterest.push(poi);
        	}

        	yelpResults = results;
        },
    };
    $.ajax(settings)
	.done(function () {
		buildMap();
	})
	.fail(function () {
		alert("Error loading data from Yelp");
	});
};

var hoveredIcon = 'http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2';
var standardIcon = 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';

var cityLatLng = {lat: 61.1881, lng: -149.90};

// Creates the map and markers. called in the buildMap function
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
	
	for (i=0, len=pointsOfInterest.length; i<len; i++) {

		var latLongPos =  {lat: pointsOfInterest[i].poiLat, lng: pointsOfInterest[i].poiLng};

		var infoContent = '<div style="width:400px;overflow:hidden;">' +
			'<h3 style="">' + pointsOfInterest[i].title +
			'</h3><div style="display:flex;">' +
			'<img src="' + pointsOfInterest[i].imgSrc +
			'"style="max-height:100px;"</img>' +
			'<p style="margin:0;padding-left:10px;word-wrap:break-word;">' + pointsOfInterest[i].blurb +
			'</p></div></div>';

		var marker = new google.maps.Marker( {
			position: latLongPos,
			map: map,
			animation: google.maps.Animation.DROP,
			title: pointsOfInterest[i].title
		});

		bindInfoWindow(marker, map, infowindow, infoContent, i);
	}
}

// This function creates an info window, binds it to the marker, and then sets the gMarker object as the built marker
function bindInfoWindow(marker, map, infowindow, html, i) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
		infoWIndowIndex = pointsOfInterest[i].index;
        infowindow.open(map, this);
    });
	
	marker.addListener('mouseover', function() {
		colorMarker(pointsOfInterest[i].index);
    });
	
	marker.addListener('mouseout', function() {
        unHighlightMarker(pointsOfInterest[i].index);
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
	google.maps.event.trigger(poi.gMarker, 'click');
	if (viewport.width < 500) {
		$("#searchMenu").animate({width: 0},500);
		setTimeout(function() {$("#searchMenu").hide();}, 500); 
		$("#toggle").data('name', 'hide');
	}
}

function highlightMarker(poiIndex) {
	// One bounce takes 750 ms
	pointsOfInterest[poiIndex].gMarker.setIcon(hoveredIcon);
	pointsOfInterest[poiIndex].gMarker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){ pointsOfInterest[poiIndex].gMarker.setAnimation(null); }, 750);
}

function unHighlightMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setIcon(standardIcon);
}

function colorMarker(poiIndex) {
	pointsOfInterest[poiIndex].gMarker.setIcon(hoveredIcon);
}


function hideMarker(poi) {
	if (poi.index == infoWIndowIndex) {
		infowindow.close();
	}
	poi.gMarker.setVisible(false);
}

function showMarker(poi) {
	poi.gMarker.setVisible(true);
}

// The viewModel to be instantiated with knockout
var ViewModel = function() {

	var self = this;
	
	this.mouseHovered = function(clickedPoi) {
		highlightMarker(clickedPoi.index);
	};
	
    this.mouseGone = function(clickedPoi) {
		unHighlightMarker(clickedPoi.index);
	};

	this.setPoi = function(clickedPoi) {
		setMapToPoi(clickedPoi);
	};

	// Add the initial pois
	this.poiList = ko.observableArray();
	pointsOfInterest.forEach(function(locInfo) {
		self.poiList.push((locInfo));
	});

	// Add the yelpAPI requested pois
	self.poiReturned = ko.observableArray();
	generateContentString(self.poiReturned);
	
	// Updating list dependent on both initial pois AND yelp-requested pois
	this.mediatorList = ko.computed(function() {
		var newList = self.poiList().concat(self.poiReturned());
		return newList.sort(function (left,right) {
			return left.title == right.title ? 0 : (left.title < right.title ? -1 : 1);
		});
	},this);

	this.searchFor = ko.observable('');

	// The final list of elements displayed, filtered by the search
	this.masterList = ko.computed(function() {
		var searchText = this.searchFor().toLowerCase();

		if (!searchText) {
			return this.mediatorList();
		}

		else {
			return ko.utils.arrayFilter(this.mediatorList(), function(Poi) {
				for (i=0, len=Poi.categories.length;i<len;i++) { //
					if ((Poi.title.toLowerCase().indexOf(searchText) >= 0)) { //||(Poi.categories[i].indexOf(searchText) >= 0)
						showMarker(Poi);
						return Poi;
					}
					else {
						hideMarker(Poi);
					}
				}
			});
		}
	}, this);
};

ko.applyBindings(new ViewModel());