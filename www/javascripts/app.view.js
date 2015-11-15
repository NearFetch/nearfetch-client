/*global $, window, L */

// import io from 'socket.io-client';
// import React from 'react';

(function () {
    'use strict';
    var doc = $(document);


    function removeNewRequestModal() {
        $('#new-request-modal').remove();
    }

    function showStep1(){
         var template = $('#step1-template').html();

        var modal = $('<div />', {
            id: 'step1',
            class: 'fullscreen-modal',
            html: template
        }).appendTo($('body'));

        mui.overlay('on', modal.get(0));
    }
    function showStep1(){
         var template = $('#step2-template').html();

        var modal = $('<div />', {
            id: 'step2',
            class: 'fullscreen-modal',
            html: template
        }).appendTo($('body'));

        mui.overlay('on', modal.get(0));
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

        L.marker([51.50762, -0.131467], options).addTo(window.leaflet_map);
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

    doc.on('click','#select-journey',function(e){
        showStep1();
    })
    doc.on('click','#select-fetch',function(e){
        showStep2();
    })

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

    var Application=(function(svc,mc,tfl,sim,pol,tw){

        this.$Mastercard=mc;
        this.$TfL=tfl;
        this.$Simplify=sim;
        this.$Police=pol;
        this.$Twitter=tw;

        this.$Mastercard.verify();
        this.$TfL.verify();
        this.$Simplify.verify();
        this.$Police.verify();
        this.$Twitter.verify();

        this.$services=svc;
        svc.verify();
        this.$loc=this.$services.getCurrentLocation();

    	this.$fetch=document.querySelector('fetch-widget');
    	this.$fetch.verify();

    	this.$route=document.querySelector('route-widget');
    	this.$route.verify();

    	this.$leaflet=document.querySelector('leaflet-view');
    	this.$leaflet.verify();

    	this.$leaflet.connectChildren(this.$fetch,this.$route);

    	this.$fetch.connectParent(this.$leaflet,this.$services);
    	this.$route.connectParent(this.$leaflet,this.$services);

		this.$event=[];
		this.$listener={};

        function ShowSplashScreen(){
            console.log("show splashscreen");
        }

    	//document.querySelector('some-element')
    	return{
    		verify:function(){
    			console.log("app verified");
                if(this.$loc.success==true){
                    console.log("LONLAT");
                }
    			
    		},
    		registerEvent:function(name,del){
    			if(this.$event==undefined){
    				this.$event[name]= new Event(name);
    			}
    			this.$listener.addEventListener(name,del);
    		},
    		callEvent:function(name){
    			if(this.$event[name]!=undefined){
    				this.$event[name].dispatchEvent(name);
    			}
    		},
    		start:function(){
    			console.log("app started");
                ShowSplashScreen();
    			
    		}
    	}
    });
    //var asvc=new ApplicationServices();

    var ApplicationServices = require('/components/es5/app.services');

    var MastercardServices = require('/components/es5/mastercard.services');
    var TfLServices = require('/components/es5/tfl.services');
    var SimplifyServices = require('/components/es5/simplify.services');
    var PoliceServices = require('/components/es5/police.services');
    var TwitterServices = require('/components/es5/twitter.services');
    
    (function(){
        //add services
        var asvc=new ApplicationServices();

        var mc=new MastercardServices();

        var tfl=new TfLServices();
        var sim=new SimplifyServices();
        var pol=new PoliceServices();
        var tw=new TwitterServices();

        window.app=new Application(asvc,mc,tfl,sim,pol,tw);
        
        
        app.start();
    }());
    
}());
