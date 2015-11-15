/*global $, window, L */

// import io from 'socket.io-client';
// import React from 'react';

(function () {
    'use strict';
    var doc = $(document);
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
