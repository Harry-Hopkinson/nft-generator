import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } from "fs";
const sharp = require("sharp");

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- bg -->
        <!-- head -->
        <!-- hair -->
        <!-- eyes -->
        <!-- nose -->
        <!-- mouth -->
        <!-- beard -->
    </svg>
`

const takenNames = {};
const takenFaces = {};
var idx = 999;

function randInt(max: number) {
    return Math.floor(Math.random() * (max + 1));
}