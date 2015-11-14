(function () {
    'use strict';

    let template = `
        <style>
            .fetch-container {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }
        </style>
        <div class="fetch-container">
            FETCH
            -f-
        </div>
    `;

    class FetchWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.$container = this.shadowRoot.querySelector('.fetch-container');
            this.draw();
        }
        connectParent(lf){
            console.log("fetch connected to leaflet");
            this.$leaflet=lf;
            this.addElements();

        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
        draw(){

        }
        addElements(){
            //x='51.505' y='-0.09'
            var markers=[{x:51.505,y:-0.09,label:"bring brolly",style:"brolly",reference:999},
            {x:51.500,y:-0.09,label:"need booze",style:"beer",reference:998},
            {x:51.505,y:-0.08,label:"needs booze",style:"beer",reference:997}];

            this.$leaflet.clearMarkers();
            this.$leaflet.addMarkers(markers);
        }
        verify(){
            console.log("Fetch widget verified");
        }
    }
    document.registerElement('fetch-widget', FetchWidget);
})();
