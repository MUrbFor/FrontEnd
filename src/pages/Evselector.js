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

function Evselector() {
    //Checkbox
    //=========================================
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);
   
    const handleChangeOne = () => {
      setCheckedOne(!checkedOne);
    };
   
    const handleChangeTwo = () => {
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
    console.log(items);
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

      


      //============================================================
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
        <div>
        <Checkbox
            label="Value 1"
            value={checkedOne}
            onChange={handleChangeOne}
        />
        <Checkbox
            label="Value 2"
            value={checkedTwo}
            onChange={handleChangeTwo}
        />
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




