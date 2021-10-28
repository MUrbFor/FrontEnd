import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import {  iconEV  } from '../markers/Marker.js';

function DundeeStations() {
    const [Dundeedata,DundeesetData] = useState([]);
    useEffect(()=> {
        loadData();
    }, []);
    
    const loadData = async () =>{
        await fetch("https://gbfs.rideondundee.com/gbfs.json")
        .then(response => response.json())
        .then(data => DundeesetData(data))
    }
    
    //fetch dundee station data as stations
    //fetch dundee station status data as stationStatus
    
    // stationsList =[];
    // len = stations.length();
    // c=0;
    // while(c<len){
    //     var stationTemp=[];
    //     stationId = stations[c].station_id;
    //     stationName = stations[c].name;
    //     stationAddress = stations[c].address;
    //     stationLat = stations[c].lat;
    //     stationLon = stations[c].lon;
    //     if (stationStatus[c].station_id==stationId){
    //         stationReturning = stationStatus[c].is_returning;
    //         lastReported = stationStatus[c].last_reported;
    //         numBikes = stationStatus[c].num_bike_available;
    //         numDock = stationStatus[c].num_docks_available;
    //     }
    //     stationTemp.push(stationId, stationName, stationAddress, stationLat, stationLon, stationReturning, lastReported, numBikes, numDock);
    //     stationList.push(stationTemp);
    // }
    // const indexed = stationList.map((item, id) => Object.assign(item, {id}));  
    return(
        <LayersControl.Overlay name="Dundee Stations">
        {/* <FeatureGroup name="Marker with popup">
            {indexed.map(stop => (
            <Marker 
                key = {stop.id}
                icon = {iconEV}
                position={[stop.stationLat, stop.stationLon]}> 
                <Popup>
                    Station
                </Popup>
            </Marker>
            ))}
        </FeatureGroup> */}
        </LayersControl.Overlay>
    );
}

export default DundeeStations;







