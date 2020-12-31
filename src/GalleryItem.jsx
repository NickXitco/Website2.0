import React from "react";
import puppy from "./puppy.jpg";

export class GalleryItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            color: props.color,
            size: props.size,
            hover: false,
            mouseDown: false,
            image: props.image ? props.image : puppy
            //page_link (maybe just id)
        }

        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    hoverOn(e) {
        this.setState({hover: true});
    }

    hoverOff(e) {
        this.setState({hover: false});
    }

    mouseDown(e) {
        this.setState({mouseDown: true});
    }

    mouseUp(e) {
        this.setState({mouseDown: false});
    }


    render() {
        const width = 100 * this.state.size.w;
        const height = 100 * this.state.size.h;

        const styles = {
            width: `${width}px`,
            height: `${height}px`,
            border: `solid ${this.state.color} 2px`,
            boxShadow: `${this.state.color} 0 0 8px 1px`,
        }

        const colorShade = this.state.mouseDown ? "opaque" : "transparent";
        const hoverShade = this.state.hover && !this.state.mouseDown ? "opaque" : "transparent";
        const defaultShade = !this.state.hover && !this.state.mouseDown ? "opaque" : "transparent";

        function darken(hex, factor) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / factor,
                g: parseInt(result[2], 16) / factor,
                b: parseInt(result[3], 16) / factor
            } : null;
        }

        const cDark2 = darken(this.state.color, 2);
        const cDark4 = darken(this.state.color, 12);
        const colorShadeStyle = {
            background: `linear-gradient(0deg, rgba(${cDark4.r}, ${cDark4.g}, ${cDark4.b}, 0.95), rgba(${cDark2.r}, ${cDark2.g}, ${cDark2.b}, 0.7)`,
        }

        const subtitle = this.state.subtitle ? (<span><span className="subtitle"> {this.state.subtitle}</span> - </span>) : null;

        return (
            <div
                className="gallery-item" style={styles}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
            >
                <div className="gallery-flex">
                    <div className="item-info">
                        <p className="item-title">
                            {subtitle}
                            {this.state.title}
                        </p>
                        <p className="item-description">{this.props.description}</p>
                    </div>
                </div>

                <img className="gallery-image" src={this.state.image} alt=""/>
                <div className={`colorShade gallery-shade ${colorShade}`} style={colorShadeStyle}/>
                <div className={`hoverShade gallery-shade ${hoverShade}`}/>
                <div className={`defaultShade gallery-shade ${defaultShade}`}/>
            </div>
        )
    }

}

