import React from "react";
import * as PIXI from 'pixi.js';
import trail from './trail.png';
import {Boid} from './Boid.js';
import {QuadTree} from "./QuadTree";
import {Vertex} from "./Vertex";


export class PixiTest extends React.Component{
    app;
    canvas;
    boids;
    vertices;
    edges;
    stepSize;

    graphGraphics;
    
    constructor(props) {
        super(props);
        this.app = null;
        this.canvas = null;
        this.boids = [];
        this.vertices = [];
        this.edges = [];

        this.stepSize = 0.01;
        this.graphGraphics = null;

        this.draw = this.draw.bind(this);
    }

    createBoids() {
        const numBoids = 400;
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
    
    createGraph() {
        const numVertices = 400;
        const container = new PIXI.ParticleContainer();
        //Creating vertices
        for (let i = 0; i < numVertices; i++) {
            const v = new Vertex(window.innerWidth, window.innerHeight);
            this.vertices.push(v);
            container.addChild(v.sprite);
        }
        
        //Create edges
        for (let i = 0; i < this.vertices.length; i++) {
            let r = Math.floor(Math.random() * (this.vertices.length));
            if (r !== i && !this.vertices[i].neighbors.includes(this.vertices[r])) {
                this.vertices[i].addNeighbor(this.vertices[r]);
                this.edges.push({
                    u: this.vertices[i],
                    v: this.vertices[r],
                });
            }
        }
        return container;
    }

    componentDidMount() {
        this.app = new PIXI.Application({ resizeTo: document.getElementById("main") , backgroundColor: 0x0a0a0a});
        this.canvas.appendChild(this.app.view);
        this.app.start();
        this.app.ticker.add(this.draw);
        this.createBoids();
        this.app.stage.addChild(this.createGraph());
        this.graphGraphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphGraphics);
    }

    draw() {
        let root = this.createQuadTree();
        this.updateBoids(root);
        this.updateForces(root);

        this.graphGraphics.clear();
        this.graphGraphics.lineStyle(1, 0x969696, 1);
        for (const edge of this.edges) {
            this.graphGraphics.moveTo(edge.u.x, edge.u.y);
            this.graphGraphics.lineTo(edge.v.x, edge.v.y);
        }

        //this.app.resize(); TODO call this repeatedly when we want to close the header
    }

    updateBoids(root) {
        for (const boid of this.boids) {
            boid.setAcceleration(this.boids, root);
            boid.update();
        }
    }

    updateForces(root) {
        const theta = 1.0;
        const C = 3;
        const K = 7.5;
        const G = 1 / 15;

        for (const v of this.vertices) {
            if (this.stepSize <= 0) break;
            let f = {x: 0, y: 0};

            for (const u of v.neighbors) {
                const fa = Vertex.attractiveForce(u, v, K);
                f.x += fa.x;
                f.y += fa.y;
            }

            const fr = Vertex.repulsiveForce(v, C, K, theta, root);

            const gravity = {x: window.innerWidth / 2 - v.x, y: window.innerHeight / 2 - v.y};

            f.x += fr.x + gravity.x * G;
            f.y += fr.y + gravity.y * G;
            v.f = f;
        }

        for (const v of this.vertices) {
            v.applyForce(this.stepSize);
        }

        this.stepSize = this.getStepSize(Vertex.getEnergy(this.vertices));
    }

    getStepSize(energy) {
        return Math.max(Math.min(512 / energy, Math.min(2 ** -16 * energy, 0.01)), 0);
    }


    createQuadTree() {
        let maxDim = Math.max(window.innerHeight, window.innerWidth);
        let root = new QuadTree(maxDim * 2, window.innerWidth / 2, window.innerHeight / 2);

        for (const boid of this.boids) {
            root.insert(boid)
        }

        for (const v of this.vertices) {
            root.insert(v);
        }

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
