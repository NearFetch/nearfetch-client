/*global $, window, L */

// import io from 'socket.io-client';
// import React from 'react';

(function () {
    'use strict';
    var doc = $(document);
    var Application=(function(){

    	this.$fetch=document.querySelector('fetch-widget');
    	this.$fetch.verify();

    	this.$route=document.querySelector('route-widget');
    	this.$route.verify();

    	this.$leaflet=document.querySelector('leaflet-view');
    	this.$leaflet.verify();

    	this.$leaflet.connectChildren(this.$fetch,this.$route);

    	this.$fetch.connectParent(this.$leaflet);
    	this.$route.connectParent(this.$leaflet);
		this.$event=[];
		this.$listener={};
    	//document.querySelector('some-element')
    	return{
    		verify:function(){
    			console.log("app verified");
    			
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
    window.app=new Application();
    app.start();
}());
