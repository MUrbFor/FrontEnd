import React, {useState, useEffect} from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
//import WCData from "../../data/walkingCyclingData.json"
import {  iconEV  } from '../markers/Marker.js';
import L from 'leaflet';


function mergeJson(json1, json2, primaryKey, foreignKey){
    const merged = [];
    json1.forEach(obj1 =>
        {
            var obj1MergedBool = false;
            json2.some(obj2 => {
                if (obj1.properties[primaryKey] == obj2[foreignKey]){
                    merged.push(Object.assign(obj1, obj2));
                    obj1MergedBool = true;
                }
            })
            if (obj1MergedBool == false){
                merged.push(obj1);
            }
        }
    )
    return merged;
}

function getColour(d) {
    return d > 60 ? '#800026' :
        d > 50  ? '#BD0026' :
        d > 45  ? '#E31A1C' :
        d > 40 ? '#FC4E2A' :
        d > 30   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function WalkCycle(props) {
    var layName = "Walking and Cyling Data";

    const [WCdata,WCsetData] = useState();

    var hold;
    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/walkingCyclingData")
        .then(response => response.json())
        .then(res => {
            hold = res;
            loadData2();           
        });
    }
    const loadData2 = async () =>{
        const x = await fetch("https://cleanstreetserver.herokuapp.com/v1/GBLayer")
        .then(resp=> resp.json())
        .then(data => {
            var dFeatures = data.features;

            var jsonsMerged = mergeJson(dFeatures, hold, "LAD13CD", "geographyCode"); 

            const feature = jsonsMerged.map(feature=>{
                return(feature);
            });
            WCsetData(feature);
        })
    }
    

    useEffect(() => {
        loadData();
    }, []);


    const style = (feature => {
        return ({
            fillColor: getColour(feature.Any_walking_or_cycling_3pw),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.65
        });
    });

    return(
        <LayersControl.Overlay name={layName}>
        <FeatureGroup name="Marker with popup">
            {WCdata && (
                <GeoJSON data={WCdata} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );


    // return(
    //     <LayersControl.Overlay name="Blue Badge Data">
        
    //     </LayersControl.Overlay>
    // );
}

export default WalkCycle;