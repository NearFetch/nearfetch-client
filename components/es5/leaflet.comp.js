"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import FetchWidget from 'fetch-widget';
//import RouteWidget from 'route-widget';

(function () {
    'use strict';

    var template = "\n        <style>\n            .leafcontainer{\n                width: 100%;\n                height: 90vh;\n            }\n        </style>\n        <div id=\"leaf-holder\">\n            <fetch-widget></fetch-widget>\n            <route-widget></route-widget>\n        </div>\n    ";
    var markerStyles = [{ name: "default", icon: "", color: "" }, { name: "beer", icon: "/icons/beer.png", color: "#FF0000" }, { name: "brolly", icon: "/icons/brolly.png", color: "#00FF00" }];

    var LeafletView = (function (_HTMLElement) {
        _inherits(LeafletView, _HTMLElement);

        function LeafletView() {
            _classCallCheck(this, LeafletView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(LeafletView).apply(this, arguments));
        }

        _createClass(LeafletView, [{
            key: "createdCallback",

            // Fires when an instance of the element is created.
            value: function createdCallback() {
                this.createShadowRoot().innerHTML = template;
                this.$map = {};
                this.$access_token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

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
        }, {
            key: "clearMarkers",
            value: function clearMarkers() {
                console.log("clear markers from map");
            }
        }, {
            key: "addMarkers",
            value: function addMarkers(m) {
                console.log({ "markers": m });
                //x='51.505' y='-0.09'
                var defaultIcon = L.divIcon({ className: 'leaflet-div-icon' });
                //L.marker([51.505, -0.09, {icon:defaultIcon}]).addTo(this.$map);

                for (var i = 0; i < m.length; i++) {

                    var item = m[i];
                    var style = this.getStyle(item.style);

                    if (style.icon == "") {
                        console.log("no icon specified");
                        //L.marker([51.505, -0.09, {icon:defaultIcon}]).addTo(this.$map);
                        L.marker([item.x, item.y, { icon: defaultIcon }]).addTo(this.$map);
                    } else {
                        var customicon = L.divIcon({ className: style.icon + '-div-icon' });
                        console.log("icon '" + style.icon + "' specified");
                        L.marker([item.x, item.y], { icon: customicon }).addTo(this.$map);
                    }
                    console.log("Add marker " + i + " at " + item.x + "," + item.y);
                }
            }
        }, {
            key: "getStyle",
            value: function getStyle(s) {
                for (var i = 0; i < markerStyles; i++) {
                    if (markerStyles[i].name == s) {
                        return markerStyles[i];
                    }
                }
                return markerStyles[0];
            }
        }, {
            key: "connectChildren",
            value: function connectChildren(fetch, route) {
                console.log("connected to children");

                this.$fetch = fetch;
                this.$route = route;
            }
        }, {
            key: "refreshMap",
            value: function refreshMap() {
                console.log("refresh map");
                //this.connectElement();
            }
        }, {
            key: "connectElement",
            value: function connectElement() {
                if (window.app != undefined && this.$registered == undefined) {
                    this.$registered = app.register("leaflet", me);
                }
            }
        }, {
            key: "initAttributes",
            value: function initAttributes() {
                this.$leafwrapper = $('#' + this.getAttribute('wrapper-id'));
                this.$viewx = this.getAttribute('x');
                this.$viewy = this.getAttribute('y');
            }
        }, {
            key: "verify",
            value: function verify() {
                console.log("leaflet verified");
            }
            // Fires when an instance was inserted into the document.

        }, {
            key: "attachedCallback",
            value: function attachedCallback() {}
            // Fires when an attribute was added, removed, or updated.

        }, {
            key: "attributeChangedCallback",
            value: function attributeChangedCallback(attrName, oldVal, newVal) {
                switch (attrName) {
                    case "wrapper-id":
                        this.$leafwrapper = $('#' + this.getAttribute('wrapper-id'));
                        this.initMap();
                        break;
                    case "x":
                        this.$viewx = $('#' + this.getAttribute('x'));
                        this.initMap();
                        break;
                    case "y":
                        this.$viewy = $('#' + this.getAttribute('y'));
                        this.initMap();
                        break;
                    case "route":
                        this.$route = this.getAttribute('route');
                        this.initMap();
                        break;
                    case "fetch":
                        this.$route = this.getAttribute('fetch');
                        this.initMap();
                        break;

                }
            }
        }, {
            key: "draw",
            value: function draw() {
                //draw fetch

                //draw route?
            }
        }, {
            key: "initMap",
            value: function initMap() {
                $('<div />', {
                    id: 'map-holder'
                }).appendTo(this.$leafwrapper);

                this.$map = L.map('map-holder').setView([this.$viewx, this.$viewy], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.$access_token, {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(this.$map);
            }
        }, {
            key: "initMap2",
            value: function initMap2() {

                var map = L.map(this.$container).setView([this.$viewx, this.$viewy], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.$access_token, {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(map);
            }
        }]);

        return LeafletView;
    })(HTMLElement);

    document.registerElement('leaflet-view', LeafletView);
})();