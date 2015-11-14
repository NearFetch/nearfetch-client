(function () {
    'use strict';
    let template = `
        <style>
            .fetch-container{
                position:absolute;
                top:0px;
            }
        </style>
        <div class="fetch-container">
            FETCH
        </div>
    `;
    class FetchWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.$container = this.shadowRoot.querySelector('.fetch-container');
            this.draw();
        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
        draw(){
            this.$container.innerHTML="FETCH";
        }
    }
    document.registerElement('fetch-widget', FetchWidget);
})();