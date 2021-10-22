import React, {useState, useContext} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import data from '../../data/GBLayer';


function Autocomplete () {
    
    //search autocomplete
    //===========================================================================
    const loadedData = data.features;
    const [ selectedLA, setselectedLA ] = useState(); 

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
      }
    
      const handleOnHover = (result) => {
        // the item hovered
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        setselectedLA(item.name);
      }
    
      const handleOnFocus = () => {
      }
      console.log(selectedLA);

      const formatResult = (item) => {
        return item;
       // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
      }
      return (
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
      );
}
export default Autocomplete;