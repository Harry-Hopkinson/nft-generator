var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync, readdirSync = _a.readdirSync, rmSync = _a.rmSync, existsSync = _a.existsSync, mkdirSync = _a.mkdirSync;
var sharp = require('sharp');
var template = "\n    <svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <!-- bg -->\n        <!-- head -->\n        <!-- hair -->\n        <!-- eyes -->\n        <!-- nose -->\n        <!-- mouth -->\n        <!-- beard -->\n    </svg>\n";
var takenNames = {};
var takenFaces = {};
var idx = 999;
function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
function randElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomName() {
    var adjectives = "Fired Trashy Tubular Nasty Jacked Swol Buff Ferocious Firey Flamin Agnostic Artificial Bloody Crazy Cringey Crusty Dirty Eccentric Glutinous Harry Juicy Simple Stylish Awesome Creepy Corny Freaky Shady Sketchy Lame Sloppy Hot Intrepid Juxtaposed Killer Ludicrous Mangy Pastey Ragin Rusty Rockin Sinful Shameful Stupid Sterile Ugly Vascular Wild Young Old Zealous Flamboyant Super Sly Shifty Trippy Fried Injured Depressed Anxious Clinical".split(' ');
    var names = "Aaron Bart Chad Dale Earl Fred Grady Harry Ivan Jeff Joe Kyle Lester Steve Tanner Lucifer Todd Mitch Hunter Mike Arnold Norbert Olaf Plop Quinten Randy Saul Balzac Tevin Jack Ulysses Vince Will Xavier Yusuf Zack Roger Raheem Rex Dustin Seth Bronson Dennis".split(" ");
    var randAdj = randElement(adjectives);
    var randName = randElement(names);
    var name = randAdj + "-" + randName;
    if (takenNames[name] || !name) {
        return getRandomName();
    }
    else {
        takenNames[name] = name;
        return name;
    }
}
function getLayer(name, skip) {
    if (skip === void 0) { skip = 0.0; }
    var svg = readFileSync("./layers/" + name + ".svg", 'utf-8');
    var re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;
    var layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}
function svgToPng(name) {
    return __awaiter(this, void 0, void 0, function () {
        var src, dest, img, resized;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    src = "./out/" + name + ".svg";
                    dest = "./out/" + name + ".png";
                    return [4 /*yield*/, sharp(src)];
                case 1:
                    img = _a.sent();
                    return [4 /*yield*/, img.resize(1024)];
                case 2:
                    resized = _a.sent();
                    return [4 /*yield*/, resized.toFile(dest)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createImage(idx) {
    var bg = randInt(5);
    var hair = randInt(7);
    var eyes = randInt(9);
    var nose = randInt(4);
    var mouth = randInt(5);
    var beard = randInt(3);
    var face = [hair, eyes, mouth, nose, beard].join('');
    if (face[takenFaces]) {
        createImage(null);
    }
    else {
        var name_1 = getRandomName();
        console.log(name_1);
        face[takenFaces] = face;
        var final = template
            .replace('<!-- bg -->', getLayer("bg" + bg))
            .replace('<!-- head -->', getLayer('head0'))
            .replace('<!-- hair -->', getLayer("hair" + hair))
            .replace('<!-- eyes -->', getLayer("eyes" + eyes))
            .replace('<!-- nose -->', getLayer("nose" + nose))
            .replace('<!-- mouth -->', getLayer("mouth" + mouth))
            .replace('<!-- beard -->', getLayer("beard" + beard, 0.5));
        var meta = {
            name: name_1,
            description: "A drawing of " + name_1.split('-').join(' '),
            image: idx + ".png",
            attributes: [
                {
                    beard: '',
                    rarity: 0.5
                }
            ]
        };
        writeFileSync("./out/" + idx + ".json", JSON.stringify(meta));
        writeFileSync("./out/" + idx + ".svg", final);
        svgToPng(idx);
    }
}
if (!existsSync('./out')) {
    mkdirSync('./out');
}
readdirSync('./out').forEach(function (f) { return rmSync("./out/" + f); });
do {
    createImage(idx);
    idx--;
} while (idx >= 0);
