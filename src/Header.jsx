import React from 'react';
import {PixiTest} from "./PixiTest";

export class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({open: false});
    }


    render() {
        const height = this.state.open ? '100%' : '175px';
        const width = this.state.open ? '100%' : '175px';
        const nameClass = this.state.open ? "hero-name" : "header-name";
        const nickClass = this.state.open ? "nick-shift" : "";

        return (
            <div className="header" style={{height: height}} onClick={this.click}>
                <PixiTest/>
                <div className="header-container" style={{width: width}}>
                    <div className={nameClass}>
                        <h2 className={nickClass}>Nick</h2>
                        <h2>Xitco</h2>
                    </div>
                </div>
            </div>
        )
    }

}