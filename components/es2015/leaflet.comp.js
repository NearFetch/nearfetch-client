//import FetchWidget from 'fetch-widget';
//import RouteWidget from 'route-widget';

(function () {
    'use strict';


    let template = `
        <style>
            .leafcontainer{
                width: 100%;
                height: 90vh;
            }
        </style>
        <div id="leaf-holder">
            <fetch-widget></fetch-widget>
            <route-widget></route-widget>
        </div>
    `;
    class LeafletView extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            
            this.$access_token='pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

            this.$container = this.shadowRoot.querySelector('.leaf-holder');
            this.initAttributes();
            
            this.initMap();

            //Call the draw function initially
            this.draw();
            var that = this;
            //Call the draw function every two seconds to update the map
            setInterval(function () {
                that.refreshMap();
            }, 2000);
        }
        
        
        connectChildren(fetch,route){
            console.log("connected to children");

            this.$fetch=fetch;
            this.$route=route;
            
        }
        refreshMap(){
            console.log("refresh map");
            //this.connectElement();
        }
         connectElement(){
            if(window.app!=undefined && this.$registered==undefined){
                this.$registered=app.register("leaflet",me);
            }
        }
        initAttributes(){
            this.$leafwrapper=$('#'+this.getAttribute('wrapper-id'));
            this.$viewx=this.getAttribute('x');
            this.$viewy=this.getAttribute('y');
        }
        verify(){
            console.log("leaflet verified");
        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {
            switch (attrName) {
                case "wrapper-id":
                    this.$leafwrapper=$('#'+this.getAttribute('wrapper-id'));
                    this.initMap();
                    break;
                 case "x":
                    this.$viewx=$('#'+this.getAttribute('x'));
                    this.initMap();
                    break;
                case "y":
                    this.$viewy=$('#'+this.getAttribute('y'));
                    this.initMap();
                    break;
                case "route":
                    this.$route=this.getAttribute('route');
                    this.initMap();
                    break;
                 case "fetch":
                    this.$route=this.getAttribute('fetch');
                    this.initMap();
                    break;

            }

        }
        draw() {
            //draw fetch

            //draw route?
        }
        
        initMap(){
            $('<div />', {
                id: 'map-holder'
            }).appendTo(this.$leafwrapper);

            this.$map= L.map('map-holder').setView([this.$viewx, this.$viewy], 13);

           L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+this.$access_token, 
           {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(this.$map); 

        }
        initMap2(){

            var map= L.map(this.$container).setView([this.$viewx, this.$viewy], 13);

           L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+this.$access_token, 
           {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map); 

           

        }
    }
    document.registerElement('leaflet-view', LeafletView);
})();