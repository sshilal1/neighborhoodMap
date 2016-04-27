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