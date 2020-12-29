import React from "react";


export class SideNavItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            highlighted: props.highlighted
        }
    }


    render() {

        const highlight = this.state.highlighted ? <div className="highlight"/> : null;
        const weight = this.state.highlighted ? 700 : 100;

        return (
            <div className="side-nav-item">
                {highlight}
                <h4 style={{fontWeight: weight}}>
                    {this.state.name}
                </h4>
            </div>
        )
    }

}
