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
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
        draw(){
            console.log("draw route");
            this.$container.innerHTML="ROUTE";
        }
    }
    document.registerElement('route-widget', RouteWidget);
})();