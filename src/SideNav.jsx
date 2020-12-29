import React from "react";
import {SideNavItem} from './SideNavItem';


export class SideNav extends React.Component{

    render() {
        return (
            <div className="side-nav">
                <ul>
                    <SideNavItem highlighted={true} name="projects"/>
                    <SideNavItem highlighted={false} name="design"/>
                    <SideNavItem highlighted={false} name="photography"/>
                    <SideNavItem highlighted={false} name="music"/>
                    <SideNavItem highlighted={false} name="about"/>
                </ul>
            </div>
        )
    }

}
