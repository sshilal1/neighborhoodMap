var googleAPIkey = 'AIzaSyBdPs-DH6pWE-_DYa6jKEGBYtgcWvDW6-Q';
var cityLatLng = '61.2181 N, 149.9003 W';

var Model = function() {

};

var ViewModel = function() {

};

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 61.1981, lng: -149.90},
		zoom: 13
	});
};
//ko.applyBindings(new ViewModel());