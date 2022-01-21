const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ps = require("prompt-sync");
const inputPrompt = ps();

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
const takenFaces : any = {};
let idx = inputPrompt("How many NFT's do you want to generate? ");

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
    const name =  `${randAdj}-${randName}`;

    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}

function getLayer(name: string, skip=0.0) {
    const svg = readFileSync(`../layers/${name}.svg`, 'utf-8');
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}

async function svgToPng(name: any) {
    const src = `./images/${name}.svg`;
    const dest = `./images/${name}.png`;

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}

function createImage(idx: number | undefined) {
    const bg = randInt(5);
    const hair = randInt(7);
    const eyes = randInt(9);
    const nose = randInt(4); 
    const mouth = randInt(5);
    const beard = randInt(3);
    const face : any = [hair, eyes, mouth, nose, beard].join('');

    if (face[takenFaces]) {
        createImage(null);
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;
        const final = template
            .replace('<!-- bg -->', getLayer(`bg${bg}`))
            .replace('<!-- head -->', getLayer('head0'))
            .replace('<!-- hair -->', getLayer(`hair${hair}`))
            .replace('<!-- eyes -->', getLayer(`eyes${eyes}`))
            .replace('<!-- nose -->', getLayer(`nose${nose}`))
            .replace('<!-- mouth -->', getLayer(`mouth${mouth}`))
            .replace('<!-- beard -->', getLayer(`beard${beard}`, 0.5))
        const meta = {
            name,
            description: `A drawing of ${name.split('-').join(' ')}`,
            image: `${idx}.png`,
            attributes: [
                { 
                    beard: '',
                    rarity: 0.5
                }
            ]
        }
        writeFileSync(`./images/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./images/${idx}.svg`, final)
        svgToPng(idx)
    }
}

if (!existsSync('./images')){
    mkdirSync('./images');
}

readdirSync('./images').forEach((f: any) => rmSync(`./images/${f}`));

do {
    createImage(idx);
    idx--;
} while (idx >= 1);

if (idx <= 0) {
    process.exit();
}