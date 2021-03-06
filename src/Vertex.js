import {QuadTree} from "./QuadTree";
import vertexSprite from "./circle.png";
import * as PIXI from "pixi.js";

export class Vertex {
    x;
    y;
    f;
    neighbors;

    sprite;

    constructor(w, h) {
        this.neighbors = [];
        this.randPosition(w, h);
        this.f = {x: 0, y: 0};
        this.sprite = PIXI.Sprite.from(vertexSprite);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(0.5);
    }

    randPosition(width, height) {
        this.x = (Math.random() * 500 - 250) + width / 2;
        this.y = (Math.random() * 500 - 250) + height / 2;
    }

    addNeighbor(v) {
        this.neighbors.push(v);
        v.neighbors.push(this);
    }

    static angle(u, v) {
        return Math.atan2(v.y - u.y, v.x - u.x);
    }

    static distance(u, v) {
        return Math.sqrt(((u.x - v.x) ** 2) + ((u.y - v.y) ** 2));
    }

    static attractiveForce(u, v, K) {
        let f = -1 * (Vertex.distance(u, v) ** 2) / K;

        return {
            x: Math.cos(Vertex.angle(u, v)) * f,
            y: Math.sin(Vertex.angle(u, v)) * f
        };
    }

    static repulsiveForce(v, C, K, theta, root) {
        let fx = 0;
        let fy = 0;
        for (const supernode of QuadTree.getSupernodes(v, theta, root)) {
            const s = supernode.centerOfMass;
            const u = {x: s.x, y: s.y};
            const f = C * K * K  * s.s / Vertex.distance(u, v);
            fx += Math.cos(Vertex.angle(u, v)) * f;
            fy += Math.sin(Vertex.angle(u, v)) * f;
        }

        return {
            x: fx,
            y: fy
        };
    }

    applyForce(stepSize) {
        this.x += stepSize * this.f.x;
        this.y += stepSize * this.f.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        // const force = Math.sqrt(this.f.x ** 2 + this.f.y ** 2);
        // this.sprite.alpha = Math.max(Math.min(5 * force, 255), 32) / 255;
    }


    draw() {
        const force = Math.sqrt(this.f.x ** 2 + this.f.y ** 2);
        // stroke(150, Math.max(Math.min(5 * force, 255), 32));
        //
        // noFill();
        // circle(this.x, this.y, 5);
        // stroke(0);
    }

    static SErepulsiveForce(u, v, C, K) {
        let f = C * K * K / Vertex.distance(u, v);

        return {
            x: Math.cos(Vertex.angle(u, v)) * f,
            y: Math.sin(Vertex.angle(u, v)) * f
        };
    }

    static getEnergy(vertices) {
        let energy = 0;
        for (const v of vertices) {
            energy += (Math.sqrt(v.f.x**2 + v.f.y**2));
        }
        return energy;
    }
}