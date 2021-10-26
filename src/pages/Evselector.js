import React, {useState, useEffect} from 'react';
import { MapContainer, MapConsumer, TileLayer, LayersControl, FeatureGroup, LayerGroup} from 'react-leaflet';
import { EditControl} from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';
import Layout from '../components/layout/Layout';
import AddedPoints from '../components/spatial/AddedPoints.js';
import './main.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { chargeType } from "../components/forms/Chargepoint";
import { goals } from "../components/forms/Goals";
import axios from 'axios';
import { distance, point, featureCollection, nearestPoint } from '@turf/turf'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import data from '../data/GBLayer';
//import MapFunctions from "../components/functions/MapFunctions";


//mapLayers
import stops from "../data/Stops.json";
import METLayer from "../components/mapLayers/MET.js";
import BCTLayer from "../components/mapLayers/BCT.js";
import PLTLayer from "../components/mapLayers/PLT.js";
import TXRLayer from "../components/mapLayers/TXR.js";
import RSELayer from "../components/mapLayers/RSE.js";
import AIRLayer from "../components/mapLayers/AIR.js";
import FTDLayer from "../components/mapLayers/FTD.js";
//import TrafficCount from "../components/mapLayers/TrafficCount.js";
import LocalAuthoritiesLayer from "../components/mapLayers/LA.js";
import BlueBadgeLayer from "../components/mapLayers/BlueBadge.js";
import WalkCycle from "../components/mapLayers/WalkingCyclingData.js";
import DurhamCarParks from "../components/mapLayers/DurhamCarParks.js";
import VehicleType from '../components/mapLayers/VehicleType.js';
import NumCars  from '../components/mapLayers/numCarsLA';
import EnergyConsumptionLayer from "../components/mapLayers/EnergyCon.js";
import DundeeStations from "../components/mapLayers/dundeeStations.js";
import CurBEV, {CurULEV,Population, PrivULEV, CommercialULEV,CurULEVPercent,ResidentialProperties,percentPropertiesTenements,TotalULEVs2045,TotalBEVs2045} from '../components/mapLayers/cityPopExports.js';




function Evselector() {
    const [legeState, setLegeState] = React.useState([]);
    const handleLedgeChange = (e) => {
        setLegeState(e);
    };

    //all states 
    //=========================================================================
    const [selectedLA, setselectedLA ] = useState(); 
    const [map, setMap] = useState(null);
    
    //search autocomplete
    //===========================================================================
    const loadedData = data.features;
    const targetFeatures = [];
    for(let i=0; i< stops.length;i++){
        var targetcoord = [stops[i].Longitude, stops[i].Latitude];
        targetFeatures[i] = point(targetcoord);
    }   
    var points = featureCollection(targetFeatures);

    const items = [];
    for(let i=0; i< loadedData.length;i++){
        var names = loadedData[i].properties.LAD13NM;
        items[i] = {'name':names, 'id': i};

    }
    //console.log(items);
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
      }
    
      const handleOnHover = (result) => {
        // the item hovered
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        setselectedLA(item.name);

        axios.get(`https://nominatim.openstreetmap.org/?format=json&city=${item.name}`)
        .then(res => {               
            // const all_addresses = res.data;
            var results = res.data;
            map.flyTo([results[0].lat, results[0].lon], 14);
            // var LAcenter = [results[0].lat, results[0].lon];
            // setgeocodedLA(LAcenter);
            // setTheArray(address => [...address, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", address: all_addresses.display_name}]);
        }); 
      }
      const handleOnFocus = () => {
      }
      const formatResult = (item) => {
        return item;
       // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
      }

    const [ value0, setValue0 ] = useState(false); 
    //sliders
    //===================================================================
    const [ value, setValue ] = useState(0); 
    const [ valuetwo, setValuetwo ] = useState(0); 

    // mapdraw stuff  
    //===================================================================
    const [theArray, setTheArray] = useState([]);    
    const [mapLayers, setMapLayers] = useState([]);
    const [finaldistance, setFinalDistance] = useState(0);

    const _onCreate = e => {
        //console.log(e);
        const {layerType, layer} = e;
        if(layerType === "polygon"){
            const{_leaflet_id} = layer;
            //const popupContent = ReactDOMServer.renderToString(<ClientChoice />);
            //var popup = layer.bindPopup(popupContent);
            setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer.getLatLngs()[0], area: L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])}]);
            //setTotalEnergy(added => added + layer.area);
            //layer.openPopup();
        };
        if(layerType === "marker"){
            const{_leaflet_id} = layer;
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${layer._latlng.lat}&lon=${layer._latlng.lng}&zoom=18&addressdetails=1`)
                .then(res => {               
                    const all_addresses = res.data;
                    setTheArray(address => [...address, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", address: all_addresses.display_name, nearest: nearest.properties.distanceToPoint}]);
                });
            //calculating the distance using turf library
            //===================================================================================
            var targetPoint = point([layer._latlng.lat, layer._latlng.lng]);
            var nearest = nearestPoint(targetPoint, points);
            console.log(nearest);
            setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", area: 0},]);

    };
    };
    const _onEdited = e => {
        const {layers: {_layers}} = e;
        Object.values(_layers).map(({_leaflet_id, editing}) => {
            setMapLayers( layers => layers.map( l => l.id === _leaflet_id ? {...l, latlngs: { ...editing.latlngs[0]}}: l));
        });
    };

    const _onDeleted = (e) => {
        const { layers: {_layers}} = e;
        Object.values(_layers).map(({_leaflet_id}) => {
            setMapLayers( layers => 
                layers.filter( l => l.id !== _leaflet_id));
        });
    };
    if (theArray.length > 1) {
        var from = point([theArray[0].latLngs.lat, theArray[0].latLngs.lng]);
        var to = point([theArray[1].latLngs.lat, theArray[1].latLngs.lng]);
        var options = {units: 'miles'};
        var distanceed = distance(from, to, options);
        console.log(distanceed);
    }

    //Marker Setup
    //==============================================================================================
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://icon-library.com/images/charging-station-icon/charging-station-icon-26.jpg',
        iconUrl: 'https://icon-library.com/images/charging-station-icon/charging-station-icon-26.jpg',
        shadowUrl: '',
    });
    

    //checkbox
    //========================================================
    const [checkedState, setCheckedState] = useState(
        new Array(chargeType.length).fill(false)
      );
    
      const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    //nearest

    
    return(
      <Layout>
        <section className="mainPage">
            <div className="container">
            <div className="title">
                <h1 className="main-title">EV Charging Point Site Selector</h1>
                <h3 className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </h3>
            </div>
            </div>
        </section>
        <section>
            <h2 className="left">Where?</h2>
            <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
            />
            </div>
        </section>
        <br/>
        <section>
        <div className="left">
            <h2>What?</h2>
            <p>Type of chargepoints needed:</p>
            <ul className="no-bullet">
                {chargeType.map(({ name, energy }, index) => {
                return (
                    <li key={index}>
                    <div className="toppings-list-item">
                        <div className="left-section">
                        <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                    </div>
                    </li>
                );
                })}
            </ul>
        </div>
        </section>
        <section>
            <div className="left">
                <h2>Why?</h2>
                <p>What are your priority outcomes? choose up to five and rate importance</p>
                <div className="container-row">
                <div className="row-one">
                    <div className="toppings-list-item">
                        <div className="left-section">
                        <input
                            type="checkbox"
                            id= "1"
                            name="Air quality"
                            value="Air quality"
                            checked = "false"
                            onChange={() => handleOnChange(0)}
                        />
                        <label htmlFor={`custom-checkbox-0`}>Improving air quality</label>
                        </div>
                    </div>
                </div>
                <div className="row-two">
                <RangeSlider
                    value={value}
                    onChange={changeEvent => setValue(changeEvent.target.value)}
                    min='0'
                    max='10'
                    size='sm'
                />
                {/* <h1>{value}</h1> */}
                </div>
            </div>
            <div className="container-row">
                <div className="row-one">
                    <div className="toppings-list-item">
                        <div className="left-section">
                        <input
                            type="checkbox"
                            id= "1"
                            name="Air quality"
                            value="Air quality"
                            checked = "false"
                            onChange={() => handleOnChange(0)}
                        />
                        <label htmlFor={`custom-checkbox-1`}>Reducing</label>
                        </div>
                    </div>
                </div>
                <div className="row-two">
                <RangeSlider
                    value={valuetwo}
                    onChange={changeEvent => setValuetwo(changeEvent.target.value)}
                    min='0'
                    max='10'
                    size='sm'
                />
                {/* <h1>{value}</h1> */}
                </div>
            </div>
            </div>
        </section>
        <section>
            <div className="left">
                <h2>Select Your sites</h2>
                <p>Pins to Add</p>
                <ul className="no-bullet">

                </ul>
            </div>
        </section>
        <section>
        <div className="row-map">
        <div className="mapcontainerof">
        <MapContainer style={{ height: "70vh" }} center={[54.975340, -1.612828]} zoom={6.3} scrollWheelZoom={true} whenCreated ={setMap}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Map Overlays">
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                filter= "myFilter"
                eventHandlers={{
                    add: (e) => {
                    //console.log("Added Layer:", e.target);
                    },
                    remove: (e) => {
                    //console.log("Removed layer:", e.target);
                    }
                }}
                />
            </LayersControl.BaseLayer>
                <FeatureGroup>
                    <EditControl position="topleft" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted} draw={{rectangle: false, polyline:false, circle: false, circlemarker: false, marker: true}}/>
                </FeatureGroup>
                <LayerGroup name="nodes">
                    <METLayer />
                    <TXRLayer legeState={legeState} handleLedgeChange = {handleLedgeChange} dogs="props Passed"/>
                    <RSELayer />
                    <AIRLayer />
                    <FTDLayer />
                    
                    {/* <BCTLayer /> */}
                </LayerGroup>
                <LayerGroup name="traffic count">
                    {/* <TrafficCount /> */}
                    <LocalAuthoritiesLayer />
                    <BlueBadgeLayer legeState={legeState} handleLedgeChange = {handleLedgeChange}/>
                    <VehicleType/>
                    <NumCars/>
                    <WalkCycle legeState={legeState} handleLedgeChange = {handleLedgeChange}/>
                </LayerGroup>
                <LayerGroup name="others">
                    <DurhamCarParks/>
                    <Population/>
                    <CurBEV/>
                    <CurULEV/>
                    <PrivULEV/>
                    <CommercialULEV/>
                    <CurULEVPercent/>
                    <ResidentialProperties/>
                    <percentPropertiesTenements/>
                    <TotalULEVs2045/>
                    <TotalBEVs2045/>


                    {/* <DundeeStations/> */}
                    {/* <TrafficCount/>  */}
                    

                </LayerGroup> 
            </LayersControl>
            <MapConsumer>
                {(map) => {
                    //console.log('map center:', map.getCenter())
                    //==================================================================================================map start
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
                    if (!value0){
                        console.log('Fired!');
                        map.on("overlayadd", function(e){
                            console.log("trigger");
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
                        setValue0(true);
                    }
                    return null
                }}
            </MapConsumer>
        </MapContainer>

        </div>
        <div className="details">
            <div>
                {/* <AddedPoints numbers= {mapLayers} /> */}
                <ul className="no-bullet">
                {theArray.map((chargersdata) => {
                return (
                    <li key={chargersdata.place_id}>
                        {/* <p className="left-section">Address: {chargersdata.id}</p> */}
                        <p className="left-section">Address: {chargersdata.address}</p>
                        <p className="left-section">type: {chargersdata.type}</p>
                        <p className="left-section">nearest: {chargersdata.nearest}</p>
                    </li>
                );
                })}
                </ul>
            </div>
        </div>
        </div>
        <p className="left">Distance between the two charger: {distanceed}</p>
        {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}
        </section>
        </Layout>
    );
}

export default Evselector;




