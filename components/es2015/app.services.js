
    class ApplicationServices {



    		getRoutes(){
                
                var routes = [
                {   name:'route 1',
                    reference:1234,
                    waypoints:[
                                {x:51.505,y:-0.08},
                                {x:51.506,y:-0.07},
                                {x:51.507,y:-0.06},
                                {x:51.508,y:-0.06}
                    ]},
                {   name:'route 2',
                    reference:1235,
                    waypoints:[
                                {x:51.502,y:-0.09},
                                {x:51.501,y:-0.10},
                                {x:51.500,y:-0.10},
                                {x:51.495,y:-0.10}
                    ]},
                ];

                return routes;
                
    		}
            getRoute(ref){
                var info={
                    name:"route 1",
                    description:"a good route through london",
                    duration:"00:10",
                    submittedBy:"neil highley",
                    rating:3.25
                }
                return info;
            }
            getCurrentLocation(){
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                      return {success:true,lat:position.coords.latitude, lon:position.coords.longitude};
                    });
                  /* geolocation is available */
                } else {
                  /* geolocation IS NOT available */
                    return {success:false}
                }
            }
    		addRoute(rt){
                    return { success:true};
    		}
    		getFetches(){

    		}
    		addFetch(ft){

    		}
    		getAreaData(){

    		}
    		verify(){
    			console.log("app services verified and loaded");
    		}

    	}
	
module.exports = ApplicationServices;
