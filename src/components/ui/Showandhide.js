import React, {Component} from 'react';


class Showandhide extends React.Component
{
    state={
        divcontainer:false,
    }
    render()
    {
        var Handlechange = e =>{
            this.setState({divcontainer:!this.state.divcontainer});
        }
        const x = this.state.divcontainer;
        return(
            <div>
                <center>
                <h1>How to hid and show</h1>
                <button onClick={Handlechange}>{x ? 'Hide': 'Show'}</button>
                {
                    x &&(<div>My name is Moozhan</div>)
                }
                </center>
            </div>

        )
    }

}

export default Showandhide;