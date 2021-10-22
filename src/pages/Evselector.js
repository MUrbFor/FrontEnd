import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup} from 'react-leaflet';
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
import stops from '../data/stops';
function Evselector() {

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
    //==============================================================================================

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
        <MapContainer style={{ height: "70vh" }} center={[54.975340, -1.612828]} zoom={14} scrollWheelZoom={true} whenCreated ={setMap}>
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            filter= "myFilter"
            />
        </LayersControl.BaseLayer>
            <FeatureGroup>
                <EditControl position="topleft" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted} draw={{rectangle: false, polyline:false, circle: false, circlemarker: false, marker: true}}/>
            </FeatureGroup>
            <LayerGroup>

            </LayerGroup>
        </LayersControl>
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




