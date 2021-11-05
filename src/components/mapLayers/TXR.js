import React, {useState, useEffect} from 'react';
import { useMap, Marker, LayersControl, FeatureGroup } from 'react-leaflet';
//import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/Marker.js';
import L from 'leaflet';

function TXRLayer() {
    const [TXRdata,TXRsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/Stops")
        .then(response => response.json())
        .then(data => TXRsetData(data))
    }
    var stops = TXRdata;

    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const TXR = indexed.filter(stop => stop.StopType === "TXR");

    const map = useMap()


    
    //map.addControl()

    return(
        <LayersControl.Overlay name="TXR">
        <FeatureGroup name="Marker with popup">
            {TXR.map(stop => (
            <Marker 
                key = {stop.id}
                icon = {iconEV}
                position={[stop.Latitude, stop.Longitude]}> 
            </Marker>
            ))}
        </FeatureGroup>
    </LayersControl.Overlay>
    );
}

export default TXRLayer;