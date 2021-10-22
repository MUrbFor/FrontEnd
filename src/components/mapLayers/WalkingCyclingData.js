import React from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
import WCData from "../../data/walkingCyclingData.json"
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
    // const map = useMap()
    // var legend = L.control({position: "bottomleft"});
    // legend.onAdd = function(map) {
    //     var div = L.DomUtil.create("div", "legend"); 
    //     div.innerHTML += "<h4>Walking/Cycling Activity P/Week</h4>";
    //     div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 10</span><br>';  
    //     div.innerHTML += '<i style="background: #FED976"></i><span>10 - 20</span><br>';
    //     div.innerHTML += '<i style="background: #FEB24C"></i><span>20 - 30</span><br>';  
    //     div.innerHTML += '<i style="background: #FD8D3C"></i><span>30 - 40/span><br>';                           
    //     div.innerHTML += '<i style="background: #FC4E2A"></i><span>40 - 45</span><br>';  
    //     div.innerHTML += '<i style="background: #E31A1C"></i><span>45 - 50</span><br>';  
    //     div.innerHTML += '<i style="background: #BD0026"></i><span>50 - 60</span><br>'; 
    //     div.innerHTML += '<i style="background: #800026"></i><span>60+</span><br>';  

    //     return div;
    // };
    var layName = "Walking and Cyling Data";
    // map.on("overlayadd", function(e){
    //     if (e.name == layName){
    //         console.log("WC Data ADDED")
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

    // map.on("overlayremove", function(){
    //     if (map.hasLayer(legend)){
    //         map.removeControl(legend)
    //     }
    // })
    var jsonsMerged = mergeJson(features, WCData, "LAD13CD", "geographyCode");
   

    



    

    const style = (feature => {
        return ({
            fillColor: getColour(feature.Any_walking_or_cycling_3pw),
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

export default WalkCycle;