(function () {
    'use strict';

    let template = `
        <style>
            .leafcontainer{
                width: 100%;
                height: 90vh;
            }
        </style>
        <div class="leafcontainer">
        </div>
    `;
    class LeafletWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;

            this.$container = this.shadowRoot.querySelector('.leafcontainer');

            this.drawMap();
            //Call the draw function initially
            this.draw();
            var that = this;
            //Call the draw function every two second to update the map
            /*setInterval(function () {
                that.draw();
            }, 2000);*/
        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
        draw() {
            //draw fetch

            //draw route?
        }
        drawMap() {
            console.log("draw map");
            var map = L.map(this.$container).setView([51.505, -0.09], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }
    }
    document.registerElement('leaflet-view', LeafletWidget);
})();