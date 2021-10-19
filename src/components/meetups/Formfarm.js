import React, {useState} from 'react';


const ClientChoice = () => {

    function sayHello() {
        console.log('Hello!');
      }

    return (
        <button onClick={sayHello}>Click me</button>
    )
}

  export default ClientChoice;