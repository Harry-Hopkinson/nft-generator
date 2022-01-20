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

const takenNames : any = {};
const takenFaces = {};
var idx = 999;

function randInt(max: number) {
    return Math.floor(Math.random() * (max + 1));
}

function randElement(arr: string | any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName(): any {
    const adjectives = "Fired Trashy Tubular Nasty Jacked Swol Buff Ferocious Firey Flamin Agnostic Artificial Bloody Crazy Cringey Crusty Dirty Eccentric Glutinous Harry Juicy Simple Stylish Awesome Creepy Corny Freaky Shady Sketchy Lame Sloppy Hot Intrepid Juxtaposed Killer Ludicrous Mangy Pastey Ragin Rusty Rockin Sinful Shameful Stupid Sterile Ugly Vascular Wild Young Old Zealous Flamboyant Super Sly Shifty Trippy Fried Injured Depressed Anxious Clinical".split(' ');
    const names : any = "Aaron Bart Chad Dale Earl Fred Grady Harry Ivan Jeff Joe Kyle Lester Steve Tanner Lucifer Todd Mitch Hunter Mike Arnold Norbert Olaf Plop Quinten Randy Saul Balzac Tevin Jack Ulysses Vince Will Xavier Yusuf Zack Roger Raheem Rex Dustin Seth Bronson Dennis".split(" ");

    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name = `${randAdj}-${randName}`

    if (takenNames[name] || !name) {
        return getRandomName();
    }
    else {
        takenNames[names] = name;
        return name;
    }
}