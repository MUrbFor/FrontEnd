import React, {useState, useContext} from 'react';

    function AddedPoints(props) {
        const evcharge = props.numbers;
        const listofev = evcharge.map((number) =>
            <li className="infralist"key={number.id}>
                <p>EV Charging Point ID: {number.id}</p>
                <p>Type: {number.type}</p>
                <p>Location/area: {number.address}</p>
                {/* <p>{number.popup}</p> */}
            </li>
        );
        return (
            <ul className="ev"> {listofev}</ul>
        );
    }
    export default AddedPoints;