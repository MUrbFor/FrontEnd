import React, {useState, useContext} from 'react';
import FavoritesContext from '../store/favorites-context';
import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup} from 'react-leaflet';
import { EditControl} from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L, { map } from 'leaflet';
import { useEffect } from 'react/cjs/react.development';
import Layout from '../components/layout/Layout';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import data from '../data/GBLayer';
import './main.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { chargeType } from "../components/forms/Chargepoint";


function Evselector() {
    //Checkbox
    //=========================================
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);
    const [checkedThree, setCheckedThree] = React.useState(false);
    const [checkedFour, setCheckedFour] = React.useState(false);
    const [checkedFive, setCheckedFive] = React.useState(false);
    const [checkedSix, setCheckedSix] = React.useState(false);   
    
    const handleChangeOne = () => {
      setCheckedOne(!checkedOne);
    };
    const handleChangeTwo = () => {
      setCheckedTwo(!checkedTwo);
    };
    const handleChangeThree = () => {
        setCheckedTwo(!checkedTwo);
    };
    const handleChangeFour = () => {
        setCheckedTwo(!checkedTwo);
    };
    const handleChangeFive = () => {
        setCheckedTwo(!checkedTwo);
    };
    const handleChangeSix = () => {
        setCheckedTwo(!checkedTwo);
    };


    const Checkbox = ({ label, value, onChange }) => {
        return (
          <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
          </label>
        );
      };  

    //search autocomplete
    //===========================================================================
    const loadedData = data.features;
    const items = [];
    const hello = "hello";
    for(let i=0; i< loadedData.length;i++){
        var names = loadedData[i].properties.LAD13NM;
        items[i] = {'name':names, 'id': i};

    }
    //console.log(items);
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return item;
       // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
      }

      //sliders
      //===================================================================
      const [ value, setValue ] = useState(0); 


    const favoritesCtx = useContext(FavoritesContext);
    const [mapLayers, setMapLayers] = useState([]);
    const totalArea = mapLayers.reduce((totalarea, area) => totalarea + area.area, 0);


    const _onCreate = e => {
        //console.log(e);
        const {layerType, layer} = e;
        if(layerType === "polygon"){
            const{_leaflet_id} = layer;
            //const popupContent = ReactDOMServer.renderToString(<ClientChoice />);
            //var popup = layer.bindPopup(popupContent);
            setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer.getLatLngs()[0], area: L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])},]);
            //setTotalEnergy(added => added + layer.area);
            //layer.openPopup();
        };
        if(layerType === "marker"){
            const{_leaflet_id} = layer;
            setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer._latlng, type:"Fast Charger", area: 0},
        ]);
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

    //Marker Setup
    //==============================================================================================
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://icon-library.com/images/charging-station-icon/charging-station-icon-26.jpg',
            iconUrl: 'https://icon-library.com/images/charging-station-icon/charging-station-icon-26.jpg',
            shadowUrl: '',
        });
    
    //Button control
    //==============================================================================================
        // function accept() {
        //     setTotalEnergy(added => added + 50);
        //     setHidden(true);

        //   }
        //   function reject() {
        //     setTotalEnergy(added => added );
        //     setHidden(true);
        //   }
        
        // function accepttoo() {
        //     setTotalEnergy(added => added + 20);
        //     setHiddentoo(true);
            
        //   }
        //   function rejecttoo() {
        //     setHiddentoo(true);
        //   }


    //List of added points
    //==============================================================================================
    function AddedPoints(props) {
        const evcharge = props.numbers;
        const listofev = evcharge.map((number) =>
            <li className="infralist"key={number.id}>
                <p>EV Charging Point ID: {number.id}</p>
                <p>Type: {number.type}</p>
                <p>Location/area: {number.latLngs.lat} {number.latLngs.lng} {number.area}</p>
                {/* <p>{number.popup}</p> */}
            </li>
        );
        return (
            <ul className="ev"> {listofev}</ul>
        );
    }

    //========================================================
    console.log(chargeType);
    const [checkedState, setCheckedState] = useState(
        new Array(chargeType.length).fill(false)
      );
    
      //const [total, setTotal] = useState(0);
    
      const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
        console.log(updatedCheckedState);
    
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
{/* 
            <Checkbox
                label="On street 7Kw"
                value={checkedOne}
                onChange={handleChangeOne}
            />
            <br />
            <Checkbox
                label="Workplace / destination"
                value={checkedTwo}
                onChange={handleChangeTwo}
            />
            <br />
            <Checkbox
                label="Rapid 50Kw"
                value={checkedThree}
                onChange={handleChangeTwo}
            />
            <br />
            <Checkbox
                label="Ultra fast 150Kw"
                value={checkedFour}
                onChange={handleChangeTwo}
            />
            <br />
            <Checkbox
                label="Charging cluster 7Kw"
                value={checkedFive}
                onChange={handleChangeTwo}
            />
            <br />
            <Checkbox
                label="Rapid charging cluster"
                value={checkedSix}
                onChange={handleChangeTwo}
            />
            <br /> */}
        </div>
        </section>
        <section>
            <div className="left">
            <h2>Why?</h2>
            <p>What are your priority outcomes? choose up to five and rate importance</p>
            <div className="container-row">
                <div className="row-one">
                    <Checkbox
                        label="Improve air quality"
                        value={checkedSix}
                        onChange={handleChangeTwo}
                    />
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
                    <Checkbox
                        label="Improve air quality"
                        value={checkedSix}
                        onChange={handleChangeTwo}
                    />
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
            </div>
        </section>
        <section>
            <div className="left">
                <h2>Select Your sites</h2>
                <p>Pins to Add</p>
                {/* <p>{selected}</p> */}
            </div>
        </section>
        <section>
        <div className="row">
        <div className="mapcontainerof">
        <MapContainer style={{ height: "70vh" }} center={[54.973905, -1.616310]} zoom={14} scrollWheelZoom={true}>
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
                <AddedPoints numbers= {mapLayers} />
            </div>
        </div>
        </div>
        <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
        </section>
        </Layout>

    );
}

export default Evselector;




