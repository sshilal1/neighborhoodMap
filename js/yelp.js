//generates the content for the info window using yelp API.

var generateContentString = function () {

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
        limit: 10

    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerSecret, accessTokenSecret);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        success: function (results) {
            console.log(results);
        },
        error: function () {
            console.log("doesnt work");
        }
    };
    $.ajax(settings);
};

generateContentString();
/*
var auth = { 
  consumerKey: "R9P1G_amYFdC5Uo14SeMHw", 
  consumerSecret: "ca1mp3HeWZy2ZK-SkHxhMm_f8Wk",
  accessToken: "CZzMTRD-t9h-PccH-2rVUCeaa-SetctZ",
  accessTokenSecret: "yL7XOcZhr_148DFeoCVkRrIl6gA",
};

var terms = 'food';
var near = 'Anchorage,+AK';

var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['callback', 'cb']);

var message = { 
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters 
};

OAuth.setTimestampAndNonce(message);  

OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

var yelpUrl = OAuth.addToURL(message.action,parameterMap);

$.ajax({
	url: yelpUrl,
	type: 'GET',
    dataType: 'jsonp',
    success: function() { alert("Success"); },
    error: function() { alert('Failed!'); }
});
*/