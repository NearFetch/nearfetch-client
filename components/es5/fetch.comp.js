'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    'use strict';

    var template = '\n        <style>\n            .fetch-container{\n                position:absolute;\n                top:0px;\n            }\n        </style>\n        <div class="fetch-container">\n            FETCH\n        </div>\n    ';

    var FetchWidget = (function (_HTMLElement) {
        _inherits(FetchWidget, _HTMLElement);

        function FetchWidget() {
            _classCallCheck(this, FetchWidget);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(FetchWidget).apply(this, arguments));
        }

        _createClass(FetchWidget, [{
            key: 'createdCallback',

            // Fires when an instance of the element is created.
            value: function createdCallback() {
                this.createShadowRoot().innerHTML = template;
                this.$container = this.shadowRoot.querySelector('.fetch-container');
                this.draw();
            }
        }, {
            key: 'connectParent',
            value: function connectParent(lf) {
                console.log("fetch connected to leaflet");
                this.$leaflet = lf;
                this.addElements();
            }
            // Fires when an instance was inserted into the document.

        }, {
            key: 'attachedCallback',
            value: function attachedCallback() {}
            // Fires when an attribute was added, removed, or updated.

        }, {
            key: 'attributeChangedCallback',
            value: function attributeChangedCallback(attrName, oldVal, newVal) {}
        }, {
            key: 'draw',
            value: function draw() {
                this.$container.innerHTML = "FETCH";
            }
        }, {
            key: 'addElements',
            value: function addElements() {
                //x='51.505' y='-0.09'
                var markers = [{ x: 51.505, y: -0.09, label: "bring brolly", style: "brolly", reference: 999 }, { x: 51.500, y: -0.09, label: "need booze", style: "beer", reference: 998 }, { x: 51.505, y: -0.08, label: "needs booze", style: "beer", reference: 997 }];

                this.$leaflet.clearMarkers();
                this.$leaflet.addMarkers(markers);
            }
        }, {
            key: 'verify',
            value: function verify() {
                console.log("Fetch widget verified");
            }
        }]);

        return FetchWidget;
    })(HTMLElement);

    document.registerElement('fetch-widget', FetchWidget);
})();