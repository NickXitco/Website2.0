import React from "react";
import * as PIXI from 'pixi.js';
import trail from './trail.png';
import {Boid} from './Boid.js';
import {QuadTree} from "./QuadTree";


export class PixiTest extends React.Component{
    app;
    canvas;
    boids;

    constructor(props) {
        super(props);
        this.app = null;
        this.canvas = null;
        this.boids = [];

        this.draw = this.draw.bind(this);
    }

    createBoids() {
        const numBoids = 300;
        const trailTexture = PIXI.Texture.from(trail);
        //TODO maybe add a container? not really sure the performance difference.
        for (let i = 0; i < numBoids; i++) {
            const boid = new Boid(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            boid.trailSprite = new PIXI.SimpleRope(trailTexture, boid.trailPoints);
            boid.trailSprite.blendMode = PIXI.BLEND_MODES.ADD;
            this.app.stage.addChild(boid.sprite);
            this.app.stage.addChild(boid.trailSprite);
            this.boids.push(boid);
        }
    }

    componentDidMount() {
        this.app = new PIXI.Application({ resizeTo: document.getElementById("main") , backgroundColor: 0x0a0a0a});
        this.canvas.appendChild(this.app.view);
        this.app.start();
        this.app.ticker.add(this.draw);
        this.createBoids();
    }

    draw() {
        let root = this.createQuadTree();
        this.updateBoids(root);
        //this.app.resize(); TODO call this when we want to close the header
    }

    updateBoids(root) {
        for (const boid of this.boids) {
            boid.setAcceleration(this.boids, root);
            boid.update();
        }
    }

    createQuadTree() {
        let maxDim = Math.max(window.innerHeight, window.innerWidth);
        let root = new QuadTree(maxDim * 2, window.innerWidth / 2, window.innerHeight / 2);

        for (const boid of this.boids) {
            root.insert(boid)
        }

        // for (const v of this.vertices) {
        //     root.insert(v);
        // }

        root.getCenterOfMass();

        return root;
    }

    componentWillUnmount() {
        this.app.stop();
    }


    render() {
        const component = this;
        return (
            <div className="pixi-canvas" ref={d => {component.canvas = d}}/>
        )
    }

}
