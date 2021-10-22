import React from 'react';
import { useMap,MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup,GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
import BadgeData from "../../data/BlueBadge.json"
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
    return d > 21000 ? '#800026' :
        d > 19000  ? '#BD0026' :
        d > 15000  ? '#E31A1C' :
        d > 11000 ? '#FC4E2A' :
        d > 7000   ? '#FD8D3C' :
        d > 3000   ? '#FEB24C' :
        d > 1000   ? '#FED976' :
                    '#FFEDA0';
}

function BlueBadgeLayer(props) {

    // const map = useMap()
    // var legend = L.control({position: "bottomleft"});
    // legend.onAdd = function(map) {
    //     var div = L.DomUtil.create("div", "legend"); 
    //     div.innerHTML += "<h4>Registered Blue Badges</h4>";
    //     div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 1,000</span><br>';  
    //     div.innerHTML += '<i style="background: #FED976"></i><span>1,000 - 3,000</span><br>';
    //     div.innerHTML += '<i style="background: #FEB24C"></i><span>3,000 - 7,000</span><br>';  
    //     div.innerHTML += '<i style="background: #FD8D3C"></i><span>7,000 - 11,000</span><br>';                           
    //     div.innerHTML += '<i style="background: #FC4E2A"></i><span>11,000 - 15,000</span><br>';  
    //     div.innerHTML += '<i style="background: #E31A1C"></i><span>15,000 - 19,000</span><br>';  
    //     div.innerHTML += '<i style="background: #BD0026"></i><span>19,000 - 21,000</span><br>';  
    //     div.innerHTML += '<i style="background: #800026"></i><span>21,000+</span><br>';  

    //     return div;
    // };
    var layName = "Blue Badge Data";
    // map.on("overlayadd", function(e){
    //     if (e.name == layName){
    //         console.log("Blue Badge Data ADDED")
    //         if (props.legeState.lenth>0){
    //             map.removeControl(props.legeState[0]);
    //             //props.handleLedgeChange([legend]);
    //         }

    //         if (!map.hasLayer(legend)){
    //             legend.addTo(map);
    //             props.handleLedgeChange([legend]);
    //         }
            
    //     }
    // })

    // map.on("overlayremove", function(e){
    //     if (!map.hasLayer(e)){
    //         map.removeControl(legend)
    //     }
    // })


    var jsonsMerged = mergeJson(features, BadgeData, "LAD13CD", "ONSCode");   

    const style = (feature => {
        return ({
            fillColor: getColour(feature.TotalBBIssued),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name={layName}>
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
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

export default BlueBadgeLayer;