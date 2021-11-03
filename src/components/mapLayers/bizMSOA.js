import React, {useState, useEffect} from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
//import WCData from "../../data/walkingCyclingData.json"
import {  iconEV  } from '../markers/Marker.js';
import L from 'leaflet';




function BizMSOA(props) {
    return(
        <LayersControl.Overlay name="biz">
        <FeatureGroup name="Marker with popup">
        </FeatureGroup>
        </LayersControl.Overlay>
    );


    // return(
    //     <LayersControl.Overlay name="Blue Badge Data">
        
    //     </LayersControl.Overlay>
    // );
}

export default BizMSOA;