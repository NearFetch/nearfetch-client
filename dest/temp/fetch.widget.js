(function () {
    let template = `
        <style>

        </style>
        <div class="container">
            FETCH
        </div>
    `;
    class FetchWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
        }
        // Fires when an instance was inserted into the document.
        attachedCallback() {}
        // Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {}
    }
    document.registerElement('fetch-widget', FetchWidget);
})();