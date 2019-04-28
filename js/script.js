const DEFAULT_GRID_SIZE = 16;
const GRID_DEFAULT_COLOR = "white";
const GRID_SKETCH_DEFAULT_COLOR ="black";
const GRID_TYPE = "gridElementFloat";
let sketchMode = "black";

createGridElements(DEFAULT_GRID_SIZE);
setSketchColorDefault();

function createGridElements(numberOfElements){
    const container = document.querySelector("#gridContainer");

    for(let i = 0; i < numberOfElements; i++){
        for(let j = 0; j < numberOfElements; j++){
            let gridElement = document.createElement("div");
            gridElement.classList.add(GRID_TYPE);
            gridElement.style.height = `${100/numberOfElements}%`;
            gridElement.style.width = `${100/numberOfElements}%`;
            gridElement.style.backgroundColor = GRID_DEFAULT_COLOR;
            container.appendChild(gridElement);
        }
    }
}

function setSketchColorDefault(){
    const squares = document.querySelectorAll(`.${GRID_TYPE}`);

    let makeListeners = function (square){
        square.removeEventListener('mouseover', setElementBackgroundColorRainbow);
        square.addEventListener('mouseover', setElementBackgroundColorDefault);
    }

    squares.forEach(makeListeners);
}

function resetGridElements(){
    const elements = document.querySelectorAll(`.${GRID_TYPE}`);
    elements.forEach( (element) => element.style.backgroundColor = GRID_DEFAULT_COLOR);
}

function resizeGridElements(){
    destroyGridElements();
    let numberOfElements = getUserNumberOfElements();
    createGridElements(numberOfElements);
    setSketchColorDefault();
}

function destroyGridElements(){
    const grid = document.querySelector("#gridContainer");
    const squares = document.querySelectorAll(`.${GRID_TYPE}`);
    squares.forEach( (square) => grid.removeChild(square));
}

function getUserNumberOfElements(){
   const userInput = prompt("How many squares per side?");
   if(userInput === null || userInput == ""){
    return DEFAULT_GRID_SIZE;
   }else{
    return userInput;
   }
}

function setSketchColorRandom(){
    const squares = document.querySelectorAll(`.${GRID_TYPE}`);

    let remakeListeners = function (square){
        square.removeEventListener('mouseover', setElementBackgroundColorDefault);
        square.addEventListener('mouseover', setElementBackgroundColorRainbow);
    }

    squares.forEach(remakeListeners);
}

function setElementBackgroundColorDefault(event){
     event.target.style.backgroundColor = GRID_SKETCH_DEFAULT_COLOR;
}

function setElementBackgroundColorRainbow(event){
    if(event.target.style.backgroundColor == GRID_DEFAULT_COLOR || event.target.style.backgroundColor == GRID_SKETCH_DEFAULT_COLOR){
     let color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
      event.target.style.backgroundColor = color;
   }else{
       let rgb = parseRGBValues(event.target.style.backgroundColor);
       event.target.style.backgroundColor = `rgb(${parseInt(rgb[1])-26}, ${parseInt(rgb[2])-26}, ${parseInt(rgb[3])-26})`;
    }
}

 function parseRGBValues(RGBstring){
    let regex = /rgb[(]([0-9]+), ([0-9]+), ([0-9]+)[)]/g;
    return regex.exec(RGBstring);
}

function random(a) {
    return Math.floor(Math.random() * a);
}

function toggleElements(){
    if(sketchMode == "black"){
        sketchMode = "rainbow";
        setSketchColorRandom();
        changeSketchButtonText("Sketch with Black!");
    }else{
        sketchMode = "black";
        setSketchColorDefault();
        changeSketchButtonText("Sketch with Random Colors!");
    }
}

function changeSketchButtonText(text){
    const button = document.querySelector("#random");
    button.textContent = text;
}