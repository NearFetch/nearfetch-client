(function () {
    'use strict';
    let template = `
        <style>
            .route-container{
                position:absolute;
                top:0px;
            }
        </style>
        <div class="route-container">
            ROUTE
        </div>
    `;
    

    class RouteWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.$container=this.shadowRoot.querySelector('.route-container');
            this.draw();
            
        }
        connectParent(lf,svc){
            console.log("route connected to leaflet");
            this.$leaflet=lf;
            this.$services=svc;

            this.getRoutes();
            this.showRoute(this.$routes[0])

        }
        getRoutes(){
            this.$routes=this.$services.getRoutes();
        }
        showRoute(rt){
            var wps=[];
            
            for(var i=0;i<rt.waypoints.length;i++){
                var wp=rt.waypoints[i];
                wps.push(L.latLng(wp.x, wp.y));
            }
            this.$leaflet.showRoute(wps);
        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
        draw(){
            console.log("draw route");
            this.$container.innerHTML="ROUTE";
        }
        verify(){
            console.log("Route widget verified");
        }
    }
    document.registerElement('route-widget', RouteWidget);
})();