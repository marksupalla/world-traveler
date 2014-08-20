/* global google:true */

(function(){
  'use strict';

var map;

  $(document).ready(function(){
    initMap(36.2, -86.7, 1);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name, google.maps.Animation.DROP);
    });
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name  = $(tr).attr('data-name'),
          lat   = $(tr).attr('data-lat'),
          lng   = $(tr).attr('data-lng'),
          pos   = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });
    return positions;
  }

  function initMap(lat, lng, zoom){
    var styles     = [{'featureType':'water','stylers':[{'color':'#19a0d8'}]},{'featureType':'administrative','elementType':'labels.text.stroke','stylers':[{'color':'#ffffff'},{'weight':6}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#e85113'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#efe9e4'},{'lightness':-40}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#efe9e4'},{'lightness':-20}]},{'featureType':'road','elementType':'labels.text.stroke','stylers':[{'lightness':100}]},{'featureType':'road','elementType':'labels.text.fill','stylers':[{'lightness':-100}]},{'featureType':'road.highway','elementType':'labels.icon'},{'featureType':'landscape','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'landscape','stylers':[{'lightness':20},{'color':'#efe9e4'}]},{'featureType':'landscape.man_made','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels.text.stroke','stylers':[{'lightness':100}]},{'featureType':'water','elementType':'labels.text.fill','stylers':[{'lightness':-100}]},{'featureType':'poi','elementType':'labels.text.fill','stylers':[{'hue':'#11ff00'}]},{'featureType':'poi','elementType':'labels.text.stroke','stylers':[{'lightness':100}]},{'featureType':'poi','elementType':'labels.icon','stylers':[{'hue':'#4cff00'},{'saturation':58}]},{'featureType':'poi','elementType':'geometry','stylers':[{'visibility':'on'},{'color':'#f0e4d3'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#efe9e4'},{'lightness':-25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#efe9e4'},{'lightness':-10}]},{'featureType':'poi','elementType':'labels','stylers':[{'visibility':'simplified'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();

