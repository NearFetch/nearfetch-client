/*global $, window, L */

// import io from 'socket.io-client';
// import React from 'react';



(function () {
    'use strict';
    var doc = $(document);

    function removeNewRequestModal() {
        $('#new-request-modal').remove();
    }

    function activateNewRequestModal() {
        var template = $('#new-request-modal-template').html();

        var modal = $('<div />', {
            id: 'new-request-modal',
            class: 'fullscreen-modal',
            html: template
        }).appendTo($('body'));

        mui.overlay('on', modal.get(0));
    }

    function activateNewRequestConfirmationModal() {
        var template = $('#new-request-confirmation-modal-template').html();

        var modal = $('<div />', {
            id: 'new-request-confirmation-modal',
            class: 'modal',
            html: template
        }).appendTo($('body'));

        modal.find('.dialog').hide();
        mui.overlay('on', modal.get(0));

        modal.find('.dialog.processing').fadeIn(function () {
            setTimeout(function () {
                modal.find('.dialog.processing').hide();
                modal.find('.dialog.confirm').fadeIn();
            }, 1000);
        });
    }

    function putMarkerOnMap() {
        var options = {
            title: 'Alice needs fresh milk'
        };

        L.marker([51.50762, -0.131467], options)
        .addTo(window.leaflet_map)
        .bindPopup($('#request-template').html());
    }

    function parseUserRequests(str) {
        return str.replace('(', '').replace(')', '') * 1;
    }

    function incrementCurrentRequests() {
        var requests = parseUserRequests($($('.user-requests').first()).text()) + 1;
        $('.user-requests').fadeOut(function () {
            $('.user-requests').text('(' + requests + ')').fadeIn();
        });
    }

    function showDestinationModal() {
        $('#new-journey-destination-modal-template').show();

        bindDestinationMarker();
    }


    function hideDestinationModal() {
        $('#new-journey-destination-modal-template').hide();

        $(document).off('click', '#main-wrapper');
    }

    function bindDestinationMarker () {
        $(document).off('click', '#main-wrapper');
        $(document).on('click', '#main-wrapper', function (e) {
            e.preventDefault();
            e.stopPropagation();

            addDestinationMarker();
        });
    }

    function addDestinationMarker() {
        var loc = [51.507, -0.1334];

        L.circle(loc, 200, {
            color: 'blue',
            // fillColor: '#f03',
            fillOpacity: 0.1
        }).addTo(window.leaflet_map);
    }

    function saveDestination () {
        hideDestinationModal();
        putMarkerOnMap();
    }

    doc.on('click', '#new-request-button', function (e) {
        e.preventDefault();
        try {
            mui.overlay('off');
        }
        catch (exception) {
        }

        activateNewRequestModal();
    });

    doc.on('click', '#create-request-button', function (e) {
        e.preventDefault();
        try {
            mui.overlay('off');
        }
        catch (exception) {
        }
        activateNewRequestConfirmationModal();
    });

    doc.on('click', '#finish-new-request-button', function (e) {
        e.preventDefault();
        try {
            mui.overlay('off');
        }
        catch (exception) {
        }

        incrementCurrentRequests();
        putMarkerOnMap();
    });

    doc.on('click', '#new-journey-destination-button', function (e) {
        e.preventDefault();
        try {
            mui.overlay('off');
        }
        catch (exception) {
        }

        showDestinationModal();
    });

    doc.on('click', '#save-destination-button', function (e) {
        e.preventDefault();
        try {
            mui.overlay('off');
        }
        catch (exception) {
        }

        saveDestination();
    });

    $(function () {

    });
}());
