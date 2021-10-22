import React,{ useState } from 'react';
import { useMap, Marker, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/Marker.js';
import L from 'leaflet';

function TXRLayer(props) {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const TXR = indexed.filter(stop => stop.StopType === "TXR");

    const map = useMap()
    var TXRlegend = L.control({position: "bottomleft"});
    TXRlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Taxi Ranks</span><br>';                         

        return div;
    };

    var WClegend = L.control({position: "bottomleft"});
    WClegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Walking/Cycling Activity P/Week</h4>";
        div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 10</span><br>';  
        div.innerHTML += '<i style="background: #FED976"></i><span>10 - 20</span><br>';
        div.innerHTML += '<i style="background: #FEB24C"></i><span>20 - 30</span><br>';  
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>30 - 40/span><br>';                           
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>40 - 45</span><br>';  
        div.innerHTML += '<i style="background: #E31A1C"></i><span>45 - 50</span><br>';  
        div.innerHTML += '<i style="background: #BD0026"></i><span>50 - 60</span><br>'; 
        div.innerHTML += '<i style="background: #800026"></i><span>60+</span><br>';  

        return div;
    };

    var MClegend = L.control({position: "bottomleft"});
    MClegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Motorcyle Count</h4>";
        div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 1,000</span><br>';  
        div.innerHTML += '<i style="background: #FED976"></i><span>1,000 - 3,000</span><br>';
        div.innerHTML += '<i style="background: #FEB24C"></i><span>3,000 - 7,000</span><br>';  
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>7,000 - 11,000</span><br>';                           
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>11,000 - 15,000</span><br>';  
        div.innerHTML += '<i style="background: #E31A1C"></i><span>15,000 - 19,000</span><br>';  
        div.innerHTML += '<i style="background: #BD0026"></i><span>19,000 - 21,000</span><br>';  
        div.innerHTML += '<i style="background: #800026"></i><span>21,000+</span><br>'; 

        return div;
    };

    var Carlegend = L.control({position: "bottomleft"});
    Carlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Car Count</h4>";
        div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 10,000</span><br>';  
        div.innerHTML += '<i style="background: #FED976"></i><span>10,000 - 25,000</span><br>';
        div.innerHTML += '<i style="background: #FEB24C"></i><span>25,000 - 50,000</span><br>';  
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>50,000 - 80,000</span><br>';                           
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>80,000 - 110,000</span><br>';  
        div.innerHTML += '<i style="background: #E31A1C"></i><span>110,000 - 150,000</span><br>';  
        div.innerHTML += '<i style="background: #BD0026"></i><span>150,000 - 200,000</span><br>';  
        div.innerHTML += '<i style="background: #800026"></i><span>200,000+</span><br>'; 

        return div;
    };

    var RSElegend = L.control({position: "bottomleft"});

    RSElegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Train Stations</span><br>';                         

        return div;
    };

    var Poplegend = L.control({position: "bottomleft"});
    Poplegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Population Count</h4>";
        div.innerHTML += '<i style="background: #FFEDA0"></i><span>0 - 25,000</span><br>';  
        div.innerHTML += '<i style="background: #FED976"></i><span>25,000 - 50,000</span><br>';
        div.innerHTML += '<i style="background: #FEB24C"></i><span>50,000 - 100,000</span><br>';  
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>100,000 - 200,000</span><br>';                           
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>200,000 - 300,000</span><br>';  
        div.innerHTML += '<i style="background: #E31A1C"></i><span>300,000 - 400,000</span><br>';  
        div.innerHTML += '<i style="background: #BD0026"></i><span>400,000 - 500,000</span><br>';  
        div.innerHTML += '<i style="background: #800026"></i><span>500,000+</span><br>'; 

        return div;
    };

    var PLTlegend = L.control({position: "bottomleft"});
    PLTlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Metro Stops</span><br>';                         

        return div;
    };

    var METlegend = L.control({position: "bottomleft"});
    METlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Metro Stops</span><br>';                         

        return div;
    };

    var FTDlegend = L.control({position: "bottomleft"});
    FTDlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Ferry Ports</span><br>';                         

        return div;
    };

    var BCTlegend = L.control({position: "bottomleft"});
    BCTlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Bus Stops</span><br>';                         

        return div;
    };

    var AIRlegend = L.control({position: "bottomleft"});
    AIRlegend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend"); 
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: #00008b"></i><span>Air Ports</span><br>';                         

        return div;
    };

    var addedLayers = [];
    var curLegend = "";
    var layName = "TXR"
    

    map.on("overlayadd", function(e){
        //console.log(e.name);
        if (curLegend != ""){
            //if theres already a legend remove the last added one
            map.removeControl(curLegend);
            curLegend = "";
        }

        if (e.name == "TXR"){
            console.log("TXR ADDED");
            addedLayers[e.name] = [e,TXRlegend];
            TXRlegend.addTo(map);
            curLegend = TXRlegend;
            //console.log(TXRlegend);
        }

        if (e.name == "Walking and Cyling Data"){
            console.log("Walking and Cyling Data");
            addedLayers[e.name] = [e,WClegend];
            WClegend.addTo(map);
            curLegend = WClegend;
            //console.log(TXRlegend);
        }

        if (e.name == "Motorcyle Count P/region"){
            console.log("Motorcyle Count P/region");
            addedLayers[e.name] = [e,MClegend];
            MClegend.addTo(map);
            curLegend = MClegend;
            //console.log(TXRlegend);
        }

        if (e.name == "Car Count P/region"){
            console.log("Car Count P/region");
            addedLayers[e.name] = [e,Carlegend];
            Carlegend.addTo(map);
            curLegend = Carlegend;
            //console.log(TXRlegend);
        }

        if (e.name == "RSE"){
            console.log("RSE");
            addedLayers[e.name] = [e,RSElegend];
            RSElegend.addTo(map);
            curLegend = RSElegend;
            //console.log(TXRlegend);
        }

        if (e.name == "Population"){
            console.log("Population");
            addedLayers[e.name] = [e,Poplegend];
            Poplegend.addTo(map);
            curLegend = Poplegend;
        }

        if (e.name == "PLT"){
            console.log("PLT");
            addedLayers[e.name] = [e,PLTlegend];
            PLTlegend.addTo(map);
            curLegend = PLTlegend;
        }

        if (e.name == "MET"){
            console.log("MET");
            addedLayers[e.name] = [e,METlegend];
            METlegend.addTo(map);
            curLegend = METlegend;
        }

        if (e.name == "FTD"){
            console.log("FTD");
            addedLayers[e.name] = [e,FTDlegend];
            FTDlegend.addTo(map);
            curLegend = FTDlegend;
        }

        if (e.name == "BCT"){
            console.log("BCT");
            addedLayers[e.name] = [e,BCTlegend];
            BCTlegend.addTo(map);
            curLegend = BCTlegend;
        }

        if (e.name == "AIR"){
            console.log("AIR");
            addedLayers[e.name] = [e,AIRlegend];
            AIRlegend.addTo(map);
            curLegend = AIRlegend;
        }
        
        
        

        

        console.log(Object.keys(addedLayers).length);
    })

    map.on("overlayremove", function(e){
        console.log(Object.keys(addedLayers).length);
        //console.log(e.name);
        //console.log(curLegend);
        if (curLegend != ""){
            console.log(curLegend);
            //if theres already a legend remove the last added one
            map.removeControl(curLegend);
            curLegend = "";
        }
        console.log(addedLayers);
        var addedLayersKeys = Object.keys(addedLayers);
        addedLayersKeys.forEach(key => {
            if (!map.hasLayer(addedLayers[key][0])){
                delete addedLayers[key];
            }
        })
        console.log(Object.keys(addedLayers).length);
        console.log(addedLayers);
        if (Object.keys(addedLayers).length != 0){
            var lastAdd = addedLayersKeys.at(-1);
            addedLayers[lastAdd][1].addTo(map);
            curLegend = addedLayers[lastAdd][1];
        }
        console.log(Object.keys(addedLayers).length);
    })

    
    //map.addControl()

    return(
        <LayersControl.Overlay name={layName}>
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