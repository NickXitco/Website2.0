import React from "react";
import {GalleryItem} from "./GalleryItem";
import {PALETTE} from "./App";
import motif from "./Motif.png";
import spotify from "./spotify.png";
import {PixiTest} from "./PixiTest";


export class Gallery extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    title: "midi motif analyser",
                    description: "interactive piano roll lietmotif analyser for soundtracks",
                    color: PALETTE.MAGENTA,
                    size: {w: 11, h: 6},
                    image: motif
                },
                {
                    title: "boids.",
                    description: "implementation of craig reynold’s famous simulation",
                    color: PALETTE.CYAN,
                    size: {w: 6, h: 6},
                    image: null
                },
                {
                    title: "graph layout simulator",
                    description: "simulator of various graph layout algorithms",
                    color: PALETTE.ORANGE,
                    size: {w: 4, h: 6},
                    image: null
                },
                {
                    title: "the artist observatory",
                    subtitle: "master's thesis",
                    description: "interactive map of every artist on spotify",
                    color: PALETTE.MINT,
                    size: {w: 12, h: 6},
                    image: spotify
                },
                {
                    title: "formula draw!",
                    description: "formula 1 track draw game",
                    color: PALETTE.RED,
                    size: {w: 9.425, h: 6},
                    image: spotify
                },

            ]
        }
    }


    render() {
        const galleryItems = this.state.items.map((item) =>
            <GalleryItem
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                color={item.color}
                size={item.size}
                image={item.image}
                key={item.title}
            />
        );

        return (
            <div className="gallery">
                {galleryItems}
            </div>
        )
    }

}
