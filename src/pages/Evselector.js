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
import HouseholdActivityLayer from '../components/mapLayers/HouseholdActivity'; 
import CurBEV, { CurULEV,Population, PrivULEV, CommercialULEV,CurULEVPercent,ResidentialProperties,PercentPropertiesTenements,TotalULEVs2045,TotalBEVs2045} from '../components/mapLayers/cityPopExports.js';
//import CurBEV from '../components/mapLayers/cityPopExports.js';
import BizMSOA from '../components/mapLayers/bizMSOA';
import {features} from "../data/GBLayer.json";
import bizData from "../data/businesses count size and nature.json";

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

function Evselector() {
    //comment-01 layergroup declared
    var layerGroup = L.featureGroup();
    var LASelectLayer;
    const [legeState, setLegeState] = React.useState([]);
    const handleLedgeChange = (e) => {
        setLegeState(e);
    };

    //all states 
    //=========================================================================
    //const [selectedLA, setselectedLA ] = useState(); 
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
    //console.log(items);
    const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    }

    const handleOnHover = (result) => {
    // the item hovered
    }
    //comment-02 array for holding search input variables, first 4 are for holding selected LA for that search box, last two are for 
    //storing if one or multiple LA's are being searched 
    var searchArr = ["null", "null", "null", "null", "", ""];
    const [searchValue1, setSearchValue1] = useState("null");
    // const [searchValue2, setSearchValue2] = useState("null");
    // const [searchValue3, setSearchValue3] = useState("null");
    // const [searchValue4, setSearchValue4] = useState("null");
    const [v1, setv1] = useState(null);
    const handleOnSelect1 = (item) => {
        //setSearchValue1(item.name);
        searchArr[0] = item.name;
        if (searchArr[4] == "first"){
            searchArr[5] = "multiple";
        }
        if (searchArr[4] == ""){
            searchArr[4] = "first";
        }
        processSearch(map);

    }

    const handleOnSelect2 = (item) => {
        //setSearchValue2(item.name);
        searchArr[1] = item.name;
        if (searchArr[4] == "first"){
            searchArr[5] = "multiple";
        }
        if (searchArr[4] == ""){
            searchArr[4] = "first";
        }
        //setSearchArrr(searchArr);
        processSearch(map);
    }
    
    const handleOnSelect3 = (item) => {
        //setSearchValue3(item.name);
        searchArr[2] = item.name;
        if (searchArr[4] == "first"){
            searchArr[5] = "multiple";
        }
        if (searchArr[4] == ""){
            searchArr[4] = "first";
        }
        //setSearchArrr(searchArr);
        processSearch(map);
    }
    
    const handleOnSelect4 = (item) => {
        //setSearchValue4(item.name);
        searchArr[3] = item.name;
        if (searchArr[4] == "first"){
            searchArr[5] = "multiple";
        }
        if (searchArr[4] == ""){
            searchArr[4] = "first";
        }
        console.log("search V 4 set:" + item.name);
        //setSearchArrr(searchArr);
        processSearch(map);
    }
    
    
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
    //comment-03 function thats called when search box array variables have been updated (handelOnSearch1-4)
    function processSearch(map){
        var move = true;
        //comment-04 event listener that creates MSOA layer (this currently is here because it needs to access the searchArray variables)
        map.on("overlayadd", function(e){
            console.log("event trigger");
            var searchArrr = [];
            searchArr.forEach(toSearch =>{
                if (toSearch != "null" && toSearch != "" && toSearch != "first" && toSearch != "multiple"){
                    searchArrr.push(toSearch);
                }
            })
            var newLayGroup = L.layerGroup();
            map.addLayer(newLayGroup);
            //newLayGroup.addTo(map);
            var funkyNumbers = [];
            searchArrr.forEach(searchTerm => {
                features.forEach(feature => {
                    if (feature.properties.LAD13NM == searchTerm){
                        funkyNumbers.push(feature.properties.LAD13CD);
                    }
                })
            })
            console.log("funky numbers");
            console.log(funkyNumbers);
            if (e.name == "biz"){
                
                //var FN = 'E06000013';
                funkyNumbers.forEach(FN => {


                    function getColour(d) {
                        return d > 200 ? '#800026' :
                            d > 150  ? '#BD0026' :
                            d > 100  ? '#E31A1C' :
                            d > 15 ? '#FC4E2A' :
                            d > 8   ? '#FD8D3C' :
                            d > 4   ? '#FEB24C' :
                            d > 1   ? '#FED976' :
                                        '#FFEDA0';
                    }
                    const style = (feature => {
                        return ({
                            fillColor: getColour(feature.Micro),
                            weight: 1,
                            opacity: 1,
                            color: 'black',
                            dashArray: '2',
                            fillOpacity: 0.65
                        });
                    });

                    var jsonsMerged = mergeJson(x, bizData, "MSOA11NM", "MSOA-name"); 
                    console.log(jsonsMerged);

                    const feature = jsonsMerged.map(feature=>{
                        return(feature);
                    });

                    var ggeoJson = L.geoJson(feature, {style: style});
                    ggeoJson.addTo(newLayGroup);
                })
                
                
            }
            //comment-05 second part of the event listener here that clears and recreates the LA highlight layer
            move = false;
            layerGroup.clearLayers();
            console.log("searchArr len" +searchArr.length );
            console.log("search V 1" +searchArr[0]);
            console.log("search V 2" +searchArr[1]);
            console.log("search V 3" +searchArr[2]);
            console.log("search V 4" +searchArr[3]);
            if (searchArr[5] == "multiple"){
                console.log("MULTIPLE LA's 2 Search")
                //fly to whole uk with low zoom lvl
                // if (move == true){
                //     map.flyTo([54.059388, -3.793332], 6);
                // }
                
                function getColour(d) {
                    var toRe = '#606060';
                    searchArr.forEach(selLA => {
                        //console.log(selLA);
                        //console.log("d:"+d);
                        //if (selLA != "null"){
                            if(selLA == d){
                                //console.log("highlight");
                                toRe = '#F2f2f2';
                            }
                        //}
                    })
                    return toRe;
                }

                function getFillOpacity(d){
                    var toRe = 1;
                    searchArr.forEach(selLA => {
                        //if (selLA != "null"){
                            if(selLA == d){
                                toRe = 0.05;
                            }
                        //}
                    })
                    return toRe ;
                }

                const stylee = (feature => {
                    return ({
                        fillColor: getColour(feature.properties.LAD13NM),
                        weight: 1,
                        opacity: 1,
                        fillOpacity: getFillOpacity(feature.properties.LAD13NM),
                        color: 'black',
                        
                    });
                });

                const feature = features.map(feature=>{
                    return(feature);
                });

                //var geoJSON = L.geoJson(feature, {style: style});
                //geoJSON.addTo(layerGroup);
                //geoJSON.addTo(map);
                var nGeo = L.geoJson(feature, {style: stylee}).addTo(layerGroup);
                LASelectLayer = nGeo;


            }
            else {
                var searchMe;
                searchArr.forEach(toSearch =>{
                    if (toSearch != "null" && toSearch != "" && toSearch != "first"){
                        searchMe = toSearch;
                    }
                })
                axios.get(`https://nominatim.openstreetmap.org/?format=json&city=${searchMe}`)
                .then(res => {               
                    // const all_addresses = res.data;
                    var results = res.data;
                    if (move == true){
                        map.flyTo([results[0].lat, results[0].lon], 11);
                    }
                    
        
                    //load GBLayer
                    console.log(searchMe);
                    console.log(features);
                    
                    function getColour(d) {
                        return searchMe == d ? '#F2f2f2' :
                                                '#606060' ;
                    }
                    
                    function getFillOpacity(d){
                        return searchMe == d ? 0.05 :
                                                0.9 ;
                    }
        
                    const style = (feature => {
                        return ({
                            fillColor: getColour(feature.properties.LAD13NM),
                            weight: 1,
                            opacity: 1,
                            fillOpacity: getFillOpacity(feature.properties.LAD13NM),
                            color: 'black',
                            
                        });
                    });
        
                    const feature = features.map(feature=>{
                        return(feature);
                    });
                    
                    var geoJSON = L.geoJson(feature, {style: style});
                    geoJSON.addTo(layerGroup);
                    LASelectLayer = geoJSON;
        
        
                    // var LAcenter = [results[0].lat, results[0].lon];
                    // setgeocodedLA(LAcenter);
                    // setTheArray(address => [...address, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", address: all_addresses.display_name}]);
                }); 
            }
            //processSearch(map);

        })
        //comment-06 LA highlight layer creation for when search array variables are changed
        layerGroup.clearLayers();
        console.log("searchArr len" +searchArr.length );
        console.log("search V 1" +searchArr[0]);
        console.log("search V 2" +searchArr[1]);
        console.log("search V 3" +searchArr[2]);
        console.log("search V 4" +searchArr[3]);
        if (searchArr[5] == "multiple"){
            console.log("MULTIPLE LA's 2 Search")
            //fly to whole uk with low zoom lvl
            if (move == true){
                map.flyTo([54.059388, -3.793332], 6);
            }
            
            function getColour(d) {
                var toRe = '#606060';
                searchArr.forEach(selLA => {
                    //console.log(selLA);
                    //console.log("d:"+d);
                    //if (selLA != "null"){
                        if(selLA == d){
                            //console.log("highlight");
                            toRe = '#F2f2f2';
                        }
                    //}
                })
                return toRe;
            }

            function getFillOpacity(d){
                var toRe = 1;
                searchArr.forEach(selLA => {
                    //if (selLA != "null"){
                        if(selLA == d){
                            toRe = 0.05;
                        }
                    //}
                })
                return toRe ;
            }

            const stylee = (feature => {
                return ({
                    fillColor: getColour(feature.properties.LAD13NM),
                    weight: 1,
                    opacity: 1,
                    fillOpacity: getFillOpacity(feature.properties.LAD13NM),
                    color: 'black',
                    
                });
            });

            const feature = features.map(feature=>{
                return(feature);
            });

            //var geoJSON = L.geoJson(feature, {style: style});
            //geoJSON.addTo(layerGroup);
            //geoJSON.addTo(map);
            var nGeo = L.geoJson(feature, {style: stylee}).addTo(layerGroup);
            LASelectLayer = nGeo;


        }
        else {
            var searchMe;
            searchArr.forEach(toSearch =>{
                if (toSearch != "null" && toSearch != "" && toSearch != "first"){
                    searchMe = toSearch;
                }
            })
            axios.get(`https://nominatim.openstreetmap.org/?format=json&city=${searchMe}`)
            .then(res => {               
                // const all_addresses = res.data;
                var results = res.data;
                if (move == true){
                    map.flyTo([results[0].lat, results[0].lon], 11);
                }
                
    
                //load GBLayer
                console.log(searchMe);
                console.log(features);
                
                function getColour(d) {
                    return searchMe == d ? '#F2f2f2' :
                                            '#606060' ;
                }
                
                function getFillOpacity(d){
                    return searchMe == d ? 0.05 :
                                            0.9 ;
                }
    
                const style = (feature => {
                    return ({
                        fillColor: getColour(feature.properties.LAD13NM),
                        weight: 1,
                        opacity: 1,
                        fillOpacity: getFillOpacity(feature.properties.LAD13NM),
                        color: 'black',
                        
                    });
                });
    
                const feature = features.map(feature=>{
                    return(feature);
                });
                
                var geoJSON = L.geoJson(feature, {style: style});
                geoJSON.addTo(layerGroup);
                LASelectLayer = geoJSON;
    
    
                // var LAcenter = [results[0].lat, results[0].lon];
                // setgeocodedLA(LAcenter);
                // setTheArray(address => [...address, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", address: all_addresses.display_name}]);
            }); 
        }
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
            <div style={{ width: 1600 }}>
                <div style={{ display: 'inline-block', width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect1}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder="Enter a local authority"
                    />
                </div>
                <div style={{ display: 'inline-block', width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect2}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder="Add another LA"
                    />
                </div>
                <div style={{ display: 'inline-block', width: 400}}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect3}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder="Add another LA"
                    />
                </div>
                <div style={{ display: 'inline-block', width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect4}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder="Add another LA"
                    />
                </div>
            



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
                    //console.log("Added Layer:", e.target);
                    },
                    remove: (e) => {
                    //console.log("Removed layer:", e.target);
                    //console.log("Removed layer:", e.target);
                    }
                }}
                />
            </LayersControl.BaseLayer>
                <FeatureGroup>
                    <EditControl position="topleft" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted} draw={{rectangle: false, polyline:false, circle: false, circlemarker: false, marker: true}}/>
                </FeatureGroup>

                <LayerGroup>
                    <HouseholdActivityLayer/>
                </LayerGroup>
                HouseholdActivityLayer
                <LayerGroup name="nodes">
                    <METLayer />
                    <TXRLayer />
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
                    
                    <CurBEV />
                    <Population/>
                   
                    <CurULEV/>
                    <PrivULEV/>
                    <CommercialULEV/>
                    <CurULEVPercent/>
                    <TotalULEVs2045/>
                    <TotalBEVs2045/>
                    <ResidentialProperties/>
                    <PercentPropertiesTenements/>
                    
                    <BizMSOA/>

                    {/* <DundeeStations/> */}
                    {/* <TrafficCount/>  */}
                    

                </LayerGroup> 
            </LayersControl>
            <MapConsumer>
                {(map) => {
                    //layerGroup.addTo(map);
                    map.addLayer(layerGroup);
                    //console.log('map center:', map.getCenter())
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
                        div.innerHTML += '<i style="background: #FD8D3C"></i><span>30 - 40</span><br>';                           
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
                    //comment-07 Legends are declared above, event listeners using the above legends are added for layers being added and removed
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
                                console.log("TXR ADDED");
                                addedLayers[e.name] = [e,TXRlegend];
                                TXRlegend.addTo(map);
                                curLegend = TXRlegend;
                                //console.log(TXRlegend);
                                //console.log(TXRlegend);
                            }
                    
                            if (e.name == "Walking and Cyling Data"){
                                console.log("Walking and Cyling Data");
                                console.log("Walking and Cyling Data");
                                addedLayers[e.name] = [e,WClegend];
                                WClegend.addTo(map);
                                curLegend = WClegend;
                                //console.log(TXRlegend);
                                //console.log(TXRlegend);
                            }
                    
                            if (e.name == "Motorcyle Count P/region"){
                                console.log("Motorcyle Count P/region");
                                console.log("Motorcyle Count P/region");
                                addedLayers[e.name] = [e,MClegend];
                                MClegend.addTo(map);
                                curLegend = MClegend;
                                //console.log(TXRlegend);
                                //console.log(TXRlegend);
                            }
                    
                            if (e.name == "Car Count P/region"){
                                console.log("Car Count P/region");
                                console.log("Car Count P/region");
                                addedLayers[e.name] = [e,Carlegend];
                                Carlegend.addTo(map);
                                curLegend = Carlegend;
                                //console.log(TXRlegend);
                                //console.log(TXRlegend);
                            }
                    
                            if (e.name == "RSE"){
                                console.log("RSE");
                                console.log("RSE");
                                addedLayers[e.name] = [e,RSElegend];
                                RSElegend.addTo(map);
                                curLegend = RSElegend;
                                //console.log(TXRlegend);
                                //console.log(TXRlegend);
                            }
                    
                            if (e.name == "Population"){
                                console.log("Population");
                                console.log("Population");
                                addedLayers[e.name] = [e,Poplegend];
                                Poplegend.addTo(map);
                                curLegend = Poplegend;
                            }
                    
                            if (e.name == "PLT"){
                                console.log("PLT");
                                console.log("PLT");
                                addedLayers[e.name] = [e,PLTlegend];
                                PLTlegend.addTo(map);
                                curLegend = PLTlegend;
                            }
                    
                            if (e.name == "MET"){
                                console.log("MET");
                                console.log("MET");
                                addedLayers[e.name] = [e,METlegend];
                                METlegend.addTo(map);
                                curLegend = METlegend;
                            }
                    
                            if (e.name == "FTD"){
                                console.log("FTD");
                                console.log("FTD");
                                addedLayers[e.name] = [e,FTDlegend];
                                FTDlegend.addTo(map);
                                curLegend = FTDlegend;
                            }
                    
                            if (e.name == "BCT"){
                                console.log("BCT");
                                console.log("BCT");
                                addedLayers[e.name] = [e,BCTlegend];
                                BCTlegend.addTo(map);
                                curLegend = BCTlegend;
                            }
                    
                            if (e.name == "AIR"){
                                console.log("AIR");
                                console.log("AIR");
                                addedLayers[e.name] = [e,AIRlegend];
                                AIRlegend.addTo(map);
                                curLegend = AIRlegend;
                            }

                            console.log(Object.keys(addedLayers).length);
                            console.log(Object.keys(addedLayers).length);
                            //layerGroup.bringToFront();
                            // layerGroup.eachLayer(function (layer) {
                            //     layer.setZIndexOffset(2000);
                            //   });
                            //map.removeLayer(layerGroup);
                            // if(map.hasLayer(layerGroup)){
                            //     console.log("has layer and tried to remove");
                            //     layerGroup.clearLayers();
                            //     map.removeLayer(layerGroup);
                                
                            // }
                            //LASelectLayer.addTo(layerGroup);
                            //processSearch();
                            //console.log("layers:");
                            //console.log(map.getLayers());
                            // map.clearLayers();
                            //processSearch(map);
                            //map.getLay
                            
                        })
                    
                        map.on("overlayremove", function(e){
                            //layerGroup.clearLayers();
                            console.log(Object.keys(addedLayers).length);
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




