import React from "react";


export class GalleryItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            color: props.color,
            size: props.size,
            //image
            //page_link (maybe just id)
        }
    }


    render() {
        const width = 200 * this.state.size.w;
        const height = 200 * this.state.size.h;

        const styles = {
            width: `${width}px`,
            height: `${height}px`,
            border: `solid ${this.state.color} 2px`,
            boxShadow: `${this.state.color} 0 0 5px 0`,
        }

        return (
            <div className="gallery-item" style={styles}>
                <div className="gallery-flex">
                    <div className="item-info">
                        <p className="item-title">{this.props.title}</p>
                        <p className="item-description">{this.props.description}</p>
                    </div>
                </div>

                <img className="gallery-image" src="data:image/jpeg;base64,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" alt=""/>
                <div className="gallery-shade"/>

            </div>
        )
    }

}

