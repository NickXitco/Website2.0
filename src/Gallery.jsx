import React from "react";
import {GalleryItem} from "./GalleryItem";
import {PALETTE} from "./App";


export class Gallery extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="gallery">
                <GalleryItem title={"midi motif analyser"} description={"interactive piano roll lietmotif analysis application"} color={PALETTE.MAGENTA} size={{w: 5, h: 1}}/>
                <GalleryItem title={"boids."} description={"implementation of craig reynold’s famous simulation"} color={PALETTE.CYAN}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.YELLOW}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.PURPLE}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.MINT}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.YELLOW}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.PURPLE}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.MINT}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.YELLOW}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.PURPLE}  size={{w: 3, h: 2}}/>
                <GalleryItem title={"midi motif analyser"} description={"lorem ipsum"} color={PALETTE.MINT}  size={{w: 3, h: 2}}/>
            </div>
        )
    }

}
