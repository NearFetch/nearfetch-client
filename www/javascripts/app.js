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
}());
