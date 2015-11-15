var sprintf = require("/node_modules/sprintf-js/dist/sprintf.min.js").sprintf;

class TfLServices {

//https://api-portal.tfl.gov.uk/admin/applications/1409612266156
	constructor(){
	    this.app_key = "fb5aea86f5dfd9061c8ff9979e9c6779";
	    this.app_id="2fbad3c3";
	    
	}
	getRestDetails(name,type){
		for(var i=0;i<this.rest.length;i++){
			if(this.rest[i].name==name && this.rest[i].type==type) return this.rest[name];
		}
		return null;
	}
	getBikes(lon,lat){
		var restURL="https://api.tfl.gov.uk/BikePoint?lat="+lat+"&lon="+lon+"&radius=10000&app_id="+this.app_id+"&app_key="+this.app_key;
		console.log(restURL);
		this.getJSON(restURL,function(d){
			console.log(d);
		},null);
		

	}
	getConnection(rest,api,app){
			//https://api.tfl.gov.uk/BikePoint?app_id=2fbad3c3&app_key=fb5aea86f5dfd9061c8ff9979e9c6779 
			//https://api.tfl.gov.uk/BikePoint?lat=51&lon=-0.08&radius=10&app_id=2fbad3c3&app_key=fb5aea86f5dfd9061c8ff9979e9c6779 
	}
	verify(){
		this.getBikes(-0.08,50.05);
		//
		console.log("TfL services");
	}
	getJSON(url, success, error) {
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	      if (xhr.status === 200) {
	        success(JSON.parse(xhr.responseText));
	      } else {
	        error(xhr.responseText);
	      }
	    }
	  };
	  xhr.open('GET', url);
	  xhr.send();
	}

}

module.exports=TfLServices;