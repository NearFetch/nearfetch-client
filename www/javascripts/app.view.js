/*global $, window, L */

// import io from 'socket.io-client';
// import React from 'react';

(function () {
    'use strict';
    var doc = $(document);
    var Application=(function(){
    	console.log("application loaded");
    	this.$fetch=document.querySelector('fetch-widget');
    	this.$fetch.verify();
    	this.$route=document.querySelector('route-widget');
    	this.$route.verify();
    	this.$leaflet=document.querySelector('leaflet-view');
    	this.$leaflet.verify();


    	this.$leaflet.connectChildren(this.$fetch,this.$route);
    	this.$fetch.connectParent(this.$leaflet);
    	this.$route.connectParent(this.$leaflet);

    	//document.querySelector('some-element')
    	return{
    		verify:function(){
    			console.log("app verified");
    			this.$fetch=document.querySelector('fetch-widget');
    			console.log(fetch);
    		},
    		register:function(name,obj){
    			var rname="register:"+name;
    			console.log({rname:obj})
    			if(name=="fetch"){
					console.log("fetch registered");
					this.$fetch=obj;
    			}
    			if(name=="route"){
					console.log("route registered");
					this.$route=obj;
    			}
    			if(name=="leaflet"){
					console.log("leaflet registered");
					this.$leaflet=obj;
    			}
    			console.log(this.$leaflet);
    			if(this.$leaflet!=undefined && this.$fetch!=undefined && this.$route!=undefined){
    				console.log("all apps loaded");
    				this.$leaflet.verify();
    				this.$fetch.verify();
    				this.$route.verify();
    			}
    			return true;
    		}
    	}
    });
    window.app=new Application();
}());
