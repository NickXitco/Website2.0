import * as PIXI from "pixi.js";
import boidSprite from "./boid.png";

const cohesion = 0.005;
const avoidance = 0.05;
const alignment = 0.05;
const walls = 1;
const speed = 6;
const boidRange = 50;

export class Boid {

    x;
    y;
    vx;
    vy;

    history;
    trailPoints;
    trailSprite;
    sprite;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;

        this.initSprite();
        this.initTrail();
    }

    initSprite() {
        this.sprite = new PIXI.Sprite.from(boidSprite);
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.scale.set(0.25, 0.25);
    }

    initTrail() {
        this.trailPoints = [];
        this.history = [];
        for (let i = 0; i < 25; i++) {
            this.history.push({x: this.x, y: this.y});
            this.trailPoints.push(new PIXI.Point(this.x, this.y));
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;
        this.updateTrail();
    }

    updateTrail() {
        this.history.pop();
        this.history.unshift({x: this.x, y: this.y});
        for (let i = 0; i < this.trailPoints.length; i++) {
            const p = this.trailPoints[i];
            p.x = this.history[i].x;
            p.y = this.history[i].y;
        }
    }

    setAcceleration(boids, root) {
        let inRange = this.getInRange(boids, root);
        this.avoidance(inRange);
        inRange = inRange.filter(node => node.trailPoints);
        this.cohesion(inRange);
        this.alignment(inRange);
        this.maxSpeed();
        this.walls();
    }

    walls() {
        const padding = -50;
        const c = 1;

        if (this.x < padding) {
            this.vx += c;
        }
        if (this.x > window.innerWidth - padding) {
            this.vx -= c;
        }
        if (this.y < padding) {
            this.vy += c;
        }
        if (this.y > window.innerHeight - padding) {
            this.vy -= c;
        }
    }

    maxSpeed() {
        const mag = Math.hypot(this.vx, this.vy);
        const vLimit = speed;
        if (mag > vLimit) {
            this.vx = (this.vx / mag) * vLimit;
            this.vy = (this.vy / mag) * vLimit;
        }
    }

    cohesion(boids) {
        const c = cohesion;
        if (boids.length === 0) return;
        let centerX = boids.reduce((acc, cur) => acc + cur.x, 0) / boids.length;
        let centerY = boids.reduce((acc, cur) => acc + cur.y, 0) / boids.length;
        this.vx += (centerX - this.x) * c;
        this.vy += (centerY - this.y) * c;
    }

    alignment(boids) {
        const c = alignment;
        if (boids.length === 0) return;
        let centerX = boids.reduce((acc, cur) => acc + cur.vx, 0) / boids.length;
        let centerY = boids.reduce((acc, cur) => acc + cur.vy, 0) / boids.length;
        this.vx += (centerX - this.vx) * c;
        this.vy += (centerY - this.vy) * c;
    }

    avoidance(boids) {
        const dist = 20;
        const c = avoidance;

        let centerX = 0;
        let centerY = 0;

        for (const boid of boids) {
            if (Boid.distance(this, boid) < dist) {
                centerX += this.x - boid.x;
                centerY += this.y - boid.y;
            }
        }

        this.vx += centerX * c;
        this.vy += centerY * c;
    }

    static distance(b1, b2) {
        return Math.hypot(b1.x - b2.x, b1.y - b2.y);
    }

    getInRange(boids, root) {
        //TODO edit to account for angle

        const l1 = {x: this.x - boidRange, y: this.y - boidRange};
        const r1 = {x: this.x + boidRange, y: this.y + boidRange};

        const near = root.getNodesInRange(l1, r1);

        const inRange = [];
        for (const boid of near) {
            if (boid !== this && Math.hypot(boid.x - this.x, boid.y - this.y) < boidRange) {
                inRange.push(boid);
            }
        }
        return inRange;
    }

}